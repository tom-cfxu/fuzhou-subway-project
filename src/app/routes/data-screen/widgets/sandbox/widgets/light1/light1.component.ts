import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-light1',
  imports: [CommonModule],
  template: `
    <div class="container" (click)="change()">
      <img class="light" [ngStyle]="{width:width}" [ngClass]="{isControl:isControl}" [src]="imgSrc" />

      <div class="name">{{lightName}}</div>

    </div>

  `,
  styleUrl: './light1.component.less'
})
export class Light1Component {
  @Input() on:boolean=true;
  @Input() lightName:string='照明';
  @Input() width:string='200px';
  @Input() isControl:boolean=false;

  @Output() changeOn:EventEmitter<any> = new EventEmitter();

  get imgSrc(){
    if(this.on){
      return '../../../../../../../assets/tmp/home/light_on.png'
    }else{
      return '../../../../../../../assets/tmp/home/light_off.png'
    }
  }
  private readonly cdr = inject(ChangeDetectorRef);
  change(){
    if(this.isControl){

      this.on=!this.on;
      this.cdr.detectChanges();
      this.changeOn.emit(this.on);
    }

  }
}
