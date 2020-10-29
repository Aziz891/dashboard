
import React, { Component, Suspense } from 'react';
import Dashboard from '../Dashboard/Dashboard'
import Piechart_generic from '../Piechart_generic/Piechart_generic'

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
import page_1 from "../page_1"

import "react-datepicker/dist/react-datepicker.css";

class page_3 extends page_1 {

  constructor(props) {
    super(props);
    this.line_url = 'http://127.0.0.1:8000/faults/cape/?data=1'
    this.pie1_url = 'http://127.0.0.1:8000/faults/cape/?data=2'
    this.pie2_url = 'http://127.0.0.1:8000/faults/cape/?data=3'
    

  }

  render() {

    return (

      <div>


        <div>

          <DatePicker onChange={(date, event) => this.handleDateChange(date, event, 1)} selected={this.state.startDate}  />
          <DatePicker onChange={(date, event) => this.handleDateChange(date, event, 2)} selected={this.state.endDate}  />
          <div>

              <Button title="export" onClick={(e) => {
         e.preventDefault();
        window.location.href=`http://10.75.81.29:81/faults/ips_export/?fromdate=${this.state.startDate.toISOString().slice(0, 10)}&todate=${this.state.endDate.toISOString().slice(0, 10)}`;
      }}   > Export </Button>
          </div>
        </div>
        <div>

          <Dashboard url_request={this.line_url}  url={'ped'} title={'PED IPS Entries'} startDate={this.state.startDate} endDate={this.state.endDate} ref={this.lineElement} />
        </div>
        <div>

          <CardColumns className="cols-2">
            <div>

              <Piechart_generic url={this.pie1_url} title={'Most Common Relays'} startDate={this.state.startDate} endDate={this.state.endDate} isBar={true} ref={this.pieElement1}  />
            </div>
            <div>

              <Piechart_generic url={this.pie2_url} title={'Breakdown of Relay Technology'} startDate={this.state.startDate} endDate={this.state.endDate} ref={this.pieElement2} />
            </div>


          </CardColumns>
        </div>




      </div>













    );

    
  }
  


  }
  export default page_3