import * as Chartist from 'chartist';
import React from "react";

//            <script type="text/javascript" src= './RawGraph.js'></script>

var data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
        [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
        [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
    ]
};

var options = {
    seriesBarDistance: 10
};

var responsiveOptions = [
    ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
            labelInterpolationFnc: function (value) {
                return value[0];
            }
        }
    }]
];

new Chartist.Bar('.ct-chart', data, options, responsiveOptions);

/*
var trace1 = {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [20, 14, 23],
    name: 'SF Zoo',
    type: 'bar'
};

var trace2 = {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [12, 18, 29],
    name: 'LA Zoo',
    type: 'bar'
};

var data = [trace1, trace2];
var layout = {barmode: 'group'};

Plotly.newPlot('myDiv',data, layout, {},{showSendToCloud:true});

//document.getElementById('myDiv')

 */



/*
<script>
  var trace1 = {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [20, 14, 23],
      name: 'SF Zoo',
      type: 'bar'
  };

  var trace2 = {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [12, 18, 29],
      name: 'LA Zoo',
      type: 'bar'
  };

  var data = [trace1, trace2];
  var layout = {barmode: 'group'};

  Plotly.newPlot('myDiv',data, layout, {},{showSendToCloud:true});
  </script>

  getBudgets = async () => {
      const response = await fetch('/api/home');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log(Object.values(body));
      this.setState({budgets: Object.values(body)});
  };

*/