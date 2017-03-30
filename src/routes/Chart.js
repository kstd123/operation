import React from 'react';
import { connect } from 'dva';
import ChartComponent from '../components/Chart/charts';
import MainLayout from '../components/MainLayout/MainLayout'
import { Row, Col } from 'antd';

function Chart() {
	return (
		<MainLayout>
			<div>
				<Row type="flex" justify="center">
					<Col span={10}><ChartComponent/></Col>
					<Col span={10}></Col>
				</Row>
				<Row type="flex" justify="center">
					<Col span={10}></Col>
					<Col span={10}></Col>
				</Row>
			</div>
		</MainLayout>
	)
}
 export default connect()(Chart);
