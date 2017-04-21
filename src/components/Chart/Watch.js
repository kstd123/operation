import { Table, Icon , Pagination, Button, Row, Col } from 'antd';
import React from 'react';
import request from '../../utils/request';
import Card from './Card';
import Chart from './Chart'
let temp = { num:'', year16:'',year17:''}//年份存储
class Watch extends React.Component{
  state={
    data:[30,40,18,90],
    x_data:[1,2,3,4,5],
    data_num:[],
    x_data_num:[],
  }

  get_year16() {
	 const req = request( 'http://192.168.52.101:8080/report-web/statistic/time/invoiceqty?year=2016', {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'GET',
	 })
		.then((data) => {
      temp.year16 = data.data.datas
      console.log(temp.year16)
      this.year16(temp.year16)
		});
	}
  get_year17() {
	 const req = request( 'http://192.168.52.101:8080/report-web/statistic/time/invoiceqty?year=2017', {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'GET',
	 })
		.then((data) => {
      temp.year17 = data.data.datas
      console.log(temp.year17)
      this.year17(temp.year17)
		});
	}
  get_num() {
	 const req = request( 'http://192.168.52.101:8080/report-web/statistic/client/invoiceqty', {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'GET',
	 })
		.then((data) => {
      temp.num = data.data.datas
      console.log(temp.num)
      this.num(temp.num)
		});
	}
  company_change() {//公司表格
    let children = []
    for(let i in company){
        children.push({"value":company[i].corpid,"label":company[i].corpname})
    }
    this.setState({
      company:children
    })
  }
  num(temp){
    let res = this.state.data;
    let data = [],
        x_data=[];
    for(let i in temp){
      data.push(temp[i].invqty)
      x_data.push(temp[i].corpname)
    }
    this.setState({
      data_num:data,
      x_data_num:x_data
    })
  }
  year16(temp){
    let res = this.state.data;
    let data = [],
        x_data=[];
    for(let i in temp){
      data.push(temp[i].invqty)
      x_data.push(temp[i].month)
    }
    this.setState({
      data_year_16:data,
      x_data_year_16:x_data
    })
  }
  year17(temp){
    let res = this.state.data;
    let data = [],
        x_data=[];
    for(let i in temp){
      data.push(temp[i].invqty)
      x_data.push(temp[i].month)
    }
    this.setState({
      data_year_17:data,
      x_data_year_17:x_data
    })
  }
  componentDidMount() {
    this.get_num();
    this.get_year16();
    this.get_year17();
  }
  render() {
	return(
    <div>
    <Row>
      <Card/>
    </Row>
       <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <Chart data={this.state.data_num}     x_data={this.state.x_data_num}
          name='开票量'/>
        </Col>
        <Col span={6}></Col>
       </Row>
       <Row>
        <Col span={12}>
          <Chart data={this.state.data_year_16} x_data={this.state.x_data_year_16}
          name='2016年度'/></Col>
        <Col span={12}>
          <Chart data={this.state.data_year_17} x_data={this.state.x_data_year_17}
          name='2017年度'/></Col>
      </Row>
    </div>
	)
}
}
export default Watch;
