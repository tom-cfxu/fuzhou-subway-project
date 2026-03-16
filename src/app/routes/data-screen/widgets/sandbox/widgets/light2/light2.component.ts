import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-light2',
  imports: [CommonModule],
  template: `
    <div class="container" (click)="change()">
      <img class="light" [ngStyle]="{width:width}" [ngClass]="{isControl:isControl}" [src]="imgSrc" />

    </div>

  `,
  styleUrl: './light2.component.less'
})
export class Light2Component {
  @Input() on:boolean=true;
  @Input() rotate:number=0;
  @Input() width:string='150px';
  @Input() isControl:boolean=false;
  @Output() changeOn:EventEmitter<any> = new EventEmitter();

  get imgSrc(){
    if(this.on){
      return '../../../../../../../assets/tmp/home/light2_on.png'
    }else{
      return '../../../../../../../assets/tmp/home/light2_off.png'
    }
  }


  // get rotateStyle(){
  //  return `rotate(${this.rotate} +'deg')`;
  // }
  private readonly cdr = inject(ChangeDetectorRef);
  change(){
    if(this.isControl){
      this.on=!this.on;
      this.cdr.detectChanges();
      this.changeOn.emit(this.on);
    }

  }
}
