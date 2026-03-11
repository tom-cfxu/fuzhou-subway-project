import { Component } from '@angular/core';
import { HeaderUserComponent } from '../user.component';
import { HeaderTimeComponent } from '../time.component';

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrls:['./header.component.less'],
  imports: [HeaderUserComponent,HeaderTimeComponent],
})
export class HeaderComponent {}
