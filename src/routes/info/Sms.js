import React from 'react';
import { connect } from 'dva';
import TableComponent from '../../components/Table/Sms';
import MainLayout from '../../components/MainLayout/MainLayout';

function Sms_table() {
	return(
		<MainLayout>
			<TableComponent/>
		</MainLayout>
	)

}

export default connect()(Sms_table);
