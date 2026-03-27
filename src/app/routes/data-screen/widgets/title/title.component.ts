/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-11 19:00:37
 * @LastEditors: tom-cfxu cfxu963852741@qq.com
 * @LastEditTime: 2026-03-11 22:51:33
 * @FilePath: \my-project\src\app\layout\blank\widgets\time.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'data-title',
  template: `
    <div class="container"  [ngClass]="{'reverse':reverse}">

    @if (reverse) {
      <span class="shape"></span>
      <div class="circle"> </div>
      <span class="title reverse">
        {{ title }}
      </span>
    } @else {
      <span class="title">
        {{ title }}
      </span>
      <div class="circle"> </div>
      <span class="shape"></span>
    }


    </div>
  `,
  imports: [CommonModule],
  styleUrls: ['./title.component.less']
})
export class DataTitleComponent {
  @Input() title: string = '默认标题';
  @Input() reverse: boolean = false;
}
