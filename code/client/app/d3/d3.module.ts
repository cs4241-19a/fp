import {NgModule} from '@angular/core';
// import {NgxEchartsModule} from 'ngx-echarts';
import {NgxChartsModule} from '@swimlane/ngx-charts';
// import { ChartModule } from 'angular2-chartjs';
import {NbCardModule} from '@nebular/theme';
import {ThemeModule} from '../@theme/theme.module';
// import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
// import { ChartjsBarComponent } from './chartjs/chartjs-bar.component';
// import { ChartjsLineComponent } from './chartjs/chartjs-line.component';
// import { ChartjsPieComponent } from './chartjs/chartjs-pie.component';
// import { ChartjsMultipleXaxisComponent } from './chartjs/chartjs-multiple-xaxis.component';
// import { ChartjsBarHorizontalComponent } from './chartjs/chartjs-bar-horizontal.component';
// import { ChartjsRadarComponent } from './chartjs/chartjs-radar.component';
import {D3BarComponent} from './d3-bar.component';
import {D3LineComponent} from './d3-line.component';
import {D3PieComponent} from './d3-pie.component';
import {D3AreaStackComponent} from './d3-area-stack.component';
import {D3PolarComponent} from './d3-polar.component';
import {D3AdvancedPieComponent} from './d3-advanced-pie.component';
import {D3Component} from './d3.component';
// import { EchartsLineComponent } from './echarts/echarts-line.component';
// import { EchartsPieComponent } from './echarts/echarts-pie.component';
// import { EchartsBarComponent } from './echarts/echarts-bar.component';
// import { EchartsMultipleXaxisComponent } from './echarts/echarts-multiple-xaxis.component';
// import { EchartsAreaStackComponent } from './echarts/echarts-area-stack.component';
// import { EchartsBarAnimationComponent } from './echarts/echarts-bar-animation.component';
// import { EchartsRadarComponent } from './echarts/echarts-radar.component';

const components = [
    D3BarComponent,
    D3LineComponent,
    D3PieComponent,
    D3AreaStackComponent,
    D3PolarComponent,
    D3AdvancedPieComponent,
    D3Component
];

@NgModule({
    imports: [
        ThemeModule,
        NbCardModule,
        NgxChartsModule
    ],
    declarations: [...components],
    exports: [
        D3Component,
        D3PieComponent,
        D3LineComponent
    ]
})
export class D3Module {
}
