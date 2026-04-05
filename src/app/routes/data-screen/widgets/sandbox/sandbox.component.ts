/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
/*
 * @Author: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @Date: 2026-03-13 18:36:43
 * @LastEditors: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @LastEditTime: 2026-04-03 11:04:56
 * @FilePath: \fuzhou-subway-project\src\app\routes\data-screen\widgets\sandbox\sandbox.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LightComponent } from './widgets/light/light.component';
import { DeviceService } from 'src/app/services/device.service';
import { AcComponent } from './widgets/ac/ac.component';
import { MqttDynamicService } from 'src/app/services/mqtt-dynamic.service';
// import { MqttTotalService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'app-sandbox',
  imports: [LightComponent, AcComponent],
  template: `
    <div class="container">
      <div class="sandbox">
        <img style="z-index: 9;" class="map" src="../../../../../assets/tmp/home/bg_center.png" />
        @for (item of light; track item.deviceKey) {
          <app-light
            [deviceKey]="item.deviceKey"
            [style]="item.style"
            [lightName]="item.deviceName"
            [on]="item.deviceValue"
            (changeOn)="changeLight($event)"
          />
        }
        @for (item of air; track item.deviceKey) {
          <app-ac
            [deviceKey]="item.deviceKey"
            [style]="item.style"
            [name]="item.deviceName"
            [power]="item.deviceValue"
            (changePower)="changeAir($event)"
          />
        }
      </div>
    </div>
  `,
  styleUrl: './sandbox.component.less'
})
export class SandboxComponent implements OnInit, OnDestroy {
  // private readonly mqtt = inject(MqttTotalService);
  private readonly cdr = inject(ChangeDetectorRef);

  trackByDeviceKey(index: number, item: any): string {
    // 返回唯一标识（deviceKey 是你的唯一值）
    return item.deviceKey;
  }
  e1: any;
  lightEvent: any;
  airEvent: any;
  light: any[] = [
    {
      deviceKey: 'lamp001',
      deviceName: 'A出入口通道-照明-1',
      deviceType: 'lamp',
      deviceValue: 0,
      style: 'z-index: 999;left:100px;top:580px'
    },
    {
      deviceKey: 'lamp002',
      deviceName: 'A出入口通道-照明-2',
      deviceType: 'lamp',
      deviceValue: 0,
      style: 'z-index: 999;left:100px;top:420px'
    },
    {
      deviceKey: 'lamp003',
      deviceName: 'B出入口通道-照明-1',
      deviceType: 'lamp',
      deviceValue: 0,
      style: 'z-index: 98;right:-75px;top:580px'
    },
    {
      deviceKey: 'lamp004',
      deviceName: 'B出入口通道-照明-2',
      deviceType: 'lamp',
      deviceValue: 0,
      style: 'z-index: 99;right:-75px;top:420px'
    },
    {
      deviceKey: 'lamp005',
      deviceName: '站台-照明-1',
      deviceType: 'lamp',
      deviceValue: 0,
      style: 'z-index: 98;left:330px;top:450px'
    },
    {
      deviceKey: 'lamp006',
      deviceName: '站台-照明-2',
      deviceType: 'lamp',
      deviceValue: 0,
      style: 'z-index: 98;right:180px;top:450px'
    },
    {
      deviceKey: 'lamp007',
      deviceName: '站厅-照明-1',
      deviceType: 'lamp',
      deviceValue: 0,
      style: 'z-index: 98;left:330px;top:265px'
    },
    {
      deviceKey: 'lamp008',
      deviceName: '站厅-照明-2',
      deviceType: 'lamp',
      deviceValue: 0,
      style: 'z-index: 98;right:175px;top:265px'
    }
  ];

  air: any[] = [
    {
      deviceKey: 'ac001',
      deviceName: 'A出入口通道-空调-1',
      deviceType: 'aircondition',
      deviceValue: 1,
      style: 'z-index: 90;left:100px;top:280px'
    },
    {
      deviceKey: 'ac002',
      deviceName: 'B出入口通道-空调-1',
      deviceType: 'aircondition',
      deviceValue: 1,
      style: 'z-index: 90;right:-75px;top:280px'
    },
    {
      deviceKey: 'ac003',
      deviceName: '站厅-空调-1',
      deviceType: 'aircondition',
      deviceValue: 1,
      style: 'z-index: 90;left:420px;top:180px'
    },
    {
      deviceKey: 'ac004',
      deviceName: '站台-空调-1',
      deviceType: 'aircondition',
      deviceValue: 1,
      style: 'z-index: 90;left:460px;top:430px'
    }
  ];

  ngOnDestroy(): void {
    if (this.e1) {
      this.e1.unsubscribe();
    }
    if (this.lightEvent) {
      this.lightEvent.unsubscribe();
    }
    if (this.airEvent) {
      this.airEvent.unsubscribe();
    }
  }

  private device = inject(DeviceService);
  private mqtt = inject(MqttDynamicService);

  ngOnInit(): void {
    this.e1 = this.device.deviceUpdateEvent.subscribe((data: any) => {
      const l = data.filter((d: any) => d.deviceType === 'lamp');
      const a = data.filter((d: any) => d.deviceType === 'aircondition');
      this.light.forEach((item: any) => {
        item.deviceValue = l.find((d: any) => d.deviceKey === item.deviceKey)?.deviceValue;
      });
      this.air.forEach((item: any) => {
        item.deviceValue = a.find((d: any) => d.deviceKey === item.deviceKey)?.deviceValue;
      });
      this.light = [...this.light];
      this.air = [...this.air];
      // console.log('更新light', this.light);
      // console.log('更新air', this.air);
      this.cdr.detectChanges();
    });
    this.lightEvent = this.mqtt.lightEvent.subscribe((data: any) => {
      // console.log('lightEvent', data);
      const index = this.light.findIndex((item: any) => item.deviceKey === data.deviceId);
      this.light[index].deviceValue = data.deviceValue;
      this.light = [...this.light];
      this.cdr.detectChanges();
      // const index = this.light.findIndex(item => item.deviceKey === data.deviceKey);
    });
    this.airEvent = this.mqtt.airEvent.subscribe((data: any) => {
      // console.log('airEvent', data);
      const index = this.air.findIndex((item: any) => item.deviceKey === data.deviceId);
      this.air[index].deviceValue = data.deviceValue;
      this.air = [...this.air];
      this.cdr.detectChanges();
    });
  }
  changeLight({ deviceKey, deviceValue }: { deviceKey: string; deviceValue: number }): void {
    // console.log(deviceKey, deviceValue);
    this.device.deviceControl('lamp', deviceKey, deviceValue).subscribe((res: boolean) => {
      console.log('控制照明结果', res);
    });
  }
  changeAir({ deviceKey, deviceValue }: { deviceKey: string; deviceValue: number }): void {
    // console.log(deviceKey, deviceValue);
    this.device.deviceControl('ac', deviceKey, deviceValue).subscribe((res: boolean) => {
      console.log('控制空调结果', res);
    });
  }
}
