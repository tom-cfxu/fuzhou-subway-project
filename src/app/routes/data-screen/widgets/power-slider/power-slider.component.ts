/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-12 23:20:10
 * @LastEditors: tom-cfxu cfxu963852741@qq.com
 * @LastEditTime: 2026-03-13 00:22:26
 * @FilePath: \fuzhou-subway-project\src\app\routes\data-screen\widgets\power-slider\power-slider.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, inject, Input, OnInit } from '@angular/core';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FormsModule } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-power-slider',
  imports: [NzSliderModule, FormsModule],
  template: `
    <div class="power-selector-container">
      <h2 class="title">功率调节</h2>
      <div class="slider-wrapper">
        <nz-slider
          nzVertical
          [nzMin]="1"
          [nzMax]="3"
          [nzStep]="1"
          [nzMarks]="marks"
          nzTooltipVisible="never"
          [(ngModel)]="powerLevel"
          (nzOnAfterChange)="onPowerChange($event)"
        ></nz-slider>
      </div>
    </div>
  `,
  styleUrl: './power-slider.component.less'
})
export class PowerSliderComponent implements OnInit {
  ngOnInit(): void {
    const modalConfig = this.modalRef.getConfig();
    if (modalConfig.nzData) {
      this.powerLevel = modalConfig.nzData.powerLevel; // 读取功率值
    }
  }
  powerLevel: 1 | 2 | 3 = 2;
  readonly nzModalData = inject<any>(NZ_MODAL_DATA);
  onPowerChange(value: any): void {
    console.log('当前功率模式:', this.getPowerLabel(value));
  }

  destroyModal(): void {
    this.modalRef.destroy({ data: 'this the result data' });
  }
  readonly modalRef = inject(NzModalRef);
  marks = {
    1: {
      style: {
        color: '#58a35c'
      },
      label: '低功率模式'
    },
    2: {
      style: {
        color: '#d9dbde'
      },
      label: '正常模式'
    },
    3: {
      style: {
        color: '#bd673a'
      },
      label: '高功率模式'
    }
  };

  getPowerLabel(value: number): string {
    switch (value) {
      case 0:
        return '低功率模式';
      case 1:
        return '正常模式';
      case 2:
        return '高功率模式';
      default:
        return '正常模式';
    }
  }
}
