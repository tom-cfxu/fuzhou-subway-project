/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-manyidu',
  imports: [CommonModule],
  template: `
    <div class="container1">
        <div class="title">乘客满意度</div>
        @for (item of arr; track $index) {
          <img class="smile" [ngClass]="{'good':item}" src="../../../../../assets/tmp/home/logo6.png" />
        }
    </div>
  `,
  styleUrl: './manyidu.component.less'
})
export class ManyiduComponent {
  @Input() value=0;

  get arr():boolean[]{
    return Array(5).fill(0).map((item,index)=>{
      if(index<this.value){
        return true;
      }else{
        return false
      }
    });
  }

}
