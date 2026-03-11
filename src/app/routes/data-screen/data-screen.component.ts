import { Component } from '@angular/core';
import { DataTitleComponent } from './widgets/title/title.component';

@Component({
  selector: 'app-data-screen',
  imports: [ DataTitleComponent ],
  templateUrl: './data-screen.component.html',
  styleUrl: './data-screen.component.less'
})
export class DataScreenComponent {}
