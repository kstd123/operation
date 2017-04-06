import React from 'react';
import { connect } from 'dva';
import TableComponent from '../components/Company/Company';
import MainLayout from '../components/MainLayout/MainLayout';
import Search from '../components/Search'
function Table() {
	return(
		<MainLayout>
		
			<TableComponent/>
		</MainLayout>
	)
}
export default connect()(Table);
