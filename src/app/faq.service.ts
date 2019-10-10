import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FaqService {
  constructor(private http: HttpClient) { }

  getQuestions(url: string): Observable<any> {
    const baseURL = 'assets/data/FAQs/' + url;
    return this.http.get(baseURL);
  }
}
