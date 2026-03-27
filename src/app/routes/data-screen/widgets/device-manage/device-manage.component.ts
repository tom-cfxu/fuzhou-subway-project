/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
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
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
// import { MqttTotalService } from 'src/app/services/mqtt.service';

import { DeviceItemComponent } from '../device-item/device-item.component';
import { ManyiduComponent } from '../manyidu/manyidu.component';
import { PowerSliderComponent } from '../power-slider/power-slider.component';
@Component({
  selector: 'app-device-manage',
  imports: [ManyiduComponent, DeviceItemComponent, NzModalModule],
  template: `
    <div class="container">
      <div class="title">照明设备管控</div>
      <app-manyidu [value]="4" />
      <app-device-item [data]="device_light" />
      <div class="title">空调设备管控</div>
      <app-manyidu [value]="4" />
      <app-device-item [data]="device_air" />
    </div>
  `,
  styleUrl: './device-manage.component.less'
})
export class DeviceManageComponent implements OnInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  // private readonly mqtt = inject(MqttTotalService);
  private readonly modal = inject(NzModalService);
  constructor() {}
  ngOnDestroy(): void {
    if (this.e1) {
      this.e1.unsubscribe();
    }
    if (this.e2) {
      this.e2.unsubscribe();
    }
  }

  e1: any;
  e2: any;
  ngOnInit(): void {
    // this.e1 = this.mqtt.lightEvent.subscribe((data: any) => {
    //   console.log('lightEvent', data);
    // });
    // this.e2 = this.mqtt.airEvent.subscribe((data: any) => {
    //   console.log('airEvent', data);
    // });
  }

  device_light: any[] = [
    {
      title: '出入口通道照明-设备1',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      title: '出入口通道照明-设备2',
      status: 0,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      title: '站厅照明-设备1',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      title: '站厅照明-设备2',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      title: '站台照明-设备1',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      title: '站台照明-设备2',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      title: '售票区域照明设备',
      status: 1,
      stateOject: { 1: '开启中', 0: '关闭中' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changeLight(item);
      }
    },
    {
      title: '检票区域照明设备',
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
      title: '出入口通道空调-设备1',
      status: 1,
      stateOject: { 1: '低功率', 2: '正常', 3: '高功率' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changePower(item);
      }
    },
    {
      title: '出入口通道空调-设备2',
      status: 1,
      stateOject: { 1: '低功率', 2: '正常', 3: '高功率' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changePower(item);
      }
    },
    {
      title: '站厅空调-设备1',
      status: 2,
      stateOject: { 1: '低功率', 2: '正常', 3: '高功率' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changePower(item);
      }
    },
    {
      title: '站厅空调-设备2',
      status: 2,
      stateOject: { 1: '低功率', 2: '正常', 3: '高功率' },
      subtitle: '累计碳排放(kg)',
      value: '26.0',
      click: (item: any) => {
        this.changePower(item);
      }
    }
  ];

  changeLight(item: any): void {
    console.log('item', item);
  }

  changePower(item: any): void {
    // console.log('item',item);
    const index = item['index'];
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
      nzMaskClosable: false,
      nzOnOk: componentInstance => {
        this.device_air[index]['status'] = componentInstance.powerLevel;
        this.device_air = [...this.device_air];
        this.cdr.detectChanges();
        // console.log('ss',componentInstance.powerLevel);
      }
    });
  }
}
