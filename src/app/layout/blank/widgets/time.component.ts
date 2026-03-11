/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-11 19:00:37
 * @LastEditors: tom-cfxu cfxu963852741@qq.com
 * @LastEditTime: 2026-03-11 19:19:55
 * @FilePath: \my-project\src\app\layout\blank\widgets\time.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';
@Component({
  selector: 'header-time',
  template: `
    <span>
      {{time}}
    </span>
  `,
  imports: []
})
export class HeaderTimeComponent implements OnDestroy,AfterViewInit{

  private readonly cdr = inject(ChangeDetectorRef);
  timer:any;

  public time:string=moment().format('YYYY-MM-DD HH:mm:ss');

  ngAfterViewInit(): void {
    this.timer=setInterval(()=>{
      this.time=moment().format('YYYY-MM-DD HH:mm:ss');
      this.cdr.detectChanges();
    },1000)
  }
  ngOnDestroy(): void {
    if(this.timer){
      clearInterval(this.timer);
    }
  }



}
