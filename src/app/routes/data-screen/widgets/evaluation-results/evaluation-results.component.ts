/* eslint-disable prettier/prettier */
/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-13 01:07:11
 * @LastEditors: tom-cfxu cfxu963852741@qq.com
 * @LastEditTime: 2026-03-13 02:07:34
 * @FilePath: \fuzhou-subway-project\src\app\routes\data-screen\widgets\evaluation-results\evaluation-results.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, inject, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-evaluation-results',
  imports: [],
  template: `
    <div class="container">
      <div class="medal">
        <img class="img" [src]="medalImg" />
        <div class="result">
          恭喜您获得福州地铁<span class="name">“{{ medalName }}”</span>称号
        </div>
      </div>
    </div>
  `,
  styleUrl: './evaluation-results.component.less'
})
export class EvaluationResultsComponent implements OnInit {
  ngOnInit(): void {
    const modalConfig = this.modalRef.getConfig();
    if (modalConfig.nzData) {
      this.result = modalConfig.nzData.result; // 读取功率值
    }
  }
  readonly modalRef = inject(NzModalRef);

  medalObject: any = {
    1: {
      result: '节能大师',
      img: '../../../../../assets/tmp/home/gold.png'
    },
    2: {
      result: '节能高手',
      img: '../../../../../assets/tmp/home/silver.png'
    },
    3: {
      result: '节能达人',
      img: '../../../../../assets/tmp/home/bronze.png'
    }
  };

  result: 1 | 2 | 3 = 1;

  get medalImg(): string {
    return this.medalObject[this.result]['img'] || '';
  }
  get medalName() {
    return this.medalObject[this.result]['result'] || '';
  }
}
