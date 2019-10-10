import {Observable} from "rxjs";

export class Hospital {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  imgUrl: string;
  lat: number;
  long: number;
  distance: number;
  geocodeLoaded: boolean;
  imgLoaded: boolean;
  providerID: number;
  rating: string;
  phone: number;
  mortalityComparison: string;
  safetyComparison: string;
  readmissionComparison: string;
  patientComparison: string;
  effectivenessComparison: string;
  timelinessComparison: string;
  imagingComparison: string;

  // Providers average charges
  coveredCharges: number;
  // Average total payments to provider medicare + additional
  totalPayments: number;
  // Average total payment by medicare
  averageMedicarePayment: number;

  constructor(providerid: number, name: string, address: string, city: string, state: string, zip: string, totalDischarges: number,
              coveredCharges: number, totalPayments: number, averageMedicarePayments: number) {
    this.providerID = providerid;
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.coveredCharges = coveredCharges;
    this.totalPayments = totalPayments;
    this.averageMedicarePayment = averageMedicarePayments;
    this.geocodeLoaded = false;
    this.imgUrl = 'assets/img/placeholder.jpg';
  }


  setRatingMetrics(overall: string, mortality: string, safety: string, readmission: string, patient: string,
                   effectiveness: string, timeliness: string, imaging: string, phone: number, lat: number, long: number) {
    this.rating = overall;
    this.mortalityComparison = mortality;
    this.safetyComparison = safety;
    this.readmissionComparison = readmission;
    this.patientComparison = patient;
    this.effectivenessComparison = effectiveness;
    this.timelinessComparison = timeliness;
    this.imagingComparison = imaging;
    this.phone = phone;
    this.setLat(lat);
    this.setLong(long);
    if (lat !== 181 && long !== 181) {
      this.setGeocoded();
    }
  }

  /**
   * Gets hospital street address and state
   */
  getFullAddress(): string {
    return this.address + ' ' + this.city + ' ' + this.state + ' ' + this.zip;
  }

  /**
   * Subtracts medicare payments from total amount paid
   */
  getApproxOutOfPocket(): number {
    return this.totalPayments - this.averageMedicarePayment;
  }

  /**
   * Gets the price the hopsital charges
   */
  gethospitalPrice(): number {
    return this.coveredCharges;
  }

  getLat(): number {
    return this.lat;
  }
  setLat(num: number): void {
    this.lat = num;
  }
  getLong(): number {
    return this.long;
  }
  setLong(num: number): void {
    this.long = num;
  }
  getName() {
    return this.name;
  }
  isGeocoded() {
    return this.geocodeLoaded ? true : false;
  }
  setGeocoded() {
    this.geocodeLoaded = true;
  }
  isImgLoaded() {
    return this.imgLoaded;
  }
  setImgLoaded() {
    this.imgLoaded = true;
  }
  setImageUrl(img: string) {
    this.imgUrl = img;
  }
  getCity() {
    return this.city;
  }
  getState() {
    return this.state;
  }
  getID() {
    return this.providerID;
  }
  getRating() {
    return this.rating;
  }
  getPhone() {
    return this.phone;
  }
  setRating(s: string) {
    this.rating = s;
  }
  setPhone(n: number) {
    this.phone = n;
  }
  getMortalityComparison() {
    return this.mortalityComparison;
  }

  seMortalityComp(s: string) {
    this.mortalityComparison = s;

  }

  getSafetyComp() {
    return this.safetyComparison;
  }

  setSafetyComp(s: string) {
    this.safetyComparison = s;
  }

  setreadmissionComp(s: string) {
    this.readmissionComparison = s;
  }

  getreadmissionComp() {
    return this.readmissionComparison;
  }

  getEffectivenessComp() {
    return this.effectivenessComparison;
  }

  setEffectivenessComp(s: string) {
    this.effectivenessComparison = s;
  }

  getTimelinessComp() {
    return this.timelinessComparison;
  }

  setTimelinessComp(s: string) {
    this.timelinessComparison = s;
  }

  getImagingComp() {
    return this.imagingComparison;
  }

  setImagingComp(s: string) {
    this.imagingComparison = s;
  }
  getPatientComp() {
    return this.patientComparison;
  }
  setPatientComp(s: string) {
    this.patientComparison = s;
  }
  getHeaderColor() {
    if (this.getRating() == '1') {
      // #ff0000
      return 'redHeader';
    }
    else if (this.getRating() == '2' || this.getRating() == '3') {
      // #ffcc00
      return 'yellowHeader';
    }
    else if (this.getRating() == '4' || this.getRating() == '5') {
      // #00b300
      return 'greenHeader';
    }
    else{
      return 'greyHeader';
    }
  }
  getTextColor() {
    if (this.getRating() == '1') {
      // #ff0000
      return 'redText';
    }
    else if (this.getRating() == '2' || this.getRating() == '3') {
      // #ffcc00
      return 'yellowText';
    }
    else if (this.getRating() == '4' || this.getRating() == '5') {
      // #00b300
      return 'greenText';
    }
    else {
      return 'greyText';
    }
  }
}
