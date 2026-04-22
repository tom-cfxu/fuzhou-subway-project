/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter, inject, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

import { Respond } from './api';
import { HttpService } from './http.service';

const suggestionObject: Record<number, string> = {
  1: `当前车站客流量较低，建议可关闭通道、站厅等区域部分照明设备，保留售票机、检票口等重点区域全部照明设备，剩余灯光设备可确保站厅等区域照明度不低于150 lx，重点区域不低于300 lx。建议可关闭车站通道部分空调设备，保留站厅空调设备，以保证在乘客大量停留的站厅区域温度在体感舒适的26℃。`,
  2: `当前车站客流量较低； 根据 GB 50157-2013 地铁设计规范标准，建 议可降低车站出入口通道、 站厅空调设备至普通功率，保障区域温度≤30℃， 新风量不少于总送风量的10%。`,
  3: `当前车站客流量较低； 根据 GB 50157-2013 地铁设计规范标准，建议可降低车站出入口通道、 站厅空调设备至普通功率，降低站台空调设备至低功率， 保障区域温度≤30℃， 新风量不少于总送风量的10%。`,
  4: `当前车站客流量较低；根据 GB/T 16275-2025 城市轨道交通照明标准，建议可关闭出入口通道部分照明设备，保障该区域照度不低于150lx；保留站厅、站台区域全部照明设备，保障区域照度不低于100lx。根据 GB 50157-2013 地铁设计规范标准，建议可降低车站出入口通道、站厅空调设备至普通功率，降低站台空调设备至低功率，保障区域温度≤30℃，新风量不少于总送风量的10%。`,
  // 5: `当前车站客流量较低；根据 GB/T 16275-2025 城市轨道交通照明/标准，建议可关闭出入口通道部分照明设备，保障该区域照度不低于150lx；保留站厅、站台区域全部照明设备，保障区域照度不低于100lx。根据 GB 50157-2013 地铁设计规范标准，建议可降低车站出入口通道、站厅空调设备至普通功率，降低站台空调设备至低功率，保障区域温度≤30℃，新风量不少于总送风量的10%。`
  6: `高客流 ：车站能耗设备默认状态符合高客流要求，请勿随意调节`
};

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private http = inject(HttpService);
  public msg = inject(NzMessageService);

  public mode = 0;
  public level = 0;
  public deviceTotalList: any[] = [];

  energyAssessment_result = 4;
  private _suggestion = suggestionObject[4];

  get suggestion() {
    return this._suggestion;
  }

  set suggestion(value: string) {
    this._suggestion = value;
    this.suggestionEvent.emit(value);
  }

  suggestionEvent = new EventEmitter<string>();
  deviceUpdateEvent = new EventEmitter<any>();

  satisfaction_light = 0;
  satisfaction_ac = 0;
  statistics_light() {
    const lightgroup1 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'lamp' && d.deviceGroup === 1)
      .map((d: any) => d.deviceValue);
    const lightgroup2 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'lamp' && d.deviceGroup === 2)
      .map((d: any) => d.deviceValue);
    const lightgroup3 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'lamp' && d.deviceGroup === 3)
      .map((d: any) => d.deviceValue);
    const lightgroup4 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'lamp' && d.deviceGroup === 4)
      .map((d: any) => d.deviceValue);
    const groupResult1 = lightgroup1.reduce((a: any, b: any) => a || b);
    const groupResult2 = lightgroup2.reduce((a: any, b: any) => a || b);
    const groupResult3 = lightgroup3.reduce((a: any, b: any) => a || b);
    const groupResult4 = lightgroup4.reduce((a: any, b: any) => a || b);
    const groupResult3_1 = lightgroup3.reduce((a: any, b: any) => a && b);
    const groupResult4_1 = lightgroup4.reduce((a: any, b: any) => a && b);

    if ((groupResult1 && groupResult2 && groupResult3 && groupResult4) === 0) {
      this.satisfaction_light = 0;
    }

    if ((groupResult1 && groupResult2 && groupResult3 && groupResult4) === 1) {
      this.satisfaction_light = 2;
    }

    if ((groupResult1 && groupResult2 && groupResult4) === 1 && groupResult3_1 == 1) {
      this.satisfaction_light = 3;
    }

    if ((groupResult1 && groupResult2) === 1 && groupResult4_1 == 1 && groupResult3_1 == 1) {
      this.satisfaction_light = 5;
    }
  }
  statistics_air() {
    // console.log(this.deviceTotalList);
    const airgroup1 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'aircondition' && d.deviceGroup === 1)
      .map((d: any) => d.deviceValue)[0];
    const airgroup2 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'aircondition' && d.deviceGroup === 2)
      .map((d: any) => d.deviceValue)[0];
    const airgroup4 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'aircondition' && d.deviceGroup === 4)
      .map((d: any) => d.deviceValue)[0];
    if ((airgroup1 === 1 || airgroup2 === 1) && airgroup4 === 1) {
      this.satisfaction_ac = 0;
    }

    if (airgroup1 !== 1 && airgroup2 !== 1 && airgroup4 === 1) {
      this.satisfaction_ac = 2;
    }

    if ((airgroup1 === 1 || airgroup2 === 1) && airgroup4 !== 1) {
      this.satisfaction_ac = 3;
    }

    if (airgroup1 !== 1 && airgroup2 !== 1 && airgroup4 !== 1) {
      this.satisfaction_ac = 5;
    }
  }

  energyAssessment() {
    if (this.level == 1) {
      this.suggestion = suggestionObject[6];
      return;
    }
    if (this.mode === 0 && this.level == 1) {
      return;
    }
    const l_group1 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'lamp' && d.deviceGroup === 1)
      .map((item: any) => item.deviceValue); //A出入口
    const l_group2 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'lamp' && d.deviceGroup === 2)
      .map((item: any) => item.deviceValue); //B出入口
    const l_group3 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'lamp' && d.deviceGroup === 3)
      .map((item: any) => item.deviceValue); //站台
    const l_group4 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'lamp' && d.deviceGroup === 4)
      .map((item: any) => item.deviceValue); //站厅

    const a_group1 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'aircondition' && d.deviceGroup === 1)
      .map((item: any) => item.deviceValue)[0]; //A出入口
    const a_group2 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'aircondition' && d.deviceGroup === 2)
      .map((item: any) => item.deviceValue)[0]; //B出入口
    const a_group3 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'aircondition' && d.deviceGroup === 3)
      .map((item: any) => item.deviceValue)[0]; //站台
    const a_group4 = this.deviceTotalList
      .filter((d: any) => d.deviceType === 'aircondition' && d.deviceGroup === 4)
      .map((item: any) => item.deviceValue)[0]; //站厅

    const l_group1_yu = l_group1.reduce((a: any, b: any) => a && b);
    const l_group1_huo = l_group1.reduce((a: any, b: any) => a || b);

    const l_group2_yu = l_group2.reduce((a: any, b: any) => a && b);
    const l_group2_huo = l_group2.reduce((a: any, b: any) => a || b);

    const l_group3_yu = l_group3.reduce((a: any, b: any) => a && b);
    // const l_group3_huo = l_group3.reduce((a: any, b: any) => a || b);

    const l_group4_yu = l_group4.reduce((a: any, b: any) => a && b);
    // const l_group4_huo = l_group4.reduce((a: any, b: any) => a || b);

    const l_group3_result = l_group3_yu == 1; //全1
    const l_group4_result = l_group4_yu == 1; //全1
    const a_group = [a_group1, a_group2, a_group4];

    //遗憾未实现
    const l_group_result4 = l_group1_huo != 0 && l_group2_huo != 0 && (l_group1_yu || l_group2_yu); //AB 非00且存在11
    const a_result4 = a_group1 === 3 && a_group2 === 3 && a_group4 === 3 && a_group3 != 1; //AB 站厅 全3且站台非1
    if (l_group_result4 && l_group3_result && l_group4_result && a_result4) {
      this.energyAssessment_result = 4;
      this.suggestion = suggestionObject[4];
      return;
    }
    //节能达人
    const l_group_result3 = l_group1_huo != 0 && l_group1_yu != 1 && l_group2_huo != 0 && l_group2_yu != 1; //非00且非11
    const a_result3 = (a_group1 != 1 || a_group2 != 1 || a_group4 != 1) && a_group.findIndex((v: any) => v === 3) > -1 && a_group3 != 1; //AB 站厅 非1且存在3 且站台非1
    if (l_group_result3 && l_group3_result && l_group4_result && a_result3) {
      this.energyAssessment_result = 3;
      this.suggestion = suggestionObject[3];
      return;
    }
    //节能高手
    const l_group_result2 = l_group1_huo != 0 && l_group1_yu != 1 && l_group2_huo != 0 && l_group2_yu != 1; //非00且非11
    const a_result2 = (a_group1 != 1 || a_group2 != 1 || a_group4 != 1) && a_group.findIndex((v: any) => v === 3) > -1 && a_group3 == 1; //AB 站厅 非1且存在3 且站台1
    if (l_group_result2 && l_group3_result && l_group4_result && a_result2) {
      this.energyAssessment_result = 2;
      this.suggestion = suggestionObject[2];
      return;
    }
    //节能大师
    const l_group_result1 = l_group1_huo != 0 && l_group1_yu != 1 && l_group2_huo != 0 && l_group2_yu != 1; //非00且非11
    const a_result1 = (a_group1 == 2 || a_group2 == 1 || a_group4 == 1) && a_group3 == 1; //AB 站厅 全2 且站台1
    if (l_group_result1 && l_group3_result && l_group4_result && a_result1) {
      this.energyAssessment_result = 1;
      this.suggestion = suggestionObject[1];
      return;
    }
  }

  initSatisfaction() {
    if (this.level == 1) {
      const l = this.deviceTotalList.filter((d: any) => d.deviceType === 'lamp').every((item: any) => item.deviceValue === 1);
      if (l) {
        this.satisfaction_light = 5;
      } else {
        this.satisfaction_light = 0;
      }
      const a = this.deviceTotalList.filter((d: any) => d.deviceType === 'aircondition').every((item: any) => item.deviceValue === 3);
      if (a) {
        this.satisfaction_ac = 5;
      } else {
        this.satisfaction_ac = 0;
      }
    } else {
      this.statistics_light();
      this.statistics_air();
    }
  }
  initDeviceTotal(): void {
    this.http.api.deviceAll().subscribe({
      next: res => {
        if (res.code === 0) {
          this.deviceTotalList = res.data || [];
          this.mode = this.deviceTotalList.find((d: any) => d.deviceKey === 'emc')?.deviceValue || 0;
          this.level = this.deviceTotalList.find((d: any) => d.deviceKey === 'footfall')?.deviceValue || 0;
          this.initSatisfaction();
          this.energyAssessment();
          this.deviceUpdateEvent.emit(this.deviceTotalList);
        }
      },
      error: err => {
        console.log('err', err);
      }
    });
  }
  deviceControl(type: 'ac' | 'lamp' | 'emc' | 'footfall', deviceId: string, deviceValue: any): Observable<boolean> {
    if (this.mode === 0 && type !== 'emc' && type !== 'footfall') {
      console.warn('当前处于节能模式，无法控制设备');
      this.msg.warning('当前处于节能模式，无法控制设备,请切换到手动模式后再试！');
      return new Observable(o => o.next(false));
    }
    return new Observable(o => {
      const httpApiMap = {
        lamp: this.http.api.deviceSendLampMessage,
        ac: this.http.api.deviceSendAirConditionMessage,
        emc: this.http.api.deviceSendEmcMessage,
        footfall: this.http.api.deviceSendFootfallMessage
      };
      const api = httpApiMap[type];
      if (!api) {
        console.error('Unsupported device type:', type);
        return;
      }
      api({ deviceId, deviceValue }).subscribe({
        next: (res: Respond) => {
          if (res.code === 0 && res.data) {
            o.next(true);
            this.initDeviceTotal();
          } else {
            o.next(false);
          }
        },
        error: (err: any) => {
          console.log('err', err);
          o.next(false);
        }
      });
    });
  }

  deviceBatchControl(data: any[]): Observable<boolean> {
    return new Observable(o => {
      this.http.api.deviceSendBatchMessage(data).subscribe({
        next: (res: Respond) => {
          if (res.code === 0 && res.data) {
            o.next(true);
            this.initDeviceTotal();
          } else {
            o.next(false);
          }
        },
        error: (err: any) => {
          console.log('err', err);
          o.next(false);
        }
      });
    });
  }
}
