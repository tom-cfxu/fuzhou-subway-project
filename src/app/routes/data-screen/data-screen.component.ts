/* eslint-disable prettier/prettier */
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { MqttDynamicService } from 'src/app/services/mqtt-dynamic.service';

import { BoxCeterControlComponent } from './widgets/box-control/box-control.component';
import { Box1Component } from './widgets/box1/box1.component';
import { Box2EchartComponent } from './widgets/box2-echart/box2-echart.component';
import { Box3EchartComponent } from './widgets/box3-echart/box3-echart.component';
import { DeviceManageComponent } from './widgets/device-manage/device-manage.component';
import { SandboxComponent } from './widgets/sandbox/sandbox.component';
import { DataTitleComponent } from './widgets/title/title.component';

@Component({
  selector: 'app-data-screen',
  imports: [
    DataTitleComponent,
    Box1Component,
    Box2EchartComponent,
    Box3EchartComponent,
    BoxCeterControlComponent,
    DeviceManageComponent,
    SandboxComponent
  ],
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
            {{ suggestion }}
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './data-screen.component.less'
})
export class DataScreenComponent implements OnInit, OnDestroy {
  private device = inject(DeviceService);
  private mqtt = inject(MqttDynamicService);

  private cdr = inject(ChangeDetectorRef);
  public suggestion = this.device.suggestion;
  private e1: any;

  ngOnInit(): void {
    this.device.initDeviceTotal();
    this.mqtt.connectServer();
    this.e1 = this.device.suggestionEvent.subscribe((s: string) => {
      this.suggestion = s;
      this.cdr.detectChanges();
    });
  }
  ngOnDestroy(): void {
    if (this.e1) {
      this.e1.unsubscribe();
    }
  }
}
