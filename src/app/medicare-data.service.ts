import { Injectable } from '@angular/core';
import {Hospital} from './Hospital';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicareDataService {

  public static selectedDRG = '';

  constructor(private http: HttpClient) {
  }

  getData(drgDefinition): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://data.cms.gov/resource/t8zw-d33c.json?$$app_token=wawW1EcHvX5JhsX60wSxIyVKj', {params: {drg_definition: drgDefinition}});
  }
  getGeneralData(ids: number[]): Observable<any> {
    return this.http.get('https://data.medicare.gov/resource/rbry-mqwu.json?$where=provider_id in(' + this.listToString(ids) + ')');
  }

   listToString(ls: number[]): string {
    let str = '';

    for (const item of ls) {
      str = str + ',\'' + String(item) + '\'';
    }

    return str.substring(1);
  }

  /**
   * <<<FOR TESTING>>>
   *
   * Replicates sql style commands like get * where
   */
  formatData(data: Observable<any>): Hospital[] {
    const hospitals: Hospital[] = [];
    for (let i = 0; i < data['length']; i++) { // this error is incorrect, it works, switch to a for of loop in future
      const tempHos = new Hospital(
        data[i].provider_id,
        data[i].provider_name,
        data[i].provider_street_address,
        data[i].provider_city,
        data[i].provider_state,
        data[i].provider_zip_code,
        data[i].total_discharges,
        data[i].average_covered_charges,
        data[i].average_total_payments,
        data[i].average_medicare_payments);
      hospitals.push(tempHos);
    }
    return hospitals;
  }

  findHospital(hospitals: Hospital[], provID: number): Hospital {
    for (const hospital of hospitals) {
      if (hospital.providerID === provID) { return hospital; }
    }

    return null;
  }

  addRatings(data: Observable<any>, hospitals: Hospital[]) {
    for (let i = 0; i < data['length']; i++) {
      let lat = 181;
      let long = 181;
      if (data[i].location != null) {
        lat = data[i].location.coordinates[1];
        long = data[i].location.coordinates[0];
      }
      this.findHospital(hospitals, data[i].provider_id).setRatingMetrics(
        data[i].hospital_overall_rating,
        data[i].mortality_national_comparison,
        data[i].safety_of_care_national_comparison,
        data[i].readmission_national_comparison,
        data[i].patient_experience_national_comparison,
        data[i].effectiveness_of_care_national_comparison,
        data[i].timeliness_of_care_national_comparison,
        data[i].efficient_use_of_medical_imaging_national_comparison,
        data[i].phone_number,
        lat,
        long);
    }
  }
  // if (jsonresult[0].location) {
  // hos.setLat(jsonresult[0].location.coordinates[1]);
  // hos.setLong(jsonresult[0].location.coordinates[0]);
  // hos.setGeocoded();
  // }
}
