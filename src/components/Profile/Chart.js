import { render } from 'react-dom';
import './index.css';
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from "@syncfusion/ej2-base";
import { SampleBase } from "./sample-base";

export class Chart extends SampleBase {
  render() {
    return (
      <div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <ChartComponent
            id="charts"
            style={{ textAlign: "center" }}
            primaryXAxis={{
              valueType: "DateTime",
              labelFormat: "y",
              intervalType: "Years",
              edgeLabelPlacement: "Shift",
              majorGridLines: { width: 0 }
            }}
            load={this.onChartLoad.bind(this)}
            primaryYAxis={{
              labelFormat: "{value}%",
              rangePadding: "None",
              minimum: 0,
              maximum: 100,
              interval: 20,
              lineStyle: { width: 0 },
              majorTickLines: { width: 0 },
              minorTickLines: { width: 0 }
            }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            width={Browser.isDevice ? "100%" : "60%"}
            title="Inflation - Consumer Price"
            loaded={this.onChartLoad.bind(this)}
          >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={data1}
                xName="x"
                yName="y"
                name="Germany"
                width={2}
                marker={{ visible: true, width: 10, height: 10 }}
                type="Line"
              />
              <SeriesDirective
                dataSource={data2}
                xName="x"
                yName="y"
                name="England"
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

