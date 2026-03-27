/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-02 14:42:05
 * @LastEditors: tom-cfxu cfxu963852741@qq.com
 * @LastEditTime: 2026-03-11 20:19:57
 * @FilePath: \my-project\src\app\layout\blank\blank.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// import { MqttService } from 'src/app/services/mqtt1.service';

import { HeaderComponent } from './widgets/header/header.component';

@Component({
  selector: 'layout-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.less'],
  imports: [HeaderComponent, RouterOutlet]
})
export class LayoutBlankComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    // this.mqtt.disconnect();
  }

  // private readonly mqtt = inject(MqttTotalService);
  // private readonly mqttService = inject(MqttService);
  client: any;
  // 1. 使用默认配置（assets/mqtt.config.json）连接
  // async connectWithDefaultConfig() {
  //   try {
  //     this.client = await this.mqttService.connect();
  //     this.mqttService.subscribe('v1/front-end/devices/subscribe'); // 订阅主题
  //   } catch (err) {
  //     console.error('默认配置连接失败：', err);
  //   }
  // }

  // 断开连接
  disconnect() {
    // this.mqttService.disconnect();
  }
  ngOnInit(): void {
    // 订阅 MQTT 消息
    // this.mqttService.getMessageObservable().subscribe(msg => {
    //   console.log('收到消息：', msg.topic, msg.payload);
    // });
    // this.connectWithDefaultConfig();
    // this.mqtt.initConnection();
    // this.mqtt.connectionStatus$.subscribe(status => {
    //   try {
    //     if (status) {
    //       this.mqtt.subscribeTopic('v1/front-end/devices/subscribe');
    //     }
    //   } catch (err) {
    //     console.error('[MQTT] 订阅主题失败：', err);
    //   }
    // });
    // console.log(this.mqtt);
  }
}
