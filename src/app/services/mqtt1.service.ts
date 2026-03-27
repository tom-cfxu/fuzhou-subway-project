/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// 关键修复：1. 改用正确的浏览器路径 2. 忽略类型检查
// @ts-ignore 忽略类型声明缺失的报错
import * as mqtt from 'mqtt/dist/mqtt.browser.min.js'; 
import { Observable, Subject, catchError, firstValueFrom, of } from 'rxjs';

// 保持配置接口不变
export interface MqttConfig {
  host: string;
  protocol: string;
  port: number;
  username?: string;
  password?: string;
  path: string;
  clientId: string;
  keepalive?: number;
  reconnectPeriod?: number;
  clean?: boolean;
}

// 后续服务代码完全不变（复用之前修复后的逻辑）
@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private http = inject(HttpClient);
  private client: any; // 临时改为 any 避免类型报错（或继续用 mqtt.MqttClient）
  private messageSubject = new Subject<{ topic: string; payload: string }>();
  
  // 加载配置方法（不变）
  async loadConfig(configPath = 'assets/mqtt.config.json'): Promise<MqttConfig> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(configPath).pipe(
          catchError(err => {
            console.error('加载 MQTT 配置失败：', err);
            return of({
              mqtt: {
                host: 'localhost',
                protocol: 'ws',
                port: 8083,
                path: '/mqtt',
                clientId: '',
                username: '',
                password: '',
                keepalive: 60,
                reconnectPeriod: 1000,
                clean: true
              }
            });
          })
        )
      );
      const config = response.mqtt;
      if (!config.clientId) {
        config.clientId = `angular-mqtt-${Math.random().toString(16).substring(2, 8)}`;
      }
      return config;
    } catch (err) {
      throw new Error(`加载 MQTT 配置异常：${err}`);
    }
  }

  // 连接方法（不变）
  async connect(config?: MqttConfig): Promise<any> {
    const finalConfig = config || await this.loadConfig();
    const connectUrl = `${finalConfig.protocol}://${finalConfig.host}:${finalConfig.port}${finalConfig.path}`;
    
    if (this.client) {
      this.client.end(true);
    }

    const connectOptions = {
      clientId: finalConfig.clientId,
      username: finalConfig.username,
      password: finalConfig.password,
      keepalive: finalConfig.keepalive,
      reconnectPeriod: finalConfig.reconnectPeriod,
      clean: finalConfig.clean,
      transport: 'websockets'
    };

    try {
      this.client = mqtt.connect(connectUrl, connectOptions);
      
      this.client.on('connect', () => {
        console.log(`MQTT 连接成功：${connectUrl}`);
      });

      this.client.on('message', (topic: string, payload: Buffer) => {
        this.messageSubject.next({
          topic,
          payload: payload.toString()
        });
      });

      this.client.on('error', (err: any) => {
        console.error('MQTT 连接错误：', err);
        this.client?.end(true);
      });

      this.client.on('close', () => {
        console.log('MQTT 连接已断开');
      });

      return this.client;
    } catch (err) {
      throw new Error(`MQTT 连接失败：${err}`);
    }
  }

  // 订阅/发布/断开方法（不变）
  subscribe(topic: string | string[]): void {
    if (!this.client) {
      throw new Error('MQTT 未连接，请先调用 connect()');
    }
    this.client.subscribe(topic, (err: any) => {
      if (err) {
        console.error(`订阅主题失败：${topic}`, err);
      } else {
        console.log(`订阅主题成功：${topic}`);
      }
    });
  }

  publish(topic: string, payload: string | Buffer): void {
    if (!this.client) {
      throw new Error('MQTT 未连接，请先调用 connect()');
    }
    this.client.publish(topic, payload, (err: any) => {
      if (err) {
        console.error(`发布消息失败：${topic}`, err);
      }
    });
  }

  getMessageObservable(): Observable<{ topic: string; payload: string }> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    if (this.client) {
      this.client.end(true);
      this.client = null;
      console.log('MQTT 已断开连接');
    }
  }
}