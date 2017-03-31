import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import TableComponent from '../components/Table/Table';
import MainLayout from '../components/MainLayout/MainLayout';

function Table() {
	return(
		<MainLayout>
			<TableComponent/>
		</MainLayout>
	)

}

export default connect()(Table);
