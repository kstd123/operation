import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import MainLayout from '../../components/MainLayout/MainLayout'
import ChartComponent from '../../components/Chart/Detail';

function Chart() {
	return (
		<MainLayout>
			<ChartComponent/>
		</MainLayout>
	)
}

 export default connect()(Chart);
