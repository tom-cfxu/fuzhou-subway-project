/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
/*
 * @Author: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @Date: 2026-03-13 18:36:43
 * @LastEditors: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @LastEditTime: 2026-03-17 16:32:34
 * @FilePath: \fuzhou-subway-project\src\app\routes\data-screen\widgets\sandbox\sandbox.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Light1Component } from './widgets/light1/light1.component';
import { Light2Component } from './widgets/light2/light2.component';
// import { MqttTotalService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'app-sandbox',
  imports: [Light1Component, Light2Component],
  template: `
    <div class="container">
      <div class="sandbox">
        <img style="z-index: 9;" class="map" src="../../../../../assets/tmp/home/map.png" />
        <app-light1
          style="z-index: 98;left:230px;top:370px;"
          lightName="检票区域照明设备"
          [on]="lightData['001']"
          [isControl]="true"
          (changeOn)="changeLight(1, $event)"
        />
        <app-light1
          style="z-index: 97;left:370px;top:447px;"
          lightName="售票区域照明设备"
          [on]="lightData['002']"
          [isControl]="true"
          (changeOn)="changeLight(2, $event)"
        />
        <app-light1
          style="z-index: 96;left:470px;top:307px;"
          lightName="站厅照明-设备1"
          [on]="lightData['003']"
          [isControl]="true"
          (changeOn)="changeLight(2, $event)"
        />
        <app-light1
          style="z-index: 95;left:650px;top:297px;"
          lightName="站厅照明-设备2"
          [on]="lightData['004']"
          [isControl]="true"
          (changeOn)="changeLight(2, $event)"
        />
        <app-light1
          style="z-index: 94;left:820px;top:297px;"
          [lightNameR]="true"
          lightName="站台照明-设备1"
          [on]="lightData['005']"
          [isControl]="true"
          (changeOn)="changeLight(2, $event)"
        />
        <app-light1
          style="z-index: 93;left:700px;top:447px;"
          lightName="站台照明-设备2"
          [on]="lightData['006']"
          [isControl]="true"
          (changeOn)="changeLight(2, $event)"
        />

        <app-light2
          style="z-index: 99;left:120px;top:230px;"
          [on]="lightData['007']"
          [isControl]="true"
          (changeOn)="changeLight(2, $event)"
        />
        <app-light2
          style="z-index: 99;left:280px;top:230px;"
          [on]="lightData['008']"
          [isControl]="true"
          (changeOn)="changeLight(2, $event)"
        />
        <app-light2
          [rotate]="-90"
          style="z-index: 99;left:-10px;top:270px;"
          [on]="lightData['009']"
          [isControl]="true"
          (changeOn)="changeLight(2, $event)"
        />

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
export class SandboxComponent implements OnInit, OnDestroy {
  // private readonly mqtt = inject(MqttTotalService);
  private readonly cdr = inject(ChangeDetectorRef);
  e1: any;

  lightData: any = {
    '001': false,
    '002': false,
    '003': false,
    '004': false,
    '005': false,
    '006': false,
    '007': false,
    '008': false,
    '009': false
  };

  ngOnDestroy(): void {
    if (this.e1) {
      this.e1.unsubscribe();
    }
  }
  ngOnInit(): void {
    // this.e1 = this.mqtt.lightEvent.subscribe((data: any) => {
    //   // console.log('lightEvent2', data);
    //   const { deviceId, deviceValue } = data;
    //   this.lightData[deviceId] = deviceValue;
    //   // console.log('Updated lightData:', this.lightData);
    //   this.cdr.detectChanges();
    // });
  }
  changeLight(index: number, status: boolean): void {
    console.log(index, status);
  }
}
