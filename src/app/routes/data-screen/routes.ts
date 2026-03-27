/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-11 20:30:14
 * @LastEditors: tom-cfxu cfxu963852741@qq.com
 * @LastEditTime: 2026-03-11 20:34:06
 * @FilePath: \my-project\src\app\routes\data-screen\routes.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Routes } from '@angular/router';
import { DataScreenComponent } from './data-screen.component';


export const routes: Routes = [
  { path: '', redirectTo: 'data', pathMatch: 'full' },
  { path: 'data', component: DataScreenComponent },
];
