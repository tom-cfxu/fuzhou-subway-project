/* eslint-disable prettier/prettier */
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-light',
  imports: [CommonModule],
  template: `
    <div class="container">
      <img class="light" (click)="change()" [ngStyle]="{ width: width }" [src]="imgSrc" />

      <div class="name" (click)="change()">{{ lightName }}</div>
    </div>
  `,
  styleUrl: './light.component.less'
})
export class LightComponent {
  private _on = 0;

  get on() {
    return this._on;
  }

  @Input() set on(e) {
    this._on = e;
    console.log('触发变更', this._on);
    this.updateImgSrc();
  }

  @Input() deviceKey = '001';
  @Input() lightName = '照明';
  @Input() width = '220px';

  @Output() readonly changeOn = new EventEmitter<any>();

  imgSrc = '../../../../../../../assets/tmp/home/light_off.png';
  updateImgSrc() {
    this.imgSrc = this.on ? '../../../../../../../assets/tmp/home/light_on.png' : '../../../../../../../assets/tmp/home/light_off.png';
    this.cdr.detectChanges();
  }
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly modal = inject(NzModalService);
  change() {
    this.modal.create({
      nzTitle: `${(this.on ? '是否关闭 ' : '是否开启 ') + this.lightName} ？`,
      nzClassName: 'energy-modal-confirm',
      nzCentered: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        // this.on = Number(!this.on);
        setTimeout(() => {
          this.changeOn.emit({
            deviceKey: this.deviceKey,
            deviceValue: Number(!this.on)
          });
        });
      }
    });
  }

  changeMode(): void {}
}
