
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

class page_1 extends React.Component {

  

    render() {
      return (
        
<div>


            <div>

            <Dashboard url={'ped'} title={'PED IPS Entries'}/> 
            </div>
          <div>

            <CardColumns className="cols-2">
              <div>

            <Piechart url={'http://10.75.81.29:81/faults/ipsrelays/'} title={'Most Common Relays'} />
              </div>
              <div>

            <Piechart url={'http://10.75.81.29:81/faults/ipstechnology/'}  title={'Breakdown of Relay Technology'}/>
              </div>
            

            </CardColumns>
          </div>
         
            
          

</div>
  


     
  

      
        

        
      
     

      );
    }
  }
  export default page_1