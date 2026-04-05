/* eslint-disable import/order */
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { ChartEChartsModule, ChartEChartsOption } from '@delon/chart/chart-echarts';
import { FormsModule } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-box3-echart',
  imports: [FormsModule, ChartEChartsModule, NzSpinModule],
  template: `
    <nz-spin [nzSpinning]="isSpinning">
      <div class="main" style="width: 450px;">
        <chart-echarts class="echart" width="100%" [option]="option" theme="dark" />
        <!--  (events)="handleEvents($event)"  -->
      </div>
    </nz-spin>
  `,
  styleUrl: './box3-echart.component.less'
})
export class Box3EchartComponent implements AfterViewInit, OnDestroy {
  timer: any;

  private dataRefreshMinutes = Number(localStorage.getItem('dataRefreshMinutes') || '20');
  ngAfterViewInit(): void {
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
  isSpinning = true;

  option: ChartEChartsOption = {
    textStyle: {
      fontFamily: 'PingFangSC-Regular'
    },
    backgroundColor: 'transparent',
    title: {
      show: false
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}kW·h ({d}%)',
      position: ['40%', '20%'],
      confine: true,
      backgroundColor: 'rgba(5, 18, 45, 0.7)',
      // borderColor: 'rgba(38, 111, 255)',
      textStyle: {
        color: '#ffffff', // 文字白色
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular'
      }
    },
    grid: {
      top: 0,
      left: '0',
      right: '0%',
      bottom: 0
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      align: 'right',
      top: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 14
      },
      data: ['车站空调系统', '站台门系统', '环控系统', '照明系统', '变电系统', '电梯系统']
    },
    series: [
      {
        name: '碳排放',
        type: 'pie',
        radius: ['25%', '35%'], // 环形设置
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderWidth: 2
        },
        label: {
          show: true,
          color: '#fff',
          fontSize: 12,
          formatter: '{b}\n{c}kW·h'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 10
        },
        data: [
          { value: 153, name: '车站空调系统', itemStyle: { color: '#4a88f4' } },
          { value: 124, name: '站台门系统', itemStyle: { color: '#64c2d6' } },
          { value: 112, name: '环控系统', itemStyle: { color: '#58b368' } },
          { value: 64, name: '照明系统', itemStyle: { color: '#f2bc38' } },
          { value: 198, name: '变电系统', itemStyle: { color: '#f27c38' } },
          { value: 163, name: '电梯系统', itemStyle: { color: '#e64c40' } }
        ]
      }
    ]
  };
  objecctKeys: any = {
    车站空调系统: 'ac',
    站台门系统: 'door',
    环控系统: 'env',
    照明系统: 'light',
    变电系统: 'sub',
    电梯系统: 'ele'
  };

  private http = inject(HttpService);
  private readonly cdr = inject(ChangeDetectorRef);

  loadData() {
    this.getHttpData().subscribe((data: any) => {
      // console.log('data', data);
      const series = (this.option as any).series;
      const data2 = (series[0]['data'] as any[]).map((item: any) => {
        return {
          ...item,
          value: data['trendData'][this.objecctKeys[item['name']]]
        };
      });
      // console.log('data2', data2);
      this.option = { ...this.option, series: [{ ...series[0], data: data2 }] };
      this.cdr.detectChanges();
    });
  }
  getHttpData(): Observable<unknown> {
    return new Observable(o => {
      this.isSpinning = true;

      this.http.api.carbonTrendPie().subscribe({
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
  // handleEvents(e: ChartEChartsEvent): void {
  //   // console.log(e);
  // }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
