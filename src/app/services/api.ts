import { Observable } from 'rxjs';

// const noToken = '?_allow_anonymous=true';

export interface Respond {
  [key: string]: any;
  code: number;
  data: any;
  msg: string;
}
export interface Api {
  [key: string]: any;
  //http请求相关数据
  carbonTotal(): Observable<Respond>;
  carbonTrendTime(data: any): Observable<Respond>;
  carbonTrendPie(): Observable<Respond>;

  deviceAll(): Observable<Respond>;
  deviceSendLampMessage(data: any): Observable<Respond>;
  deviceSendAirConditionMessage(data: any): Observable<Respond>;
  deviceSendEmcMessage(data: any): Observable<Respond>;
  deviceSendFootfallMessage(data: any): Observable<Respond>;

  //三色灯控制接口
  deviceSendRGBLightMessage(data: any): Observable<Respond>;
  deviceSendBatchMessage(data: any): Observable<Respond>;

  //重置按钮
  deviceSendResetButtonMessage(): Observable<Respond>;
  //高客流模式
  deviceSendHightFlowMessage(): Observable<Respond>;
  //节能模式
  deviceSendPowerSavingMessage(): Observable<Respond>;
}
interface API {
  api: string;
  comment: string;
  url: string;
  type: 'get' | 'post' | 'post_param' | 'get_param' | 'path_body';
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  header: {} | { 'Content-Type': 'application/x-www-form-urlencoded' } | { 'Content-Type': 'application/json' };
  option?: any;
  [key: string]: any;
}
export const API: API[] = [
  //http请求相关数据
  {
    api: 'carbonTotal',
    comment: '碳排放总览',
    url: `/admin-api/subway/stations/carbon/total`,
    type: 'get',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' }
  },
  {
    api: 'carbonTrendTime',
    comment: '碳排放趋势时间图',
    url: `/admin-api/subway/carbon/emission/trend`,
    type: 'post',
    header: { 'Content-Type': 'application/json' }
  },
  {
    api: 'carbonTrendPie',
    comment: '碳排放趋势占比',
    url: `/admin-api/subway/carbon/emission/trend`,
    type: 'get',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' }
  },

  //mqtt相关数据和控制
  {
    api: 'deviceAll',
    comment: '获取沙盘所有设备信息',
    url: `/app-api/iot/subway/device/all`,
    type: 'get',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' }
  },

  {
    api: 'deviceSendLampMessage',
    comment: '灯控接口',
    url: `/app-api/iot/subway/device/send/lamp/message`,
    type: 'post',
    header: { 'Content-Type': 'application/json' }
  },
  {
    api: 'deviceSendAirConditionMessage',
    comment: '空调功率接口',
    url: `/app-api/iot/subway/device/send/airCondition/message`,
    type: 'post',
    header: { 'Content-Type': 'application/json' }
  },
  {
    api: 'deviceSendEmcMessage',
    comment: '能管控制接口',
    url: `/app-api/iot/subway/device/send/emc/message`,
    type: 'post',
    header: { 'Content-Type': 'application/json' }
  },
  {
    api: 'deviceSendFootfallMessage',
    comment: '客流量接口',
    url: `/app-api/iot/subway/device/send/footfall/message`,
    type: 'post',
    header: { 'Content-Type': 'application/json' }
  },
  {
    api: 'deviceSendBatchMessage',
    comment: '批量控制接口',
    url: `/app-api/iot/subway/device/send/batch/message`,
    type: 'post',
    header: { 'Content-Type': 'application/json' }
  },
  {
    api: 'deviceSendResetButtonMessage',
    comment: '重置按钮接口',
    url: `/app-api/iot/subway/device/send/reset/button/message`,
    type: 'post',
    header: { 'Content-Type': 'application/json' }
  },
  {
    api: 'deviceSendHightFlowMessage',
    comment: '高客流模式接口',
    url: `/app-api/iot/subway/device/send/hight/flow/message`,
    type: 'post',
    header: { 'Content-Type': 'application/json' }
  },
  {
    api: 'deviceSendPowerSavingMessage',
    comment: '节能模式接口',
    url: `/app-api/iot/subway/device/send/power/saving/message`,
    type: 'post',
    header: { 'Content-Type': 'application/json' }
  },
  {
    api: 'deviceSendRGBLightMessage',
    comment: '三色灯控制接口',
    url: `/app-api/iot/subway/device/send/rgbLight/message`,
    type: 'post',
    header: { 'Content-Type': 'application/json' }
  }
];
