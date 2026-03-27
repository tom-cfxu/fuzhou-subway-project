/* eslint-disable prettier/prettier */
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
@Component({
  selector: 'app-light1',
  imports: [CommonModule],
  template: `
    <div class="container" (click)="change()">
      <img class="light" [ngStyle]="{ width: width }" [ngClass]="{ isControl: isControl }" [src]="imgSrc" />

      <div class="name" [ngClass]="{ lightNameR: lightNameR }">{{ lightName }}</div>
    </div>
  `,
  styleUrl: './light1.component.less'
})
export class Light1Component {
  @Input() on = true;
  @Input() lightName = '照明';
  @Input() width = '200px';
  @Input() isControl = false;
  @Input() lightNameR = false;

  @Output() readonly changeOn = new EventEmitter<any>();

  get imgSrc() {
    if (this.on) {
      return '../../../../../../../assets/tmp/home/light_on.png';
    } else {
      return '../../../../../../../assets/tmp/home/light_off.png';
    }
  }
  private readonly cdr = inject(ChangeDetectorRef);
  change() {
    if (this.isControl) {
      this.on = !this.on;
      this.cdr.detectChanges();
      this.changeOn.emit(this.on);
    }
  }
}
