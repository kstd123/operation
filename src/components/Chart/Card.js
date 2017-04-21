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
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'GET',
	 })
		.then((data) => {
			console.log(data.data)
			this.setState({
				loading: false,
				info: data.data.datas,
				msg:data.data.msg
			});
		});
	}

	componentDidMount(){
		this.get_info()
	}
	render (){
		return(
			<div>
				<Row>
					<Col span='2'></Col>
					<Col span="5">
						<Card
						title={
							<span>
								<Icon type="switcher" style={{margin:"0 30px 0 0 "}}/>
									<span style={{ fontSize: 20 }}>开票总量</span>
								</span>
							} >
							<span style={{ color:'#3398D8', fontSize:22 }}>{this.state.info.invtotqty}</span>
						</Card>
					</Col>

					<Col span="5">
						<Card
						title={
							<span>
							<Icon type="team" style={{margin:"0 30px 0 0 "}}/>
							<span style={{ fontSize: 20 }}>客户数量</span></span>
							} >
							<span style={{ color:'#3398D8', fontSize:22 }}>{this.state.info.clitotqty}</span>
						</Card>
					</Col>

					<Col span="5">
							<Card
							title={
								<span>
									<Icon type="folder-open" style={{margin:"0 30px 0 0 "}}/>
									<span style={{ fontSize: 20 }}>收票总量</span>
								</span>
							}>
							<span style={{ color:'#3398D8', fontSize:22 }}>{this.state.info.revinvtotqty}</span>
						</Card>
					</Col>

					<Col span="5">
						<Card
							title={
								<span>
									<Icon type="hourglass" style={{margin:"0 30px 0 0 "}}/>
									<span style={{ fontSize: 20 }}>待开票量</span>
								</span>
							}>
							<span style={{ color:'#3398D8', fontSize:22 }}>{this.state.info.togentotqty}</span>
						</Card>
					</Col>
					<Col span='2'></Col>
				</Row>
			</div>
		)
	}
}
export default React_Card
