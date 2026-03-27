/* eslint-disable prettier/prettier */
 
import { Observable } from 'rxjs';

interface API {
  systemTotal: () => Observable<any>;
  trand: (body: any) => Observable<any>;
}
