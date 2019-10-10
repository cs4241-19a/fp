import { Component, OnDestroy, Input, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-d3-pie',
  template: `
    <ngx-charts-pie-chart
      [scheme]="colorScheme"
      [results]="results"
      [legend]="showLegend"
      [labels]="showLabels">
    </ngx-charts-pie-chart>
  `,
})
export class D3PieComponent implements OnInit, OnDestroy {
  @Input() users;

  results = [];
  showLegend = true;
  showLabels = true;
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngOnInit(): void {
    console.log(this.users)
    for (let u of this.users){
      this.results.push({'name': u.username, 'value': u.logs[0]? u.stats.starting_weight - u.logs[0].weight: 0 })
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
