import React from 'react';
import { connect } from 'dva';
import ChartComponent from '../components/Chart/Chart';
import MainLayout from '../components/MainLayout/MainLayout'
import { Row, Col } from 'antd';

function Chart() {
	return (
		<MainLayout>
			<div>
				<Row >
					<Col span={12}><ChartComponent/></Col>
					<Col span={12}><ChartComponent/></Col>
				</Row>
				<Row>
					<Col span={12}><ChartComponent/></Col>
					<Col span={12}><ChartComponent/></Col>
				</Row>
			</div>
		</MainLayout>
	)
}
 export default connect()(Chart);
