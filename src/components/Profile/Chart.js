import { render } from 'react-dom';
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from "@syncfusion/ej2-base";
import { SampleBase } from "./sample-base";
import { userChart} from "../../actions/adminUser.js";

// export let data1 = [
//   { x: new Date(), y: 21 },
//   { x: new Date(2006, 0, 1), y: 24 },
//   { x: new Date(2007, 0, 1), y: 36 },
//   { x: new Date(2008, 0, 1), y: 38 },
//   { x: new Date(2009, 0, 1), y: 54 },
//   { x: new Date(2010, 0, 1), y: 57 },
//   { x: new Date(2011, 0, 1), y: 70 }
// ];

export default class Chart extends SampleBase {
  
  constructor(){
    super();
    this.state = { chartdata: [] };
  }
  
  async componentWillMount() {
    var chartdata = [];
    
    const chart = await userChart();
    console.log(chart);
    chart.map(item => {
      // console.log(item._id.yearMonthDayUTC)
      var data = {x: item._id.yearMonthDayUTC, y: item.number}
      chartdata.push(data)
    })
    this.setState({chartdata: chartdata});
  }
  
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <ChartComponent
            id="charts"
            style={{ textAlign: "center" }}
            primaryXAxis={{
              valueType: "DateTime",
              labelFormat: "d",
              intervalType: "Days",
              edgeLabelPlacement: "Shift",
              majorGridLines: { width: 0 }
            }}  
            primaryYAxis={{
              labelFormat: "{value}",
              rangePadding: "None",
              minimum: 0,
              maximum: 10,
              interval: 2,
              lineStyle: { width: 0 },
              majorTickLines: { width: 0 },
              minorTickLines: { width: 0 }
            }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            width={Browser.isDevice ? "100%" : "60%"}
            title="New users - Last 7 days"
          >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={this.state.chartdata}
                xName="x"
                yName="y"
                name="New Users"
                width={2}
                marker={{ visible: true, width: 10, height: 10 }}
                type="Line"
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
}

