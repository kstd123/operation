import React from 'react';
import { connect } from 'dva';
import TableComponent from '../../components/Table/Email';
import MainLayout from '../../components/MainLayout/MainLayout';
function Table() {
	return(
		<MainLayout>
			<TableComponent/>
		</MainLayout>
	)
}
export default connect()(Table);
