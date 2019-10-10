import { Component, OnInit } from '@angular/core';
import { Hospital } from '../Hospital';
import { Location } from '../Location';
import { MedicareDataService } from '../medicare-data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { STATES } from '../States';

@Component({
  selector: 'app-price-compare',
  templateUrl: './price-compare.component.html',
  styleUrls: ['./price-compare.component.css']
})
export class PriceCompareComponent implements OnInit {

  // Array with all the hospitals with the DRG
  relevantHospitals: Hospital[] = [];
  // Array with all active hospitals according to the selection
  activeSubset: Hospital[] = [];
  relevantLocations: Location[] = [];
  distancelist: string[] = [];
  hospitalImgURLs: string[][];
  activeHospital: Hospital;
  loading: boolean;
  userLat: number;
  userLong: number;
  statecodes: string[] = [];
  states: any[] = [];
  filteredstates: any[] = [];
  currentrating: number;
  p: number;
  procedureName: string;
  drgCode: string;
  maxPrice: number;
  minPrice: number;
  allowUserLocation: boolean;
  mapButtonStatus: string;
  drgDisplayedCode: string;
  input = '';
  displayUserData = false;
  userData: any[] = [];

  constructor(private dataRequest: MedicareDataService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.p = 1;
    this.loading = true;
    this.currentrating = 1;
    this.formatStates();
    this.distancelist = this.statecodes;
    this.filteredstates = this.states;
    this.minPrice = 2000000000;
    this.maxPrice = 0;
    this.userLong = -71.8078491;
    this.userLat = 42.275093;
    // TODO: get DRG code
    this.drgCode = MedicareDataService.selectedDRG;
    if (this.drgCode == null || this.drgCode === '') {
      this.router.navigate(['/', 'procedureSelection']);
    }
    this.getUserLocation();
    this.drgDisplayedCode = this.drgCode.substring(0, 3);
    if (this.drgCode != null) {
      this.dataRequest.getData(this.drgCode).subscribe(
        (data) => {
          this.relevantHospitals = this.dataRequest.formatData(data);
          // this.loadImages();
          this.activeSubset = this.relevantHospitals;
          this.calculatePriceExtremes();
          const providerIDList: number[] = [];
          for (const hospital of this.relevantHospitals) {
            providerIDList.push(hospital.providerID);
          }
          this.dataRequest.getGeneralData(providerIDList).subscribe(
            (data2) => {
              this.dataRequest.addRatings(data2, this.relevantHospitals);
              this.loading = false;
            });
        });
    }
    this.getUserData2();
  }

  calculatePriceExtremes() {
    for (const h of this.relevantHospitals) {
      //const cost = h.getApproxOutOfPocket();
      const cost = Number(h.totalPayments);
      if (cost < this.minPrice) { this.minPrice = cost; }
      if (cost > this.maxPrice) { this.maxPrice = cost; }
    }
  }

  getLocation(hos: Hospital): void {
    // tslint:disable-next-line:max-line-length
    if (hos.isGeocoded() !== true) {
      const baseurl = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAwzRGaPm9KP5ZjKvNs5qhFs3p0wePaI4c&address=';
      const loc = hos.getFullAddress();
      const url = baseurl + loc;
      this.http.get(url).subscribe((res) => {
        // @ts-ignore
        hos.setLat(res.results[0].geometry.location.lat);
        // @ts-ignore
        hos.setLong(res.results[0].geometry.location.lng);
      });
      hos.setGeocoded();
    }
  }

  selected(hospital: Hospital): void {
    if (hospital.getRating() == undefined) {
      hospital.setRating('Not Available');
    }
    if (hospital.getPhone() == undefined) {
      hospital.setPhone(1234567890);
    }
    if (hospital.getMortalityComparison() == undefined) {
      hospital.seMortalityComp('Not Available');
    }
    if (hospital.getSafetyComp() == undefined) {
      hospital.setSafetyComp('Not Available');
    }
    if (hospital.getreadmissionComp() == undefined) {
      hospital.setreadmissionComp('Not Available');
    }
    if (hospital.getEffectivenessComp() == undefined) {
      hospital.setEffectivenessComp('Not Available');
    }
    if (hospital.getTimelinessComp() == undefined) {
      hospital.setTimelinessComp('Not Available');
    }
    if (hospital.getImagingComp() == undefined) {
      hospital.setImagingComp('Not Available');
    }
    if (hospital.getPatientComp() == undefined) {
      hospital.setPatientComp('Not Available');
    }
    //this.getLocation(hospital);
    this.activeHospital = hospital;
  }

