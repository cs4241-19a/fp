import { Component, OnInit } from '@angular/core';
import { MEDICARE_DRG_CODES } from '../medicareConstants';
import {MedicareDataService} from '../medicare-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drgtable',
  templateUrl: './drgtable.component.html',
  styleUrls: ['./drgtable.component.css']
})
export class DrgtableComponent implements OnInit {
  fulldrgCodes: string[];
  p: number;
  codes: string[];
  input = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.p = 1;
    this.fulldrgCodes = MEDICARE_DRG_CODES;
    this.codes = this.fulldrgCodes;
  }
  update(s: string) {
    this.codes = [];
    for (const code of this.fulldrgCodes) {
      if (code.includes(s.toUpperCase())) {
        this.codes.push(code);
      }
    }
  }
  compare(s: string) {
    MedicareDataService.selectedDRG = s;
    this.router.navigate(['/', 'priceCompare']);
  }
}

