/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { DeviceService } from 'src/app/services/device.service';

import { EvaluationErrorComponent } from '../evaluation-error/evaluation-error.component';
import { EvaluationResultsComponent } from '../evaluation-results/evaluation-results.component';
@Component({
  selector: 'app-box-control',
  imports: [NzButtonModule, NzModalModule, CommonModule],
  styleUrls: ['./box-control.component.less'],
  template: `
    <div class="container">
      <div class="control"
        >当前用能管控模式:<h1 [ngStyle]="{ color: modeObject[mode]['color'] }">{{ modeObject[mode]['title'] }}</h1>
      </div>
      <div class="control"
        >当前客流模式:<h1>
          <span [ngStyle]="{ color: levelObject[level]['color'] }">{{ levelObject[level]['title'] }}</span>
          <a class="b1" nz-button nzType="link" (click)="levelChange()">切换</a></h1
        >
      </div>
      <div
        class="my-button"
        (click)="changeMode()"
        [ngStyle]="{ color: modeObject[mode]['reverseColor'], 'border-color': modeObject[mode]['reverseColor'] }"
      >
        <img src="../../../../../assets/tmp/home/logo5.png" />
        切换{{ modeObject[mode]['reverse'] }}模式</div
      >
      <div class="my-button" (click)="evaluate()">
        <img src="../../../../../assets/tmp/home/logo5.png" />
        车站碳排放评估</div
      >
      <button nz-button nzType="primary" (click)="reset()">重置</button>
    </div>
  `
})
export class BoxCeterControlComponent implements OnInit, OnDestroy {
  private readonly modal = inject(NzModalService);
  private readonly device = inject(DeviceService);
  private readonly cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.e1 = this.device.deviceUpdateEvent.subscribe((data: any) => {
      this.totalData = data;
      this.level = data.find((d: any) => d.deviceType === 'footfall')?.deviceValue || 0;
      this.deviceId_footfall = data.find((d: any) => d.deviceType === 'footfall')?.deviceKey || 'footfall';
      this.mode = data.find((d: any) => d.deviceType === 'emc')?.deviceValue || 0;
      this.deviceId_emc = data.find((d: any) => d.deviceType === 'emc')?.deviceKey || 'emc';
      this.cdr.detectChanges();
    });
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  e1: any;
  e2: any;

  totalData: any = {};

  deviceId_emc = '';
  deviceId_footfall = '';

  mode = 1; // 0节能 1手动
  level = 0; //0低客流 1高客流

  modeObject: any = {
    1: {
      title: '手动',
      color: '#5087ec',
      reverse: '节能',
      reverseColor: '#58a55c'
    },
    0: {
      title: '节能',
      color: '#58a55c',
      reverse: '手动',
      reverseColor: '#5087ec'
    }
  };
  levelObject: any = {
    1: {
      title: '高客流',
      color: '#5087ec'
    },
    0: {
      title: '低客流',
      color: '#f57931'
    }
  };
  evaluateModal(type: 'energy' | 'confirm' | 'error', nzTitle?: string, result?: number): void {
    if (type === 'energy') {
      if (result === 4) {
        this.evaluateModal('error');
        return;
      }
      this.modal.create({
        nzContent: EvaluationResultsComponent,
        nzClassName: 'empty-modal',
        nzMaskClosable: true,
        nzWidth: 800,
        nzCentered: true,
        nzData: {
          result
        }
      });
    } else if (type === 'confirm') {
      this.modal.create({
        nzTitle,
        nzClassName: 'energy-modal-confirm',
        nzCentered: true,
        nzCancelText: null,
        nzMaskClosable: false
      });
    } else if (type === 'error') {
      this.modal.create({
        nzContent: EvaluationErrorComponent,
        nzClassName: 'error-modal',
        nzMaskClosable: true,
        nzWidth: 700,
        nzCentered: true
      });
    }
  }

  evaluate() {
    if (this.mode === 0) {
      this.evaluateModal('confirm', '当前处于节能模式，请切换到手动模式再进行评估');
      return;
    }
    if (this.level == 1) {
      const l = this.device.deviceTotalList.filter((d: any) => d.deviceType === 'lamp').every((item: any) => item.deviceValue === 1);
      const a = this.device.deviceTotalList
        .filter((d: any) => d.deviceType === 'aircondition')
        .every((item: any) => item.deviceValue === 3);
      if (l && a) {
        this.evaluateModal('confirm', '当前处于高客流模式，请切换到低客流模式和手动模式再进行评估');
      } else {
        this.evaluateModal('error');
      }
    } else {
      this.evaluateModal('energy', '', this.device.energyAssessment_result);
    }
  }

  reset() {
    this.device.http.api.deviceSendResetButtonMessage().subscribe(() => {
      this.device.msg.success('重置成功');
    });
  }
  levelChange() {
    this.level = Number(!this.level);
    this.cdr.detectChanges();
    this.device.deviceControl('footfall', this.deviceId_footfall, this.level).subscribe();
    if (this.mode === 0) {
      if (this.level === 1) {
        this.device.http.api.deviceSendHightFlowMessage().subscribe(() => {
          this.device.msg.success('已切换到高客流节能模式');
        });
      } else {
        this.device.http.api.deviceSendPowerSavingMessage().subscribe(() => {
          this.device.msg.success('已切换到低客流节能模式');
        });
      }
    }
  }
  changeMode(): void {
    this.modal.create({
      nzTitle: this.mode == 1 ? '是否切换节能模式？' : '是否切换手动模式？',
      nzClassName: 'energy-modal-confirm',
      nzCentered: true,
      nzMaskClosable: false,
      nzOnOk: () => {
        this.mode = Number(!this.mode);
        this.device.deviceControl('emc', this.deviceId_emc, this.mode).subscribe();
        if (this.mode === 0) {
          if (this.level == 1) {
            this.device.http.api.deviceSendHightFlowMessage().subscribe(() => {
              this.device.msg.success('已切换到高客流节能模式');
            });
          } else {
            this.device.http.api.deviceSendPowerSavingMessage().subscribe(() => {
              this.device.msg.success('已切换到低客流节能模式');
            });
          }
        } else {
          this.device.msg.success('已切换到手动模式');
        }
        this.cdr.detectChanges();
      }
    });
  }
}
