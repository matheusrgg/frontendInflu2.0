import { Component } from '@angular/core';
import { LoadingService } from './shared/components/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[
    LoadingService
  ]
})
export class AppComponent {
  title = 'catchu';

}
