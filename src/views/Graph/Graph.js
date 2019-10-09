import React, { Component } from 'react';
//import * as Plotly from "react-plotlyjs";
//import Plot from 'react-plotly.js';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
            <script type="text/javascript" src= './RawGraph.js'></script>
            <div id="myDiv"></div>
                hey its the graph div
        </div>
        );
    };
}

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
export default Graph;
