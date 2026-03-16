/*
 * @Author: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @Date: 2026-03-13 18:36:43
 * @LastEditors: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @LastEditTime: 2026-03-16 22:41:34
 * @FilePath: \fuzhou-subway-project\src\app\routes\data-screen\widgets\sandbox\sandbox.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component } from '@angular/core';
import { Light1Component } from './widgets/light1/light1.component';
import { Light2Component } from './widgets/light2/light2.component';

@Component({
  selector: 'app-sandbox',
  imports: [Light1Component,Light2Component],
  template: `

    <div class="container">
        <div class="sandbox">
          <img style="z-index: 9;" class="map" src="../../../../../assets/tmp/home/map.png">
          <app-light1 style="z-index: 30;left:230px;top:370px;" lightName="检票区域照明设备" [isControl]="true" (changeOn)="changeLight(1,$event)" />
          <app-light1 style="z-index: 29;left:370px;top:447px;" lightName="售票区域照明设备"/>
          <app-light1 style="z-index: 28;left:470px;top:307px;" lightName="站厅照明-设备1"/>
          <app-light1 style="z-index: 27;left:650px;top:297px;" lightName="站厅照明-设备2"/>
          <app-light1 style="z-index: 26;left:820px;top:297px;" lightName="站台照明-设备1"/>
          <app-light1 style="z-index: 25;left:700px;top:447px;" lightName="站台照明-设备2"/>


          <app-light2 style="z-index: 30;left:190px;top:260px;" [isControl]="true" (changeOn)="changeLight(2,$event)" />
          <app-light2 style="z-index: 30;left:360px;top:260px;" />
          <app-light2 style="transform: rotate(-90deg); z-index: 30;left:-10px;top:270px;" />

          <div class="device-name" style="z-index: 99;left:200px;top:200px;">出入口通道空调-设备1</div>
          <div class="device-name" style="z-index: 99;left:470px;top:200px;">出入口通道空调-设备2</div>
          <div class="device-name" style="z-index: 99;left:410px;top:380px;">站厅空调-设备1</div>
          <div class="device-name" style="z-index: 99;left:590px;top:380px;">站厅空调-设备2</div>


          <div class="device-name2" style="z-index: 99;left:100px;top:150px;">出入口通道照明-设备1</div>
          <div class="device-name2" style="z-index: 99;left:300px;top:150px;">出入口通道照明-设备2</div>
        </div>

    </div>



  `,
  styleUrl: './sandbox.component.less'
})
export class SandboxComponent {

  changeLight(index:number,status:boolean):void{
    console.log(index,status)
  }
}
