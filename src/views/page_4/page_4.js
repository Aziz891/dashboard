
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
import Thetable from '../components_custom/dTable';
const columns = [
  {
    name: 'User',
    selector: 'user',
    sortable: true,
  },
  {
    name: 'LZOP Name',
    selector: 'name',
    sortable: true,
    right: true,
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
    right: true,
  },
];

class page_4 extends page_1 {

  constructor(props) {
    super(props);
    this.line_url = 'http://127.0.0.1:8000/faults/cape/?data=4'
    this.pie1_url = 'http://127.0.0.1:8000/faults/cape/?data=5'
    this.pie2_url = 'http://127.0.0.1:8000/faults/cape/?data=6'
    this.lineElement = React.createRef()
    this.pieElement1 = React.createRef()
    this.pieElement2 = React.createRef()
    this.state = {
      startDate: new Date(2020,1,1)
      , endDate: new Date(),
      listToggle: false,
      radioSelected: 1,
      tableData: null
    }
    
    
  }

  handleDateChange_table = (date,  element) => {
    // console.log('output', date)
    // console.log('output', event)
    // console.log('output', element)
    // console.log('ou', this)
    // console.log('element', this.lineElement)

    switch (element) {
      case 1:
        this.setState({
          startDate: date,
        })

        break;
      case 2:
        this.setState({
          endDate: date,
        })

   
        break;
      default:
        break;
    }
    axios.get(`http://127.0.0.1:8000/faults/cape/?data=8&fromdate=${this.state.startDate.toISOString().slice(0, 10)}&todate=${this.state.endDate.toISOString().slice(0, 10)}`
    ).then(response => {
        // console.log(response)
        let x = [];
        response.data.data.forEach((i, index)=> {x.push({id: index+1 , user:i[0], name: i[1], date: new Date( i[2]).toLocaleString( 'sv', { timeZoneName: 'short' } ).slice(0,18) }) })
        console.log(x)
        this.setState({tableData: x})






    }) 
  
    
  }
  radioClicked(id) {
    this.setState({radioSelected: id})
    if (id == 1) {
      
      this.setState({listToggle: false})
      
    } else {
      
      this.setState({listToggle: true})
    }
    
  }
  componentDidMount() {
    this.handleDateChange_table(this.state.startDate, 1)

  }
  
  render() {
    if (this.state.listToggle) { return  (
      <div>

    <div>


            <Row>
                  <Col sm="5">
            <DatePicker onChange={(date) => this.handleDateChange_table(date, 1)} selected={this.state.startDate}  />
            <DatePicker onChange={(date) => this.handleDateChange_table(date, 2)} selected={this.state.endDate}  />
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    {/* <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button> */}
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="secondary" onClick={() => this.radioClicked(1)} active={this.state.radioSelected === 1}>Charts </Button>
                        <Button color="secondary" onClick={() => this.radioClicked(2)} active={this.state.radioSelected === 2}>List</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
  
          </div>
      <br/>
          <div>
        

          <Thetable data={this.state.tableData} columns= {columns} title={"LZOP Entries in CAPE"} />

          </div>
    </div>
          
          )}
          else{
            
      return (
        
  
        <div>
          <div>

            <Row>
                  <Col sm="5">
            <DatePicker onChange={(date, event) => this.handleDateChange(date, event, 1)} selected={this.state.startDate}  />
            <DatePicker onChange={(date, event) => this.handleDateChange(date, event, 2)} selected={this.state.endDate}  />
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    {/* <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button> */}
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="secondary" onClick={() => this.radioClicked(1)} active={this.state.radioSelected === 1}>Charts</Button>
                        <Button color="secondary" onClick={() => this.radioClicked(2)} active={this.state.radioSelected === 2}>List</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
  
          </div>

          <br/>
          
          <div>
  
            <Dashboard url_request={this.line_url}  url={'ped'} title={'Protection Entries'} startDate={this.state.startDate} endDate={this.state.endDate} ref={this.lineElement} />
          </div>
          <div>
  
            <CardColumns className="cols-2">
              <div>
  
                <Piechart_generic url={this.pie1_url} title={'Protection by Voltage'} startDate={this.state.startDate} endDate={this.state.endDate} isBar={true} ref={this.pieElement1}  />
              </div>
              <div>
  
                <Piechart_generic url={this.pie2_url} title={"Protection by Area "} startDate={this.state.startDate} endDate={this.state.endDate} ref={this.pieElement2} />
              </div>
  
  
            </CardColumns>
          </div>
  
  
  
  
        </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
      );
    }

    
  }
  


  }
  export default page_4