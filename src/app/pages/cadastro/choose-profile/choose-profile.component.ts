import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './choose-profile.component.html',
  styleUrls: ['./choose-profile.component.scss'],
  providers: [

  ],
})
export class ChooseProfileComponent {
  selectedBox: number = 0;

  constructor(private router: Router) { }

  selectBox(boxNumber: number) {
    if (boxNumber === this.selectedBox) {
      this.selectedBox = 0;
    } else {
      this.selectedBox = boxNumber;
    }
  }

  continue() {
    if (this.selectedBox === 1) {
      this.router.navigate(['/register-influencer']);
    } else if (this.selectedBox === 2) {
      this.router.navigate(['/register-empresa']);
    }
  }
}




