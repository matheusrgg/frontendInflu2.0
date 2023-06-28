import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-catchu',
  templateUrl: './more-catchu.component.html',
  styleUrls: ['./more-catchu.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class MoreCatchuComponent {

  constructor(private router: Router) {

  }

  goToHome() {
    this.router.navigate(["/"])
  }

}
