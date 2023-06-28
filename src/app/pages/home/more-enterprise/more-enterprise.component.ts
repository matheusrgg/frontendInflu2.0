import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-enterprise',
  templateUrl: './more-enterprise.component.html',
  styleUrls: ['./more-enterprise.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class MoreEnterpriseComponent {

  constructor(private router: Router) {

  }

  goToHome() {
    this.router.navigate(["/"])
  }

}
