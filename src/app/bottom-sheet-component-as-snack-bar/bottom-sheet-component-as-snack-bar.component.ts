import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bottom-sheet-component-as-snack-bar',
  templateUrl: './bottom-sheet-component-as-snack-bar.component.html',
  styleUrls: ['./bottom-sheet-component-as-snack-bar.component.scss']
})
export class BottomSheetComponentAsSnackBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToLogin(): void {
    this.router.navigate(['auth/signin']);
  }

}
