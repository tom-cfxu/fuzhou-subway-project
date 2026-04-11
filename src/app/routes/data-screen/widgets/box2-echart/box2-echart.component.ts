import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartEChartsModule, ChartEChartsOption } from '@delon/chart/chart-echarts';
import moment from 'moment';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-box2-echart',
  imports: [FormsModule, NzCheckboxModule, NzGridModule, ChartEChartsModule, NzSpinModule],
  template: `
    <!-- <nz-spin [nzSpinning]="isSpinning"> -->
    <div class="main">
      <nz-checkbox-group [(ngModel)]="value" [style.width.%]="22" (ngModelChange)="changeRadio($event)">
        <nz-row>
          <nz-col nzSpan="24">
            <label nz-checkbox nzValue="车站空调系统">车站空调系统</label>
          </nz-col>
          <nz-col nzSpan="24">
            <label nz-checkbox nzValue="站台门系统">站台门系统</label>
          </nz-col>
          <nz-col nzSpan="24">
            <label nz-checkbox nzValue="环控系统">环控系统</label>
          </nz-col>
          <nz-col nzSpan="24">
            <label nz-checkbox nzValue="照明系统">照明系统</label>
          </nz-col>
          <nz-col nzSpan="24">
            <label nz-checkbox nzValue="变电系统">变电系统</label>
          </nz-col>
          <nz-col nzSpan="24">
            <label nz-checkbox nzValue="电梯系统">电梯系统</label>
          </nz-col>
          <nz-col nzSpan="24">
            <label nz-checkbox nzValue="AFC系统">AFC系统</label>
          </nz-col>
        </nz-row>
      </nz-checkbox-group>

      <div [style.width.px]="300">
        <chart-echarts class="echart" width="100%" height="100%" [option]="option" theme="dark" />
        <!--  (events)="handleEvents($event)"  -->
      </div>
    </div>
    <!-- </nz-spin> -->
  `,
  styleUrl: './box2-echart.component.less'
})
export class Box2EchartComponent implements OnInit, AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  ngAfterViewInit(): void {
    this.changeRadio(this.value);
  }

  timer: any;
  private dataRefreshMinutes = Number(localStorage.getItem('dataRefreshMinutes') || '20');
  ngOnInit(): void {
    this.cdr.detectChanges();
    this.changeRadio(this.value);
    this.timer = setInterval(
      () => {
        this.changeRadio(this.value);
      },
      this.dataRefreshMinutes * 1000 * 60
    );
  }
  isSpinning = true;

  value: any[] = ['车站空调系统', '照明系统'];
  private readonly cdr = inject(ChangeDetectorRef);
  radioData: any = {
    车站空调系统: {
      key: 'ac',
      data: [],
      color: 'rgb(74, 158, 255)',
      colorStops: [
        { offset: 0, color: 'rgba(74, 158, 255, 0.3)' },
        { offset: 1, color: 'rgba(74, 158, 255, 0)' }
      ]
    },
    站台门系统: {
      key: 'door',
      data: [],
      color: 'rgb(99, 192, 211)',
      colorStops: [
        { offset: 0, color: 'rgba(99, 192, 211, 0.3)' },
        { offset: 1, color: 'rgba(99, 192, 211, 0)' }
      ]
    },
    环控系统: {
      key: 'env',
      data: [],
      color: 'rgb(88, 179, 104)',
      colorStops: [
        { offset: 0, color: 'rgba(88, 179, 104, 0.3)' },
        { offset: 1, color: 'rgba(88, 179, 104, 0)' }
      ]
    },
    照明系统: {
      key: 'light',
      data: [],
      color: 'rgb(242, 188, 56)',
      colorStops: [
        { offset: 0, color: 'rgba(242, 188, 56, 0.3)' },
        { offset: 1, color: 'rgba(242, 188, 56, 0)' }
      ]
    },
    变电系统: {
      key: 'sub',
      data: [],
      color: 'rgb(242, 124, 56)',
      colorStops: [
        { offset: 0, color: 'rgba(242, 124, 56, 0.3)' },
        { offset: 1, color: 'rgba(242, 124, 56, 0)' }
      ]
    },
    电梯系统: {
      key: 'ele',
      data: [],
      color: 'rgb(230, 76, 64)',
      colorStops: [
        { offset: 0, color: 'rgba(230, 76, 64, 0.3)' },
        { offset: 1, color: 'rgba(230, 76, 64, 0)' }
      ]
    },
    AFC系统: {
      key: 'afc',
      data: [],
      color: 'rgb(246, 252, 150)',
      colorStops: [
        { offset: 0, color: 'rgba(246, 252, 150, 0.3)' },
        { offset: 1, color: 'rgba(246, 252, 150, 0)' }
      ]
    }
  };

  option: ChartEChartsOption = {
    textStyle: {
      fontFamily: 'PingFangSC-Regular',
      fontSize: 12
    },
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: { backgroundColor: '#6a7985' }
      },
      backgroundColor: 'rgba(5, 18, 45, 0.7)',
      borderColor: 'rgba(38, 111, 255)',
      textStyle: {
        color: '#ffffff', // 文字白色
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular'
      }
    },
    dataZoom: [
      // 1. 外部滑动条（slider）：可视化拖拽
      {
        type: 'slider',
        xAxisIndex: 0,
        start: 0,
        end: 100,
        height: 22,
        bottom: 10,

        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        fillerColor: 'rgba(74, 136, 244, 0.12)',
        borderColor: 'rgba(74, 136, 244, 0.15)',
        borderWidth: 1,

        handleSize: '70%',
        handleStyle: {
          color: 'rgba(74, 136, 244, 0.7)',
          borderColor: 'rgba(255,255,255,0.3)',
          borderWidth: 1,
          shadowBlur: 4,
          shadowColor: 'rgba(74, 136, 244, 0.15)'
        },

        textStyle: {
          color: '#fff',
          fontSize: 11
        },

        emphasis: {
          handleStyle: {
            color: '#4a88f4',
            borderColor: '#fff',
            shadowBlur: 6,
            shadowColor: 'rgba(74, 136, 244, 0.2)'
          }
        }
      },
      // 2. 内部缩放（inside）：鼠标滚轮/拖拽
      {
        type: 'inside',
        xAxisIndex: 0
      }
    ],
    legend: {
      data: ['照明系统碳排放', '车站空调碳排放'],
      top: 10,
      textStyle: {
        color: '#fff'
      },
      itemWidth: 12,
      itemHeight: 8
    },
    grid: {
      left: '1%',
      right: '5%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时'],
      axisLine: { lineStyle: { color: '#fff' } },
      axisLabel: { color: '#fff' },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 500,
      // interval: 50,
      axisLine: { lineStyle: { color: '#fff' } },
      axisLabel: { color: '#fff' },
      splitLine: { show: false } // 隐藏网格线
    },
    series: []
  };
  private http = inject(HttpService);
  getHttpData(value: string[]): Observable<any> {
    // if(value.length==0){
    //   this.isSpinning=false;
    //   return new Observable(o=>{
    //     o.next([]);
    //   });
    // }
    return new Observable(o => {
      this.isSpinning = true;

      this.http.api.carbonTrendTime(value).subscribe({
        next: res => {
          this.isSpinning = false;
          if (res.code == 0) {
            o.next(res.data || []);
          }
        },
        error: () => {
          this.isSpinning = false;
        },
        complete: () => {
          this.isSpinning = false;
        }
      });
    });
  }

  changeRadio(value: string[]): void {
    const keys: string[] = value.map(ch => {
      return this.radioData[ch]['key'];
    });
    // console.log('value',value);
    // console.log('keys',keys);

    this.getHttpData(keys).subscribe(data => {
      this.isSpinning = false;
      try {
        const obj: any = {};
        keys.forEach((key, index) => {
          const keylist = data.map((item: any) => {
            const e = item['trendData'][key];
            // console.log(e);
            return {
              ...e,
              time: moment(e['updateTime'] || e['createTime']).format('H时')
            };
          });
          obj[value[index]] = keylist.sort((a: any, b: any) => a['updateTime'] - b['updateTime']);
        });
        console.log('obj', obj);
        const newSeries = Object.keys(obj).map(name => {
          return {
            name: `${name}碳排放`,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              color: this.radioData[name].color,
              borderColor: '#fff',
              borderWidth: 1
            },
            lineStyle: { width: 1, color: this.radioData[name].color },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: this.radioData[name].colorStops[0].color },
                  { offset: 1, color: this.radioData[name].colorStops[1].color }
                ]
              }
            },
            data: obj[name].filter((e: any) => this.isTimeBeforeNow(e['updateTime'])).map((item: any) => item['trendValue']) //new Array(11).fill(0).map(() => Math.floor(Math.random() * 200) + 20)
          };
        });
        const legendData = value.map(name => `${name}碳排放`);

        console.log('newSeries', newSeries);
        // console.log('legendData', legendData);
        this.option['series'] = newSeries;
        this.option['legend'] = {
          data: legendData,
          top: 10,
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 8
        };
        console.log('ss', Object.values(obj));
        if (Object.values(obj).length > 0) {
          (this.option['xAxis'] as any)['data'] = ((Object.values(obj)[0] || []) as any[])
            .filter((e: any) => this.isTimeBeforeNow(e['updateTime']))
            .map((e: any) => e['time']);
        }
        this.option = { ...this.option };
        this.cdr.detectChanges();
      } catch (err) {
        console.error(err);
      }
    });
  }

  isTimeBeforeNow(timeStr: any): boolean {
    // 把目标时间转成今天的时间（只保留时分秒）
    const r = moment(timeStr).format('HH:mm:ss');
    const target = moment(r, 'HH:mm:ss');
    // 当前时间（只保留时分秒）
    const now = moment();

    // 只比较时间部分
    return target.isBefore(now, 'second');
  }

  // handleEvents(e: ChartEChartsEvent): void {
  //   console.log(e);
  // }
}
