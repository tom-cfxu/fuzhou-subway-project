import { Component } from '@angular/core';
import { ChartEChartsEvent, ChartEChartsModule, ChartEChartsOption } from '@delon/chart/chart-echarts';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-box3-echart',
  imports: [FormsModule,ChartEChartsModule],
  template: `
      <div class="main" style="width: 450px;">
        <chart-echarts class="echart" width="100%" [option]="option" theme="dark" (events)="handleEvents($event)" />
      </div>
  `,
  styleUrl: './box3-echart.component.less'
})
export class Box3EchartComponent {
  option:ChartEChartsOption={
      textStyle:{
        fontFamily:"PingFangSC-Regular"
      },
      backgroundColor: 'transparent',
      title: {
        show:false,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}kW·h ({d}%)'
      },
      grid:{
        top:0,
        left:'0',
        right:0,
        bottom:0,
      },
      legend: {
        orient: 'vertical',
        right: 0,
        align:'right',
        top: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        data: [
          '车站空调系统',
          '站台门系统',
          '环控系统',
          '照明系统',
          '变电系统',
          '电梯系统'
        ]
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

  handleEvents(e:ChartEChartsEvent):void{
    console.log(e);
  }
}
