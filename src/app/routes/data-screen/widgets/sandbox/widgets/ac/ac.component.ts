/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/*
 * @Author: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @Date: 2026-03-13 19:53:03
 * @LastEditors: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @LastEditTime: 2026-03-17 16:24:51
 * @FilePath: \fuzhou-subway-project\src\app\routes\data-screen\widgets\sandbox\widgets\light2\light2.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PowerSliderComponent } from '../../../power-slider/power-slider.component';
@Component({
  selector: 'app-ac',
  imports: [CommonModule],
  template: `
    <div class="container">
      <img class="ac" (click)="change()" [ngStyle]="{ width: width }" [src]="imgSrc" />
      <div class="name" (click)="change()">{{ name }}</div>
    </div>
  `,
  styleUrl: './ac.component.less'
})
export class AcComponent {
  private _power = 1;
  get power() {
    return this._power;
  }
  @Input() set power(e) {
    this._power = e;
    this.updateImgSrc();
  }

  @Input() deviceKey = '001';

  @Input() name = '空调';
  @Input() width = '280px';
  @Input() isControl = false;
  @Output() readonly changePower = new EventEmitter<any>();
  private readonly cdr = inject(ChangeDetectorRef);

  imgSrc = '../../../../../../../assets/tmp/home/ac_1.png';

  updateImgSrc() {
    if (this.power == 1) {
      this.imgSrc = '../../../../../../../assets/tmp/home/ac_1.png';
    } else if (this.power == 2) {
      this.imgSrc = '../../../../../../../assets/tmp/home/ac_2.png';
    } else if (this.power == 3) {
      this.imgSrc = '../../../../../../../assets/tmp/home/ac_3.png';
    } else {
      this.imgSrc = '../../../../../../../assets/tmp/home/light_off.png';
    }
    this.cdr.detectChanges();
  }
  private readonly modal = inject(NzModalService);
  change() {
    this.modal.create({
      nzTitle: this.name,
      nzClassName: 'energy-modal',
      nzContent: PowerSliderComponent,
      nzData: {
        powerLevel: this.power
      },
      nzCentered: true,
      nzMaskClosable: true,
      nzOnOk: componentInstance => {
        // this.power = componentInstance.powerLevel;

        this.changePower.emit({
          deviceKey: this.deviceKey,
          deviceValue: componentInstance.powerLevel
        });
      }
    });
  }
}
