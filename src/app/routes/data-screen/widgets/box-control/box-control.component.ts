import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
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
        >当前用能管控模式:<h1>
          <span [ngStyle]="{ color: levelObject[level]['color'] }">{{levelObject[level]['title']}}</span> <a class="b1" nz-button nzType="link" (click)="levelChange()">切换</a></h1
        >
      </div>
      <div class="my-button" (click)="changeMode()" [ngStyle]="{ color: modeObject[mode]['reverseColor'],'border-color':modeObject[mode]['reverseColor'] }">
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
export class BoxCeterControlComponent {
  constructor(private modal: NzModalService) {}
  private readonly cdr = inject(ChangeDetectorRef);
  mode: number = 1;
  level: number = 0;

  modeObject: any = {
    1: {
      title: '手动',
      color: '#5087ec',
      reverse: '节能',
      reverseColor:'#58a55c'
    },
    0: {
      title: '节能',
      color: '#58a55c',
      reverse: '手动',
      reverseColor:'#5087ec'
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

  evaluate() {
    this.modal.create({
      nzContent: EvaluationResultsComponent,
      nzClassName: 'empty-modal',
      nzMaskClosable: true,
      nzWidth: 800,
      nzData: {
        result: 2
      }
    });
  }

  reset(){
    this.level=0;
    this.mode=1;
    this.cdr.detectChanges();
  }
  levelChange(){
    this.level = Number(!Boolean(this.level));
    this.cdr.detectChanges();
  }
  changeMode(): void {
    this.modal.create({
      nzTitle: this.mode == 1 ? '是否切换节能模式？' : '是否切换手动模式？',
      nzClassName: 'energy-modal-confirm',
      nzCentered: true,
      nzMaskClosable: false,
      nzOnOk: () => {
        this.mode = Number(!Boolean(this.mode));

        setTimeout(()=>{
          this.cdr.detectChanges();
        })
      }
    });
  }
}
