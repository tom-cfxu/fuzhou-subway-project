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
  selector: 'app-evaluation-error',
  imports: [],
  template: `
    <div class="container">
      <div class="error">
        <img class="img" src="../../../../../assets/tmp/home/logo7.png" />
        <div class="message">
          <p>太遗憾了，未能实现低碳节能<br />请继续努力吧</p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './evaluation-error.component.less'
})
export class EvaluationErrorComponent implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
  readonly modalRef = inject(NzModalRef);
}
