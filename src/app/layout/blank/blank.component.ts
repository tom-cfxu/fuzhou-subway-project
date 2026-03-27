/* eslint-disable prettier/prettier */
/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-02 14:42:05
 * @LastEditors: tom-cfxu cfxu963852741@qq.com
 * @LastEditTime: 2026-03-11 20:19:57
 * @FilePath: \my-project\src\app\layout\blank\blank.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './widgets/header/header.component';

@Component({
  selector: 'layout-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.less'],
  imports: [HeaderComponent, RouterOutlet]
})
export class LayoutBlankComponent {}
