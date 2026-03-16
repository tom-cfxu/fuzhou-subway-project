import { Component } from '@angular/core';
import { Light1Component } from './widgets/light1/light1.component';

@Component({
  selector: 'app-sandbox',
  imports: [Light1Component],
  template: `

    <div class="container">
        <div class="sandbox">
          <img style="z-index: 9;" class="map" src="../../../../../assets/tmp/home/map.png">
          <app-light1 style="z-index: 30;top:370px;left:230px" lightName="检票区域照明设备" [isControl]="true" (changeOn)="changeLight(1,$event)" />
          <app-light1 style="z-index: 29;top:447px;left:370px" lightName="售票区域照明设备"/>
          <app-light1 style="z-index: 28;top:307px;left:470px" lightName="站厅照明-设备1"/>
          <app-light1 style="z-index: 27;top:297px;left:650px" lightName="站厅照明-设备2"/>
          <app-light1 style="z-index: 26;top:297px;left:820px" lightName="站台照明-设备1"/>
          <app-light1 style="z-index: 25;top:447px;left:700px" lightName="站台照明-设备2"/>
          <div class="device-name" style="z-index: 99;top:200px;left:200px">出入口通道空调-设备1</div>
          <div class="device-name" style="z-index: 99;top:200px;left:470px">出入口通道空调-设备2</div>
          <div class="device-name" style="z-index: 99;top:380px;left:410px">站厅空调-设备1</div>
          <div class="device-name" style="z-index: 99;top:380px;left:590px">站厅空调-设备2</div>
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
