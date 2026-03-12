import { Component, Input } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-device-item',
  imports: [NzGridModule,CommonModule],
  template: `
    <div class="box5" nz-row>
    @for (item of data; track item.title) {
        <div nz-col nzSpan="12" class="item">
          <div class="title" [ngClass]="{'close':isClose(item.status)}">{{item.title}}</div>
          <div class="content" >
            <div class="state" [ngClass]="{'close':isClose(item.status)}">{{item.stateOject[item.status]}}</div>
            <div class="value">
              <div class="subtitle">
                  {{item.subtitle}}
              </div>
              <div class="value1">
                  {{item.value}}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './device-item.component.less'
})
export class DeviceItemComponent {
  @Input() data:any[]=[];

  isClose(b:any){
    return !Boolean(b);
  }
}
