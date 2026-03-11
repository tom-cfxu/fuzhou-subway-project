/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-11 22:52:34
 * @LastEditors: tom-cfxu cfxu963852741@qq.com
 * @LastEditTime: 2026-03-11 23:31:32
 * @FilePath: \fuzhou-subway-project\src\app\routes\data-screen\widgets\box1\box1.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-box1',
  imports: [NzGridModule, CommonModule],
  template:`
    <div class="box" nz-row>
      @for (item of data; track item.title) {
        <div nz-col nzSpan="12" class="item">
          <img class="item-icon" [src]="'../../../../../assets/tmp/home/'+item.iconSrc" />
          <div class="item-data">
            <div class="value" [ngStyle]="{color:item.color}">{{item.value}}</div>
            <div class="title">{{item.title}}</div>
          </div>
        </div>
      }
    </div>

  `,
  styleUrl: './box1.component.less'
})
export class Box1Component {

  public data:any[]=[
    { iconSrc:'logo1.png',title:'累计能耗(kW·h)',value:'180.50',color:'#5087EC' },
    { iconSrc:'logo4.png',title:'节能耗(kW·h)',value:'54.52',color:'#58A55C' },
    { iconSrc:'logo2.png',title:'碳排放总量(kg)',value:'141.69',color:'#5087EC' },
    { iconSrc:'logo4.png',title:'减少碳排放(kg)',value:'42.8',color:'#58A55C' },
    { iconSrc:'logo3.png',title:'电费(元)',value:'108.30',color:'#5087EC' },
    { iconSrc:'logo4.png',title:'节约费用(元)',value:'32.71',color:'#58A55C' },
  ];
}
