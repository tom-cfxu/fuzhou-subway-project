/* eslint-disable import/order */
import { EventEmitter, inject, Injectable, OnDestroy } from '@angular/core';
import type { QoS } from 'mqtt';

// 🔥 Vite + Angular 17 唯一兼容导入
import mqtt from 'mqtt/dist/mqtt.min';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MqttDynamicService implements OnDestroy {
  private mqttClient: any = null;
  public message$ = new Subject<{ topic: string; payload: string }>();
  public connected$ = new Subject<boolean>();

  private msg = inject(NzMessageService);

  public totalEvent = new EventEmitter<any>();

  public lightEvent = new EventEmitter<any>();
  public airEvent = new EventEmitter<any>();
  public footfallEvent = new EventEmitter<any>();
  public emcEvent = new EventEmitter<any>();

  connectServer() {
    this.disconnect();

    const config = JSON.parse(localStorage.getItem('mqtt') || '{}') as any;

    const clientId = `angular17_${Math.random().toString(16).slice(2, 10)}`;

    const url = `ws://${config.host}:${config.port}${config.path || '/mqtt'}`;

    const options = {
      username: config.username,
      password: config.password,
      clientId,
      reconnectPeriod: 3000
    };

    this.mqttClient = mqtt.connect(url, options);

    this.mqttClient.on('connect', () => {
      console.log('✅ MQTT 连接成功', url);
      console.log('🔑开始订阅主题');
      this.subscribeTopic('v1/front-end/devices/subscribe');
      this.connected$.next(true);
    });

    this.mqttClient.on('message', (topic: string, payload: Uint8Array) => {
      console.log('📩 收到消息', topic, JSON.parse(new TextDecoder().decode(payload)));
      this.message$.next({
        topic,
        payload: new TextDecoder().decode(payload)
      });

      const data = JSON.parse(new TextDecoder().decode(payload));
      const { code } = data;
      if (code == 500) {
        this.msg.error(data.msg || '设备控制失败');
        return;
      } else if (code == 200) {
        this.totalEvent.emit(data);
        switch (data.deviceType) {
          case 'lamp':
            this.lightEvent.emit(data);
            break;
          case 'aircondition':
            this.airEvent.emit(data);
            break;
          case 'footfall':
            this.footfallEvent.emit(data);
            break;
          case 'emc':
            this.emcEvent.emit(data);
            break;
        }
      }
    });

    this.mqttClient.on('close', () => {
      this.connected$.next(false);
    });

    this.mqttClient.on('error', (err: any) => {
      console.error('MQTT 错误', err);
    });
  }

  subscribeTopic(topic: string, qos: QoS = 0) {
    this.mqttClient?.subscribe(topic, { qos });
  }

  publish(topic: string, message: string, qos: QoS = 0) {
    this.mqttClient?.publish(topic, message, { qos });
  }

  disconnect() {
    if (this.mqttClient) {
      this.mqttClient.end(true);
      this.mqttClient = null;
    }
  }

  ngOnDestroy() {
    this.disconnect();
  }
}
