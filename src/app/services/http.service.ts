/*
 * @Author: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @Date: 2026-03-27 16:50:42
 * @LastEditors: weixin_42919480 weixin_42919480@noreply.gitcode.com
 * @LastEditTime: 2026-04-03 11:18:27
 * @FilePath: \fuzhou-subway-project2\src\app\services\http.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
const noToken = '?_allow_anonymous=true';
import { Api,API } from './api';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor() {
    this.initApi();
  }
  public api!: Api;
  private initApi(): void {
    const api:any = {};
    API.forEach((item: any) => {
      api[item.api] = (data: any, path?: any) => {
        return this.getMethod[item.type](item, data, path,);
      };
    });
    this.api = api;
  }
  private http = inject(_HttpClient);

  private host =localStorage.getItem('host');

  private getMethod:any = {
    'get': (item: { url: string; header: any; option: any; }, data: { headers?: HttpHeaders | Record<string, string | string[]>; context?: HttpContext; observe?: "body"; params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>; reportProgress?: boolean; responseType: "arraybuffer"; withCredentials?: boolean; credentials?: RequestCredentials; keepalive?: boolean; priority?: RequestPriority; cache?: RequestCache; mode?: RequestMode; redirect?: RequestRedirect; referrer?: string; integrity?: string; referrerPolicy?: ReferrerPolicy; transferCache?: { includeHeaders?: string[]; } | boolean; timeout?: number; }) => {
      return this.http.get(this.host+item.url, data, { headers: item.header, ...item.option });
    },
    'post': (item: { url: string; header: any; option: any; }, data: any) => {
      return this.http.post(this.host+item.url, data, null, { headers: item.header, ...item.option })
    },
    'post_param': (item: { url: any; header: any; option: any; }, path: any, option?: any) => {
      return this.http.post(`${this.host+item.url}/${path + noToken}`, null, null, { headers: item.header, ...option, ...item.option });
    },
    'get_param': (item: { url: any; header: any; option: any; }, path: any) => {
      return this.http.get(`${this.host+item.url}/${path + noToken}`, null, { headers: item.header, ...item.option });
    },
    'path_body': (item: { url: any; header: any; option: any; }, data: any, path: any) => {
      return this.http.post(`${this.host+item.url}/${path + noToken}`, data, null, { headers: item.header, ...item.option });
    },
  };

}
