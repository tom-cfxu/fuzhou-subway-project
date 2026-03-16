import { Component } from '@angular/core';
import { DataTitleComponent } from './widgets/title/title.component';
import { Box1Component } from './widgets/box1/box1.component';
import { Box2EchartComponent } from './widgets/box2-echart/box2-echart.component';
import { Box3EchartComponent } from './widgets/box3-echart/box3-echart.component';
import { BoxCeterControlComponent } from './widgets/box-control/box-control.component';
import { DeviceManageComponent } from './widgets/device-manage/device-manage.component';
import { SandboxComponent } from './widgets/sandbox/sandbox.component';

@Component({
  selector: 'app-data-screen',
  imports: [DataTitleComponent, Box1Component, Box2EchartComponent, Box3EchartComponent, BoxCeterControlComponent, DeviceManageComponent,SandboxComponent],
  template: `
    <div class="main">
      <!-- <div class="imgs">
        <div class="left"></div>
        <div class="center">

        </div>
        <div class="right"></div>
      </div> -->
      <div class="data">
        <div class="left">
          <data-title title="车站碳排放统计" />
          <app-box1 />
          <data-title title="车站碳排放趋势" />
          <app-box2-echart />
          <data-title title="车站碳排放占比" />
          <app-box3-echart />
        </div>
        <div class="center">
          <app-box-control />
          <app-sandbox />
        </div>
        <div class="right">
          <data-title title="车站设备碳排放管控" [reverse]="true" />
          <app-device-manage />
          <data-title title="车站碳排放建议" [reverse]="true" />
          <div class="suguestion">
            当前车站客流量较低，建议可关闭通道、站厅等区域部分照明设备，保留售票机、检票口等重点区域全部照明设备，剩余灯光设备可确保站厅等区域照明度不低于150
            lx，重点区域不低于300 lx。建议可关闭车站通道部分空调设备，保留站厅空调设备，以保证在乘客大量停留的站厅区域温度在体感舒适的26℃。
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './data-screen.component.less'
})
export class DataScreenComponent {}
