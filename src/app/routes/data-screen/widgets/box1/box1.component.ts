/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-11 22:52:34
 * @LastEditors: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @LastEditTime: 2026-04-03 12:52:56
 * @FilePath: \fuzhou-subway-project\src\app\routes\data-screen\widgets\box1\box1.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-box1',
  imports: [NzGridModule, CommonModule],
  template: `
    <div class="box" nz-row>
      @for (item of data; track item.title) {
        <div nz-col nzSpan="12" class="item">
          <img class="item-icon" [src]="'../../../../../assets/tmp/home/' + item.iconSrc" />
          <div class="item-data">
            <div class="value" [ngStyle]="{ color: item.color }">{{ item.value }}</div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './box1.component.less'
})
export class Box1Component implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private http = inject(HttpService);
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private dataRefreshMinutes: number = Number(localStorage.getItem('dataRefreshMinutes') || '20');
  private readonly cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    setTimeout(() => {
      this.loadData();
    });
    this.timer = setInterval(
      () => {
        this.loadData();
      },
      this.dataRefreshMinutes * 1000 * 60
    );
  }
  timer: any;
  loadData(): void {
    this.http.api.carbonTotal().subscribe({
      next: res => {
        if (res.code === 0) {
          const data = res['data'] || {};
          Object.keys(data).forEach(key => {
            const index = this.data.findIndex(item => item['key'] == key);
            if (index > -1) {
              this.data[index]['value'] = String(data[key]);
            }
          });
          this.data = [...this.data];
          this.cdr.detectChanges();
        }
      },
      error: err => {
        console.error('请求失败：', err);
      }
    });
  }

  public data: any[] = [
    { key: 'totalEnergy', iconSrc: 'logo1.png', title: '累计能耗(kW·h)', value: '180.50', color: '#5087EC' },
    { key: 'savedEnergy', iconSrc: 'logo4.png', title: '节能耗(kW·h)', value: '54.52', color: '#58A55C' },
    { key: 'totalCarbon', iconSrc: 'logo2.png', title: '碳排放总量(kg)', value: '141.69', color: '#5087EC' },
    { key: 'reducedCarbon', iconSrc: 'logo4.png', title: '减少碳排放(kg)', value: '42.8', color: '#58A55C' },
    { key: 'electricityCost', iconSrc: 'logo3.png', title: '电费(元)', value: '108.30', color: '#5087EC' },
    { key: 'savedCost', iconSrc: 'logo4.png', title: '节约费用(元)', value: '32.71', color: '#58A55C' }
  ];
}