  getHospitalsInRows(col: number): Hospital[][] {
    const listOfHospitals = this.activeSubset;
    const formattedList = new Array<Array<Hospital>>();
    for (let i = 0; i < listOfHospitals.length; i += col) {
      formattedList.push(listOfHospitals.slice(i, i + col));
    }
    return formattedList;
  }

  // TODO: implement
  /**
   * Updates activeSubset to reflect the hospitals that fit in the updated range
   * @param value - The value of the slide 0 < value < 10
   */
  distance() {
    let count = 0;
    this.distancelist = [];
    for (const hos of this.relevantHospitals) {
      for (const state of this.states) {
        if (state.checked === true) {
          count++;
          if (hos.getState() === state.code) {
            this.distancelist.push(state.code);
          }
        }
      }
    }
    if (count === 0) {
      this.distancelist = this.statecodes;
    }
  }

  // TODO: implement
  /**
   * Updates activeSubset to reflect the hospitals that fit in the updated range
   * @param value - The value of the slide 0 < value < 10
   */
  ratingChanged(value: number) {
    this.currentrating = value;
  }

  /**
   * Updates activeSubset to reflect the hospitals that fit in the updated range
   * @param value - The value of the slide 0 < value < 10
   */
  /*priceChanged(value: string) {
    this.currentprice = parseInt(value, 10);
    this.filterAll();
  }*/
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        this.userLong = long;
        this.userLat = lat;
      });
      this.allowUserLocation = true;
    } else {
      this.allowUserLocation = false;
    }
  }
  loadImages() {
    // api key: AIzaSyAjTxBehThv0yV7fu92frwHZ8iirhawO8s
    // custom search engine key: 017661927765718392632:g5y2ligvqqm
    // tslint:disable-next-line:max-line-length
    const baseurl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAjTxBehThv0yV7fu92frwHZ8iirhawO8s&cx=017661927765718392632:g5y2ligvqqm&searchType=image&q=';
    for (const hos of this.relevantHospitals) {
      if (hos.isImgLoaded() !== true) {
        const query = hos.getName() + ' ' + hos.getCity() + ' ' + hos.getState();
        const url = baseurl + query;
        this.http.get(url).subscribe((res) => {
          // @ts-ignore
          hos.setImageUrl(res.items[0].link);
          // console.log(res);
        });
        hos.setImgLoaded();
      }
    }
  }
  formatStates() {
    for (const state of STATES) {
      const formattedState = { name: state.substr(3, state.length), code: state.substr(0, 2), checked: false };
      this.states.push(formattedState);
      this.statecodes.push(state.substr(0, 2));
    }
  }
  filterByState(s: string) {
    this.filteredstates = [];
    for (const state of this.states) {
      const name = state.name.toLowerCase();
      if (name.includes(s.toLowerCase())) {
        this.filteredstates.push(state);
      }
    }
  }
  filterAll() {
    this.distance();
    this.activeSubset = [];
    for (const hos of this.relevantHospitals) {
        if (this.distancelist.includes(hos.getState())) {
          if (Number(hos.getRating()) >= this.currentrating || hos.getRating() === 'Not Available' || hos.getRating() === undefined) {
            this.activeSubset.push(hos);
          }
        }
    }
  }

  dataViewToggled(event) {
    this.displayUserData = event.checked;
  }
  
  sortBy(event: any) {
    const eventclass = event.currentTarget.classList[1];
    if (eventclass === 'ascending') {
      (<HTMLInputElement>document.querySelector('.ascending')).setAttribute('disabled', "");
      (<HTMLInputElement>document.querySelector('.descending')).removeAttribute('disabled');
      this.activeSubset.sort(function(a, b) {
        return a.totalPayments - b.totalPayments;
      });
    } else {
      (<HTMLInputElement>document.querySelector('.descending')).setAttribute('disabled', "");
      (<HTMLInputElement>document.querySelector('.ascending')).removeAttribute('disabled');
      this.activeSubset.sort(function(a, b) {
        return b.totalPayments - a.totalPayments;
      });
    }
  }

  getUserData2() {
    const req = {
      "type": "get",
      "id": this.drgCode.substr(0, 3)
    };
    const endpointURL = "https://qra9m7iyyd.execute-api.us-east-1.amazonaws.com/sendEmail/getuserdata";
    this.http.post(endpointURL, req).subscribe(data => {
      this.userData = JSON.parse((<any>data).body).results;
    },
    error => {
      console.log("Error: ", error);
    });
  }

  getUserData() {
    return this.userData;
  }
} 
