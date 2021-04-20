import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import axios from 'axios';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, Month, Agenda, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
import * as dataSource from './datasource.json';
/**
 *  Schedule view based configuration sample
 */
export default class ViewConfigurations extends SampleBase {
  
    constructor() {
        super(...arguments);
        this.datas = extend([], dataSource.fifaEventsData, null, true);
        this.instance = new Internationalization();
        this.resourceData = [
            { PriorityText: 'Priority High', PriorityId: 1, PriorityColor: '#f23224' },
            { PriorityText: 'Priority Medium', PriorityId: 2, PriorityColor: '#f2ad24' },
            { PriorityText: 'Priority Low', PriorityId: 3, PriorityColor: '#357cd2' }
        ];
      
          this.state = {data: []}
      
      
      // console.log(this.data)
      console.log(this.datas)
    }
  
  // componentDidMount() {
  //   axios.get("/api/auth/YT")
  //     .then(async res =>  this.setState({ data: extend([], res.data, null, true) }))
  // }
  
    getTimeString(value) {
        return this.instance.formatDate(value, { skeleton: 'Hm' });
    }
  
    // agendaTemplate(props) {
    //     return (<div><div className="subject ">{props.Subject}</div>
    //   {(props.Description !== null && props.Description !== undefined && props.Description !== "") ?
    //         <div className="group">{props.Description}</div> : ""}
    //   <div className="location">{this.getTimeString(props.StartTime)}
    //     {(props.City !== null && props.City !== undefined && props.City !== "") ? ", " + props.City : ""}</div></div>);
    // }
  
    monthEventTemplate(props) {
        return (<div className="subject">{props.Subject}</div>);
    }
  
    onEventRendered(args) {
        applyCategoryColor(args, this.scheduleObj.currentView);
    }
  
    render() {
      console.log(this.state.data);
        return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='schedule-views-config' width='80%' height='100%' ref={t => this.scheduleObj = t} currentView='Week' selectedDate={new Date(2018, 5, 20)} eventSettings={{ dataSource: this.state.data, fields: { location: { name: 'location' } } }} eventRendered={this.onEventRendered.bind(this)}>
              <ResourcesDirective>
                <ResourceDirective field='PriorityId' title='Priority' name='Priority' dataSource={this.resourceData} textField='PriorityText' idField='PriorityId' colorField='PriorityColor'>
                </ResourceDirective>
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='Day' startHour='06:00' endHour='24:00'/>
                <ViewDirective option='Week' startHour='06:00' endHour='24:00' showWeekend={true} timeScale={{ interval: 60, slotCount: 2 }}/>
                <ViewDirective option='Month'/>
              </ViewsDirective>
              <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
      </div>);
    }
}