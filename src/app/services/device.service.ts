import { EventEmitter, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Respond } from './api';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private http = inject(HttpService);

  deviceTotalList: any[] = [];
  deviceUpdateEvent = new EventEmitter<any>();

  initDeviceTotal(): void {
    this.http.api.deviceAll().subscribe({
      next: res => {
        if (res.code === 0) {
          this.deviceTotalList = res.data || [];
          this.deviceUpdateEvent.emit(this.deviceTotalList);
        }
      },
      error: err => {
        console.log('err', err);
      }
    });
  }
  deviceControl(type: 'ac' | 'lamp' | 'emc' | 'footfall', deviceId: string, deviceValue: any): Observable<boolean> {
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
}
