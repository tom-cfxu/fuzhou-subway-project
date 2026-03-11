import { Component } from '@angular/core';
import { DataTitleComponent } from './widgets/title/title.component';
import { Box1Component } from './widgets/box1/box1.component';
import { Box2EchartComponent } from './widgets/box2-echart/box2-echart.component';
import { Box3EchartComponent } from './widgets/box3-echart/box3-echart.component';

@Component({
  selector: 'app-data-screen',
  imports: [ DataTitleComponent,Box1Component,Box2EchartComponent,Box3EchartComponent],
  templateUrl: './data-screen.component.html',
  styleUrl: './data-screen.component.less'
})
export class DataScreenComponent {}
