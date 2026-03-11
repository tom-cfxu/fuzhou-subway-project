import { Component } from '@angular/core';
import { DataTitleComponent } from './widgets/title/title.component';
import { Box1Component } from './widgets/box1/box1.component';

@Component({
  selector: 'app-data-screen',
  imports: [ DataTitleComponent,Box1Component ],
  templateUrl: './data-screen.component.html',
  styleUrl: './data-screen.component.less'
})
export class DataScreenComponent {}
