/*
 * @Author: tom-cfxu cfxu963852741@qq.com
 * @Date: 2026-03-02 14:42:05
 * @LastEditors: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @LastEditTime: 2026-04-03 12:17:25
 * @FilePath: \my-project\src\app\layout\passport\passport.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpContext } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalFooterModule } from '@delon/abc/global-footer';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
// import { ThemeBtnComponent } from '@delon/theme/theme-btn';
import { NzIconModule } from 'ng-zorro-antd/icon';

// import { HeaderI18nComponent } from '../basic/widgets/i18n.component';

@Component({
  selector: 'layout-passport',
  template: `
    <div class="container">
      <!-- <header-i18n showLangText="false" class="langs" /> -->
      <div class="wrap">
        <div class="top">
          <div class="head">
            <img class="logo" src="./assets/logo-color.svg" />
            <span class="title">福州地铁低碳管控平台-节能挑战赛</span>
          </div>
        </div>
        <router-outlet />
        <!-- <global-footer [links]="links">
          Copyright
          <nz-icon nzType="copyright" /> 2026 <a href="//github.com/cipchk" target="_blank">卡色</a>出品
        </global-footer> -->
      </div>
    </div>
    <!-- <theme-btn /> -->
  `,
  styleUrls: ['./passport.component.less'],
  imports: [RouterOutlet, GlobalFooterModule, NzIconModule]
})
export class LayoutPassportComponent implements OnInit {

  constructor(){
    // this.loadHost()
  }

  private tokenService = inject(DA_SERVICE_TOKEN);
  private http = inject(_HttpClient);
  links = [
    {
      title: '帮助',
      href: ''
    },
    {
      title: '隐私',
      href: ''
    },
    {
      title: '条款',
      href: ''
    }
  ];

  ngOnInit(): void {
    this.tokenService.clear();
  }


}
