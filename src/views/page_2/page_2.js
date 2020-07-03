
import React, { Component, Suspense } from 'react';
import Dashboard from '../Dashboard'
import { Row } from 'reactstrap';

class page_1 extends React.Component {
    render() {
      return (
        <div>
            
            <Dashboard title={'CSD IPS Entries'}  url={'csd'} /> 
            <Dashboard title={'AMD IPS Entries'}  url={'dped'} /> 

        </div>
  

      
        
        
        

      );
    }
  }
  export default page_1