import React, { Component, lazy, Suspense } from 'react';
import axios from "axios";
import { Bar, Line, Doughnut, Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';




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
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
let data_labels = []




const doughnutoption = {
  plugins: {


    datalabels: {
      formatter: function (value, ctx) {

        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map(function (data) {
          sum += data;
        });
        let percentage = (value * 100 / sum).toFixed(2) + "%";
        if ((value * 100 / sum) < 4) {
          percentage = '';
        }
        return percentage;


      },
      color: '#fff',
      display: 'auto'
    }

  }
  ,
  tooltips: {
    callbacks: {
      label: function (tooltip, data) {
        let label = ''

        label = label + data.labels[tooltip.index] + ' : '
        label = label + data.datasets[0].data[tooltip.index] + ' ('
        let perc = 100 * (data.datasets[0].data[tooltip.index]) / (data.datasets[0].data.reduce((i, j) => (i + j), 0))
        label = label + Math.round(perc * 100) / 100 + '%)'
        return label
      }
    }
  }
}



// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


var elements = 9;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'transparent',
      lineTension: 0,
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      fill: '-1',
      data: data1,
    },
    {
      label: 'My Second dataset',
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',

      data: data3,
    },
    {
      label: 'My fourth dataset',
      backgroundColor: 'transparent',
      lineTension: 0,
      borderColor: brandWarning,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      fill: '-1',
      data: data1,
    },
  ],
};
const bar_data = []
const bar_label = []
const data_chart_line = { "woa": [], "eoa": [], "coa": [], "pesd": [], }
let data_chart_line_test = {}



const mainChartOpts = {

  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        distribution: 'series',
        ticks: {

          autoSkipPadding: 20
        }
        ,
        time: {

          // displayFormats: {
          //   day: 'DD-MMM-YYYY',
          //   quarter: 'QQ - YYYY',
          //   month: 'MMM-YYYY',
          // },
        },
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          // maxTicksLimit: 5,
          // stepSize: Math.ceil(1000 / 5),
          // max: 1000,
        },

      }],
  },
  // elements: {
  //   point: {
  //     radius: 0,
  //     hitRadius: 10,
  //     hoverRadius: 4,
  //     hoverBorderWidth: 3,
  //   },
  // },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      data: {},
      data_pie: {},
      mainChartOpts: mainChartOpts,
      startDate: new Date(2020, 1, 1),
      endDate: new Date()
    };
  }

  call_api(radioSelected) {

    const colorSet = ['#466f9d', '#91b3d7', '#ed444a', '#feb5a2', '#9d7660', '#d7b5a6', '#3896c4', '#a0d4ee', '#ba7e45', '#39b87f', '#c8133b', '#ea8783']

    let url_ips = 'http://10.75.81.29:81/faults/ips/?'
    url_ips = url_ips + '&fromdate=' + this.props.startDate.toISOString().slice(0, 10)
    url_ips = url_ips + '&todate=' + this.props.endDate.toISOString().slice(0, 10)
    
    // url_ips = url_ips + ((radioSelected) => {
    //   switch (radioSelected) {
    //     case 1:
    //       return '&collapse=weekly'

    //       break;
    //     case 2:
    //       return '&collapse=daily'

    //       break;
    //     case 3:
    //       return '&collapse=monthly'

    //       break;

    //     default:
    //       break;
    //   }
    // })(radioSelected)

    console.log('date', this.state.startDate.toISOString().slice(0, 10), this.state.startDate)
    console.log('date', this.state.endDate.toISOString().slice(0, 10), this.state.endDate)
    let query_period = ''
    switch (radioSelected) {
      case 1:
        query_period = '1'
        mainChartOpts.scales.xAxes[0].time = { unit: 'day' }

        break;
      case 2:

        query_period = '2'
        mainChartOpts.scales.xAxes[0].time = { unit: 'month' }
        break;
      case 3:

        query_period = '3'
        mainChartOpts.scales.xAxes[0].time = { unit: 'quarter' }
        break;

      default:
        query_period = '0'
        break;
    }

    if(this.props.url == 'csd') {
      url_ips = url_ips + '&department=1'
    }
    else if(this.props.url == 'dped') {
      url_ips = url_ips + '&department=2'
    }
    else {

      url_ips = url_ips + '&department=0'
    }

    // axios.get(url_ips + '&period=' + query_period)
    var config = {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
    axios.get(url_ips + '&period=' + query_period)
      .then(response => {

        let deptData = {}
        let opecData = []
        let deptDataCharts = []
        // response.data.dataset.data.forEach((item, index) => { opecData.push({ t: item[0], y: item[1] }) })

        response.data.count.forEach(function (i) {

          if (typeof deptData[i.department] === 'undefined') {

            deptData[i.department] = [{
              t: i.date,
              y: i.count
            }]
          } else {

            deptData[i.department].push({
              t: i.date,
              y: i.count
            })


          }

        })

        Object.keys(deptData).forEach(function (i, index) {

          deptDataCharts.push({
            label: i,
            backgroundColor: 'transparent',
            lineTension: 0,
            borderColor: colorSet[index],

            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            fill: '-1',


            data: deptData[i]
          })


        })
        let bar_data = []
        let bar_data_labels = []

        deptDataCharts.forEach((i) => (bar_data_labels.push(i.label + ' (' + i.data.reduce((i, j) => i + j.y, 0) + ')')))
        deptDataCharts.forEach((i) => (bar_data.push(i.data.reduce((i, j) => i + j.y, 0))))
        // bar_data_labels.sort();
        console.log(deptDataCharts)


        let bar_data_colors = colorSet.slice(0, bar_data_labels.length)
        // let PieData = { labels: bar_data_labels, datasets: [{data: bar_data, backgroundColor: colorSet.slice(0, bar_data_labels.length) }]  }
        // let PieData = { labels: bar_data_labels, datasets: [{data: bar_data }]  }
        let PieData = { datasets: [{ data: opecData }] }


        this.setState({ data_pie: PieData, data: { datasets: deptDataCharts } });
      })
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {



    this.setState({
      radioSelected: radioSelected,

    });
    this.call_api(radioSelected)





  }




  componentDidMount() {
    Chart.plugins.unregister(ChartDataLabels);
    console.log('mount')
    this.call_api(2)
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">



        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">{this.props.title}</CardTitle>
                    <div className="small text-muted"></div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    {/* <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button> */}
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Quarter 1 </Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Quarter 2</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <Row>



                  <Line data={this.state.data} options={this.state.mainChartOpts} height={400} />






                </Row>




              </CardBody>

            </Card>

          </Col>

        </Row>








      </div>
    );
  }
}

export default Dashboard;

