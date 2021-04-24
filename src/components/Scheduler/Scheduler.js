import { render } from "react-dom";
import "./index.css";
import * as React from "react";
import axios from "axios";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  Month,
  Agenda,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop
} from "@syncfusion/ej2-react-schedule";
import { applyCategoryColor } from "./helper";
import { Internationalization, extend } from "@syncfusion/ej2-base";
import { SampleBase } from "./sample-base";
import * as dataSource from "./datasource.json";
import { getSchdules, createSchedule, updateSchedule, deleteSchedule } from "../../actions/scheduler.js";
import { Spinner } from "react-bootstrap";

/**
 *  Schedule view based configuration sample
 */
export default class ViewConfigurations extends SampleBase {
  constructor() {
    super(...arguments);
    this.datas = extend([], dataSource.fifaEventsData, null, true);
    this.instance = new Internationalization();
    this.resourceData = [
      {
        PriorityText: "High",
        PriorityId: 1,
        PriorityColor: "#f23224"
      },
      {
        PriorityText: "Medium",
        PriorityId: 2,
        PriorityColor: "#f2ad24"
      },
      { PriorityText: "Low", PriorityId: 3, PriorityColor: "#357cd2" }
    ];

    this.state = { data: [] };
  }

  async componentWillMount() {
    const data = await getSchdules(localStorage.email);
    console.log(data);
    this.setState({ data: extend([], data, null, true) });
    // console.log(this.state.data)
    // .then(res =>  this.setState({ data: extend([], res.data, null, true) }))
  }

  onActionBegin() {
    console.log("begin");
  }
  onActionComplete(event) {
    console.log("complete");
    console.log(event)
    // console.log(event.data.EventType);
    if(event.requestType == "eventCreated"){
      console.log(event.addedRecords[0]);
      createSchedule(localStorage.email, event.addedRecords[0]);
    }
    
    if(event.requestType == "eventChanged"){
      console.log(event.changedRecords[0])
      updateSchedule(localStorage.email, event.changedRecords[0]);
    }
    
    if(event.requestType == "eventRemoved"){
      console.log(event.deletedRecords[0])
      deleteSchedule(localStorage.email, event.deletedRecords[0])
    }
  }
  onActionFailure() {
    console.log("fail");
  }

  getTimeString(value) {
    return this.instance.formatDate(value, { skeleton: "Hm" });
  }

  monthEventTemplate(props) {
    return <div className="subject">{props.Subject}</div>;
  }

  onEventRendered(args) {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  render() {
    // const data = this.state.data;
    // console.log(this.state.data.data)
  if(this.state.data !== undefined)
      {
    return (
      
        <div className="schedule-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              cssClass="schedule-views-config"
              width="100%"
              height="100%"
              ref={t => (this.scheduleObj = t)}
              currentView="Week"
              selectedDate={new Date()}
              eventSettings={{
                dataSource: this.state.data.data,
                fields: { location: { name: "location" } }
              }}
              eventRendered={this.onEventRendered.bind(this)}
              actionBegin={this.onActionBegin.bind(this)}
              actionComplete={this.onActionComplete.bind(this)}
              actionFailure={this.onActionFailure.bind(this)}
            >
              <ResourcesDirective>
                <ResourceDirective
                  field="PriorityId"
                  title="Priority"
                  name="Priority"
                  dataSource={this.resourceData}
                  textField="PriorityText"
                  idField="PriorityId"
                  colorField="PriorityColor"
                ></ResourceDirective>
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option="Day" startHour="06:00" endHour="24:00" />
                <ViewDirective
                  option="Week"
                  startHour="06:00"
                  endHour="24:00"
                  showWeekend={true}
                  timeScale={{ interval: 60, slotCount: 2 }}
                />
                <ViewDirective option="Month" />
              </ViewsDirective>
              <Inject
                services={[Day, Week, Month, Agenda, Resize, DragAndDrop]}
              />
            </ScheduleComponent>
          </div>
        </div>
        </div>)
      } else {
        return <Spinner animation="border" />
    }

  }
}
