import React, {Component} from 'react'
import DataTable from 'react-data-table-component';
// import {
//   CBadge,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CDataTable,
//   CRow,

// } from '@coreui/react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';


// const getBadge = Flags => {
//   switch (Flags) {
//     case 'OK': return 'success'
//     case 'Inactive': return 'secondary'
//     case 'Pending': return 'warning'
//     case 'Require Review': return 'danger'
//     default: return 'primary'
//   }
// }
// const fields = ['Name','Description', 'Value', 'Flags']
const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982-10-1' }, { id: 2, title: 'Conan the Barbarian', year: '2020-02-04T07:57:43.363' }];
const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
    right: true,
  },
];
 


class Thetable extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', file: ''};

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChangeFile = this.handleChangeFile.bind(this);


  }

  render() {
    return (


<Card>
              {/* <CardHeader>
                <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader> */}
              <CardBody>
              <DataTable
        title={this.props.title}
        // noHeader={true}
        
        columns={this.props.columns}
        data={this.props.data}
        paginationPerPage={13}
        highlightOnHover={true}
        pagination={true}
      />
                
              </CardBody>
            </Card>      

    )
  }
}



export default Thetable