import React from 'react';
import { connect } from 'dva';
// import ChartComponent from '../components/Chart/chart';
import MainLayout from '../components/MainLayout/MainLayout'
import { Row, Col } from 'antd';

function Chart() {
	return (
		<MainLayout>
			<div>
				<Row type="flex" justify="center">
					<Col span={10}>456</Col>
					<Col span={10}>123</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col span={10}>789</Col>
					<Col span={10}>222</Col>
				</Row>
			</div>
		</MainLayout>
	)
}
 export default connect()(Chart);
