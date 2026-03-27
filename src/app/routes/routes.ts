/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-02 14:42:06
 * @LastEditors: tom-cfxu cfxu963852741@qq.com
 * @LastEditTime: 2026-03-11 21:14:16
 * @FilePath: \my-project\src\app\routes\routes.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Routes } from '@angular/router';
import { startPageGuard } from '@core';
import { authSimpleCanActivate, authSimpleCanActivateChild } from '@delon/auth';

import { LayoutBlankComponent } from '../layout';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // Blank Layout 空白布局
  {
    path: 'home',
    component: LayoutBlankComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./data-screen/routes').then(m => m.routes),
      }
    ]
  },
  // passport
  { path: '', loadChildren: () => import('./passport/routes').then(m => m.routes) },
  { path: 'exception', loadChildren: () => import('./exception/routes').then(m => m.routes) },
  { path: '**', redirectTo: 'exception/404' }
];
