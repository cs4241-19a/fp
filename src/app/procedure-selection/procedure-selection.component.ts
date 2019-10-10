import { Component, OnInit } from '@angular/core';
import { MEDICARE_DRG_CODES } from '../medicareConstants';
import { MedicareDataService } from '../medicare-data.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'q';
import { MatBottomSheet } from '@angular/material';
// tslint:disable-next-line:max-line-length
import { BottomSheetComponentAsSnackBarComponent } from '../bottom-sheet-component-as-snack-bar/bottom-sheet-component-as-snack-bar.component';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-procedure-selection',
  templateUrl: './procedure-selection.component.html',
  styleUrls: ['./procedure-selection.component.css']
})
export class ProcedureSelectionComponent implements OnInit {

  knowsCode: boolean;
  foundProc: boolean;
  incorrectDRG: boolean;

  showFirstDiv: boolean;
  showSecondDiv: boolean;
  nope: string;

  drgCodes: string[];
  filteredCodes: string[];
  selectedDRG = '';
  control = new FormControl();

  constructor(private router: Router,
    private bottomSheet: MatBottomSheet,
    public auth: AuthService) { }

  ngOnInit() {
    this.nope = 'This DRG code does not exist!';
    this.drgCodes = MEDICARE_DRG_CODES;
    this.filteredCodes = this.drgCodes;
    this.knowsCode = null;
    this.foundProc = null;
    this.incorrectDRG = false;
    this.showFirstDiv = true;
    this.showSecondDiv = false;
  }

  /**
   * This function is garbage
   */
  setCode(s: string) {
    this.selectedDRG = s;
    const isLoggedIn = this.auth.loggedIn;
    for (const drg of this.drgCodes) {
      if (this.selectedDRG.substr(0, 3) === drg.substr(0, 3)) {
        MedicareDataService.selectedDRG = drg;
        this.router.navigate(['/', 'priceCompare']);
        return;
      } else {
        this.incorrectDRG = true;
      }
    }
  }

  filter() {
    this.filteredCodes = [];
    for (const code of this.drgCodes) {
      if (code.toLowerCase().includes(this.selectedDRG.toLowerCase())) {
        this.filteredCodes.push(code);
      }
    }
  }

  async switchDiv() {
    this.knowsCode = false;
    this.showFirstDiv = false;
    await delay(250);
    this.showSecondDiv = true;
  }

  goToDRG() {
    this.router.navigate(['/drgtable']);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  openSignInValidation(): void {
    const sheetRef = this.bottomSheet.open(BottomSheetComponentAsSnackBarComponent);
  }

}
