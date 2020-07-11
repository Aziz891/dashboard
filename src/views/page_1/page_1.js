
import React, { Component, Suspense } from 'react';
import Dashboard from '../Dashboard'
import Piechart from '../Piechart'

import axios from "axios";
import { Bar, Line, Doughnut } from 'react-chartjs-2';

import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  CardColumns,
} from 'reactstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class page_1 extends React.Component {
  constructor(props) {
    super(props);
    this.lineElement = React.createRef()
    // this.handleDateChange = this.handleDateChange.bind(this)
    this.state = {
      startDate: new Date(2020,1,1)
      , endDate: new Date()
    }

  }
  handleDateChange = (date, event, element) => {
    // console.log('output', date)
    // console.log('output', event)
    // console.log('output', element)
    // console.log('ou', this)
    // console.log('element', this.lineElement)

    switch (element) {
      case 1:
        this.lineElement.current.setState({
          startDate: date,
        })
        this.setState({
          startDate: date,
        })

        break;
      case 2:
        this.setState({
          endDate: date,
        })

        this.lineElement.current.setState({
          endDate: date,
        })

        break;
      default:
        break;
    }
    setTimeout(() => {console.log('selected', this.lineElement.current.state.startDate, date)
    this.lineElement.current.call_api(this.lineElement.current.state.radioSelected)
  
  } , 100 )
    
  }
  componentDidMount() {
    console.log('refs', this.lineElement, this.pieElement1)



  }
  render() {
    return (

      <div>


        <div>

          <DatePicker onChange={(date, event) => this.handleDateChange(date, event, 1)} selected={this.state.startDate}  />
          <DatePicker onChange={(date, event) => this.handleDateChange(date, event, 2)} selected={this.state.endDate}  />
        </div>
        <div>

          <Dashboard url={'ped'} title={'PED IPS Entries'} startDate={this.state.startDate} endDate={this.state.endDate} ref={this.lineElement} />
        </div>
        <div>

          <CardColumns className="cols-2">
            <div>

              <Piechart url={'http://10.75.81.29:81/faults/ipsrelays/'} title={'Most Common Relays in 2020'} isBar={true} />
            </div>
            <div>

              <Piechart url={'http://10.75.81.29:81/faults/ipstechnology'} title={'Breakdown of Relay Technology in 2020'} />
            </div>


          </CardColumns>
        </div>




      </div>













    );
  }
}
export default page_1