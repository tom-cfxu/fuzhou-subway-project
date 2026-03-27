import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartEChartsEvent, ChartEChartsModule, ChartEChartsOption } from '@delon/chart/chart-echarts';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-box2-echart',
  imports: [FormsModule, NzCheckboxModule, NzGridModule, ChartEChartsModule],
  template: `
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

      <div [style.width.%]="55">
        <chart-echarts class="echart" height="100%" [option]="option" theme="dark" (events)="handleEvents($event)" />
      </div>
    </div>
  `,
  styleUrl: './box2-echart.component.less'
})
export class Box2EchartComponent implements OnInit {
  ngOnInit(): void {
    this.changeRadio(this.value);
  }
  value: any[] = ['车站空调系统', '照明系统'];
  private readonly cdr = inject(ChangeDetectorRef);
  radioData: any = {
    车站空调系统: {
      data: [],
      color: 'rgb(74, 158, 255)',
      colorStops: [
        { offset: 0, color: 'rgba(74, 158, 255, 0.3)' },
        { offset: 1, color: 'rgba(74, 158, 255, 0)' }
      ]
    },
    站台门系统: {
      data: [],
      color: 'rgb(99, 192, 211)',
      colorStops: [
        { offset: 0, color: 'rgba(99, 192, 211, 0.3)' },
        { offset: 1, color: 'rgba(99, 192, 211, 0)' }
      ]
    },
    环控系统: {
      data: [],
      color: 'rgb(88, 179, 104)',
      colorStops: [
        { offset: 0, color: 'rgba(88, 179, 104, 0.3)' },
        { offset: 1, color: 'rgba(88, 179, 104, 0)' }
      ]
    },
    照明系统: {
      data: [],
      color: 'rgb(242, 188, 56)',
      colorStops: [
        { offset: 0, color: 'rgba(242, 188, 56, 0.3)' },
        { offset: 1, color: 'rgba(242, 188, 56, 0)' }
      ]
    },
    变电系统: {
      data: [],
      color: 'rgb(242, 124, 56)',
      colorStops: [
        { offset: 0, color: 'rgba(242, 124, 56, 0.3)' },
        { offset: 1, color: 'rgba(242, 124, 56, 0)' }
      ]
    },
    电梯系统: {
      data: [],
      color: 'rgb(230, 76, 64)',
      colorStops: [
        { offset: 0, color: 'rgba(230, 76, 64, 0.3)' },
        { offset: 1, color: 'rgba(230, 76, 64, 0)' }
      ]
    },
    AFC系统: {
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
      textStyle: { color: '#000' }
    },
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
      max: 250,
      interval: 50,
      axisLine: { lineStyle: { color: '#fff' } },
      axisLabel: { color: '#fff' },
      splitLine: { show: false } // 隐藏网格线
    },
    series: []
  };

  changeRadio(value: string[]): void {
    // console.log(value);
    const newSeries = value.map(name => {
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
        data: new Array(11).fill(0).map(() => Math.floor(Math.random() * 200) + 20)
      };
    });
    const legendData = value.map(name => `${name}碳排放`);

    console.log(newSeries, legendData);
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
    this.option = { ...this.option };
    this.cdr.detectChanges();
  }

  handleEvents(e: ChartEChartsEvent): void {
    console.log(e);
  }
}
