import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';

class BarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budgets: []
        };
    }
    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const response = await fetch('/api/home');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({ budgets: body.budgets });
    }

    render() {

        var clubnames = []
        var requesteds = []
        var approveds = []
        var badData= this.state.budgets;
        for (var i = 0; i < badData.length; i++){
            var obj = badData[i];
            clubnames.push(obj.name)
            requesteds.push(obj.requested)
            approveds.push(obj.approved)
        }

        var gooddata = {
            labels: clubnames,
            series: [ requesteds, approveds]
        };

        var biggest = Math.max.apply(Math, requesteds);
        var options = {
        //<section className="center">
            high: biggest + 1000,
            low: 0,
            axisY: {
                showGrid: true,
                scaleMinSpace: 10
            }
        };

        console.log(this.badData);
        return (
            <div id="chart" class='ct-chart-bar ct-golden-section'>
                <ChartistGraph data={gooddata} options={options} type={"Bar"} />
            </div>
        );
    };
}
export default BarGraph;
