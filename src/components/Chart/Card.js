import { Card, Col, Row, Icon } from 'antd';
import React from 'react';
import './Card.css'
import request from '../../utils/request'
import fetchJsonp from 'fetch-jsonp'
class React_Card extends React.Component{
	state={
		loading:false,
		info:''
	}
	get_info() {
	 const req = request( 'http://192.168.52.101:8080/report-web/statistic/briefinfo', {
		//  headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 headers:{
    	'Access-Control-Allow-Origin': '*',
    	'Content-Type': 'text/plain'
		},
		 method: 'GET',
		 mode:'cors'
	 })
		.then((data) => {
			console.log(data.data)
			this.setState({
				loading: false,
				data: data.data.datas,
				msg:data.data.msg
			});
		});
	}
	get(){
		fetchJsonp('http://192.168.52.101:8080/report-web/statistic/briefinfo', {
	    jsonpCallback: 'custom_callback'
	  })
	  .then(function(response) {
	    return response.json()
	  }).then(function(json) {
	    console.log('parsed json', json)
	  }).catch(function(ex) {
	    console.log('parsing failed', ex)
	  })
	}

	componentDidMount(){
		// this.get_info()
		this.get();
	}
	custom_callback(){
		console.log('jsop success')
	}
	render (){
		return(
			<div>
				<Row>
					<Col span='2'></Col>
					<Col span="5">
						<Card title={<span><Icon type="switcher" style={{margin:"0 30px 0 0 "}}/><span>开票总量</span></span>} >{this.state.info.invtotqty}</Card>
					</Col>
					<Col span="5">
						<Card title={<span><Icon type="team" style={{margin:"0 30px 0 0 "}}/><span>客户数量</span></span>} >{this.state.info.clitotqty}</Card>
					</Col>
					<Col span="5">
						<Card  title={<span><Icon type="folder-open" style={{margin:"0 30px 0 0 "}}/><span>收票总量</span></span>}>{this.state.info.revinvtotqty}</Card>
					</Col>
					<Col span="5">
						<Card title={<span><Icon type="hourglass" style={{margin:"0 30px 0 0 "}}/><span>待开票量</span></span>} >{this.state.info.togentotqty}</Card>
					</Col>
					<Col span='2'></Col>
				</Row>
			</div>
		)
	}
}
export default React_Card
