/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-12 02:06:23
 * @LastEditors: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @LastEditTime: 2026-03-18 15:25:08
 * @FilePath: \fuzhou-subway-project\src\app\routes\data-screen\widgets\device-manage\device-manage.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
// eslint-disable-next-line import/order
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
// import { MqttTotalService } from 'src/app/services/mqtt.service';

import { DeviceService } from 'src/app/services/device.service';
import { MqttDynamicService } from 'src/app/services/mqtt-dynamic.service';

import { DeviceItemComponent } from '../device-item/device-item.component';
import { ManyiduComponent } from '../manyidu/manyidu.component';
import { PowerSliderComponent } from '../power-slider/power-slider.component';
@Component({
  selector: 'app-device-manage',
  imports: [ManyiduComponent, DeviceItemComponent, NzModalModule],
  template: `
    <div class="container">
      <div class="title">照明设备管控</div>
      <app-manyidu [value]="satisfaction_light" />
      <app-device-item [data]="device_light" />
      <div class="title">空调设备管控</div>
      <app-manyidu [value]="satisfaction_ac" />
      <app-device-item type="ac" [data]="device_air" />
    </div>
  `,
  styleUrl: './device-manage.component.less'
})
export class DeviceManageComponent implements OnInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);

  timer: any;

  satisfaction_light = 0;
  satisfaction_ac = 0;

  // private readonly mqtt = inject(MqttTotalService);
  private readonly modal = inject(NzModalService);
  constructor() {}
  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
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

  e1: any;
  lightEvent: any;
  airEvent: any;

  private mqtt = inject(MqttDynamicService);
  private readonly device = inject(DeviceService);
  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.device.initDeviceTotal();
    }, 1000 * 10);

    this.e1 = this.device.deviceUpdateEvent.subscribe((data: any) => {
      const l = data.filter((d: any) => d.deviceType === 'lamp');
      const a = data.filter((d: any) => d.deviceType === 'aircondition');
      this.device_light.forEach((item: any) => {
        item.status = l.find((d: any) => d.deviceKey === item.deviceKey)?.deviceValue;
        item.value = l.find((d: any) => d.deviceKey === item.deviceKey)?.carbonEmission.toFixed(1);
      });
      this.device_air.forEach((item: any) => {
        item.status = a.find((d: any) => d.deviceKey === item.deviceKey)?.deviceValue;
        item.value = a.find((d: any) => d.deviceKey === item.deviceKey)?.carbonEmission.toFixed(1);
      });
      this.device_light = [...this.device_light];
      this.device_air = [...this.device_air];
      this.initSatisfaction();
      this.cdr.detectChanges();
    });

    this.lightEvent = this.mqtt.lightEvent.subscribe((data: any) => {
      // console.log('lightEvent', data);
      const index = this.device_light.findIndex((item: any) => item.deviceKey === data.deviceId);
      this.device_light[index].status = data.deviceValue;
      this.device_light = [...this.device_light];
      this.cdr.detectChanges();
      // const index = this.light.findIndex(item => item.deviceKey === data.deviceKey);
    });
    this.airEvent = this.mqtt.airEvent.subscribe((data: any) => {
      // console.log('airEvent', data);
      const index = this.device_air.findIndex((item: any) => item.deviceKey === data.deviceId);
      this.device_air[index].status = data.deviceValue;
      this.device_air = [...this.device_air];

      this.cdr.detectChanges();
    });
  }

  device_light: any[] = [
    {
      deviceKey: 'lamp001',
      deviceName: 'A出入口通道-照明-1',
      deviceType: 'lamp',
      title: 'A出入口通道-照明-1',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      deviceKey: 'lamp002',
      deviceName: 'A出入口通道-照明-2',
      deviceType: 'lamp',
      title: 'A出入口通道-照明-2',
      status: 0,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      deviceKey: 'lamp003',
      deviceName: 'B出入口通道-照明-1',
      deviceType: 'lamp',
      title: 'B出入口通道-照明-1',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      deviceKey: 'lamp004',
      deviceName: 'B出入口通道-照明-2',
      deviceType: 'lamp',
      title: 'B出入口通道-照明-2',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      deviceKey: 'lamp005',
      deviceName: '站台-照明-1',
      deviceType: 'lamp',
      title: '站台-照明-1',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      deviceKey: 'lamp006',
      deviceName: '站台-照明-2',
      deviceType: 'lamp',
      title: '站台-照明-2',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      deviceKey: 'lamp007',
      deviceName: '站厅-照明-1',
      deviceType: 'lamp',
      title: '站厅-照明-1',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      deviceKey: 'lamp008',
      deviceName: '站厅-照明-2',
      deviceType: 'lamp',
      title: '站厅-照明-2',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    }
  ];

  device_air: any[] = [
    {
      deviceKey: 'ac001',
      deviceName: 'A出入口通道-空调-1',
      deviceType: 'aircondition',
      title: 'A出入口通道-空调-1',
      status: 1,
      stateOject: { 1: '低功率', 2: '正常', 3: '高功率' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changePower(item);
      }
    },
    {
      deviceKey: 'ac002',
      deviceName: 'B出入口通道-空调-1',
      deviceType: 'aircondition',
      title: 'B出入口通道-空调-1',
      status: 1,
      stateOject: { 1: '低功率', 2: '正常', 3: '高功率' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changePower(item);
      }
    },
    {
      deviceKey: 'ac003',
      deviceName: '站厅-空调-1',
      deviceType: 'aircondition',
      title: '站厅-空调-1',
      status: 2,
      stateOject: { 1: '低功率', 2: '正常', 3: '高功率' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changePower(item);
      }
    },
    {
      deviceKey: 'ac004',
      deviceName: '站台-空调-1',
      deviceType: 'aircondition',
      title: '站台-空调-1',
      status: 2,
      stateOject: { 1: '低功率', 2: '正常', 3: '高功率' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changePower(item);
      }
    }
  ];

  initSatisfaction() {
    this.satisfaction_light = this.device.satisfaction_light;
    this.satisfaction_ac = this.device.satisfaction_ac;
  }

  changeLight(item: any): void {
    // console.log('item', item);
    const { deviceKey, deviceName, status } = item;
    this.modal.create({
      nzTitle: `${(status ? '是否关闭 ' : '是否开启 ') + deviceName} ？`,
      nzClassName: 'energy-modal-confirm',
      nzCentered: true,
      nzMaskClosable: true,
      nzOnOk: () => {
        // this.on = Number(!this.on);
        setTimeout(() => {
          this.device.deviceControl('lamp', deviceKey, Number(!status)).subscribe((res: boolean) => {
            console.log('控制照明结果', res);
            // this.cdr.detectChanges();
          });
        });
      }
    });
  }

  changePower(item: any): void {
    // console.log('item',item);
    // const index = item['index'];
    const { deviceKey } = item;
    this.modal.create({
      nzTitle: item.title,
      nzClassName: 'energy-modal',
      nzContent: PowerSliderComponent,
      nzData: {
        powerLevel: item.status
      },
      // componentParams
      // nzViewContainerRef: this.viewContainerRef,
      nzCentered: true,
      nzMaskClosable: true,
      nzOnOk: componentInstance => {
        // this.device_air[index]['status'] = componentInstance.powerLevel;
        // this.device_air = [...this.device_air];
        this.device.deviceControl('ac', deviceKey, componentInstance.powerLevel).subscribe((res: boolean) => {
          console.log('控制空调结果', res);
          // this.cdr.detectChanges();
        });
        // console.log('ss',componentInstance.powerLevel);
      }
    });
  }
}
