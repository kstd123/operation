import React from 'react';
import request from '../../utils/request';
import Chart from './Chart'
class Tax extends React.Component {
	 state={
		 	data:[10, 2, 20, 30, 50, 200, 10, 201, 20, 102, 11, 90],
			company:[]
	 }
	 get_company () {
			const req = request( 'http://192.168.52.101:8080/report-web/find/getclient', {
 	// 	 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
	Headers:{
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
},
 		 method: 'GET',
		 mode:'no-cors'

 	 })
 	 .then((data) => {
 		console.log(data.data.datas.corpname)
 		this.setState({
 			loading: false,
 			company: data.data.datas,
 		});
 	});
 	}
componentDidMount() {
	this.get_company();
}
	 render() {
		 const month = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
		 const option = {
			 color: ['#3398DB'],
			 tooltip : {
					 trigger: 'axis',
					 axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					 }
			 },
			 grid: {
					 left: '3%',
					 right: '4%',
					 bottom: '3%',
					 containLabel: true
			 },
			 xAxis : [
					 {
							 type : 'category',
							 data : month,
							 axisTick: {
									 alignWithLabel: true
							 }
					 }
			 ],
			 yAxis : [
					 {
							 type : 'value'
					 }
			 ],
			 series : [
					 {
							 name:'直接访问',
							 type:'bar',
							 barWidth: '60%',
							 data:this.state.data
					 }
			 ]
		 }
		 return(
			 <Chart option={option}/>
		 )
	 }
 }
 export default Tax
