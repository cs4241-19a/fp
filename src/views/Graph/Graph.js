import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';

class BarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }

    badData= this.props.data;


    render() {
        var data = {
            labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
            series: [ [1000, 2000, 4000, 8000, 6000, 1000, 1000, 1000, 1000, 1000], [2000, 1000, 6000, 7000, 9000, 30000, 2000, 6000, 3000, 1000]]
        };

        var options = {
           //high is the biggest number plus one
        //<section className="center">
            high: 10000,
            low: 0
        };

        console.log(this.badData);
        return (
            <div id="myGraph">
                <ChartistGraph data={data} options={options} type={"Bar"} />
            </div>
        );
    };
}
export default BarGraph;
