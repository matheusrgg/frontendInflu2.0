import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-inlfuencer',
  templateUrl: './more-inlfuencer.component.html',
  styleUrls: ['./more-inlfuencer.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class MoreInlfuencerComponent {

  constructor(private router: Router) {

  }

  goToHome() {
    this.router.navigate(["/"])
  }
}
