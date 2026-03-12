import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-box-control',
  imports: [NzButtonModule],
  styleUrls: ['./box-control.component.less'],
  template: `
    <div class="container">
        <div class="control">当前用能管控模式:<h1>手动</h1> </div>
        <div class="control">当前用能管控模式:<h1>低客流 <a class="b1" nz-button nzType="link">切换</a></h1>  </div>
        <div class="my-button">
        <img src="../../../../../assets/tmp/home/logo5.png">
        切换节能模式</div>
        <div class="my-button">
        <img src="../../../../../assets/tmp/home/logo5.png">
        车站碳排放评估</div>
      </div>
      <div class="button2">
        <button nz-button nzType="primary">重置</button>
      </div>
  `,
})
export class BoxCeterControlComponent {}
