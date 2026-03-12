import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ChartEChartsEvent, ChartEChartsModule, ChartEChartsOption } from '@delon/chart/chart-echarts';

@Component({
  selector: 'app-box2-echart',
  imports: [FormsModule, NzCheckboxModule, NzGridModule,ChartEChartsModule],
  template: `
    <div class="main">
      <nz-checkbox-group [(ngModel)]="value" [style.width.%]="22" (ngModelChange)="change($event)">
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
export class Box2EchartComponent {
  value:any[]=['车站空调系统','照明系统'];

  option:ChartEChartsOption={
    textStyle:{
      fontFamily:"PingFangSC-Regular",
      fontSize:12,
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
          color: '#fff',
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
        axisLabel: { color: '#fff', },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 250,
        interval: 50,
        axisLine: { lineStyle: { color: '#fff' } },
        axisLabel: { color: '#fff',},
        splitLine: { show: false } // 隐藏网格线
      },
      series: [
        {
          name: '照明系统碳排放',
          type: 'line',
          smooth: true, // 平滑曲线
          symbol: 'circle',
          symbolSize: 5,
          itemStyle: {
            color: '#4a9eff',
            borderColor: '#fff',
            borderWidth: 1
          },
          lineStyle: { width: 1, color: '#4a9eff' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(74, 158, 255, 0.3)' },
                { offset: 1, color: 'rgba(74, 158, 255, 0)' }
              ]
            }
          },
          data: [100, 140, 230, 100, 130, 125, 152, 170, 198, 142, 195]
        },
        {
          name: '车站空调碳排放',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          itemStyle: {
            color: '#52c41a',
            borderColor: '#fff',
            borderWidth: 1
          },
          lineStyle: { width: 1, color: '#52c41a' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(82, 196, 26, 0.3)' },
                { offset: 1, color: 'rgba(82, 196, 26, 0)' }
              ]
            }
          },
          data: [150, 100, 200, 140, 100, 195, 195, 133, 133, 153, 212]
        }
      ]
  }

  change(value: string[]): void{
    console.log(value);
  }


  handleEvents(e:ChartEChartsEvent):void{
    console.log(e);
  }
}
