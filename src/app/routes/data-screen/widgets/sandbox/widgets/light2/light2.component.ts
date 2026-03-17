/*
 * @Author: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @Date: 2026-03-13 19:53:03
 * @LastEditors: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @LastEditTime: 2026-03-17 16:24:51
 * @FilePath: \fuzhou-subway-project\src\app\routes\data-screen\widgets\sandbox\widgets\light2\light2.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-light2',
  imports: [CommonModule],
  template: `
    <div class="container" >
      <img class="light2" (click)="change()" [ngStyle]="{width:width,'transform': rotateStyle }" [ngClass]="{isControl:isControl}" [src]="imgSrc" />

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


  get rotateStyle(){
   return `rotate(${this.rotate}deg)`;
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
