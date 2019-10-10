import { Component, OnInit } from '@angular/core';
import {FaqService} from '../faq.service';
import { MEDICARE_DRG_CODES } from '../medicareConstants';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {

  constructor(private questionsService: FaqService) { }
  drgQandA: string[][];
  ourDataQandA: string[][];
  targetID: number;
  drgCodes: string[];

  ngOnInit() {
    this.drgQandA = this.getQuestionsAndAnswers('drg-codes.json');
    this.ourDataQandA = this.getQuestionsAndAnswers('our-data.json');
    this.targetID = 0;
    this.drgCodes = MEDICARE_DRG_CODES;
  }

  getQuestionsAndAnswers(url: string): string[][] {
    const data: string[][] = [];
    this.questionsService.getQuestions(url).subscribe(results => {
      console.log(results);
      for (const entry in results) {
        console.log(results[entry]);
        data.push(results[entry]);
      }
    });
    return data;
  }

  getNextTargetID(): string {
    this.targetID++;
    return '#target' + this.targetID;
  }

  getCurrentTargetID(): string {
    return 'target' + this.targetID;
  }

}
