import { Table, Icon } from 'antd';
import React from 'react';
// const { Column, ColumnGroup } = Table;
function Tables(){

	const data = [{
	  key: '1',
	  firstName: 'John',
	  lastName: 'Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	}, {
	  key: '2',
	  firstName: 'Jim',
	  lastName: 'Green',
	  age: 42,
	  address: 'London No. 1 Lake Park',
	}, {
	  key: '3',
	  firstName: 'Joe',
	  lastName: 'Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	},{
	  key: '1',
	  firstName: 'John',
	  lastName: 'Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	}, {
	  key: '2',
	  firstName: 'Jim',
	  lastName: 'Green',
	  age: 42,
	  address: 'London No. 1 Lake Park',
	}, {
	  key: '3',
	  firstName: 'Joe',
	  lastName: 'Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	},{
	  key: '1',
	  firstName: 'John',
	  lastName: 'Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	}, {
	  key: '2',
	  firstName: 'Jim',
	  lastName: 'Green',
	  age: 42,
	  address: 'London No. 1 Lake Park',
	}, {
	  key: '3',
	  firstName: 'Joe',
	  lastName: 'Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	},{
	  key: '1',
	  firstName: 'John',
	  lastName: 'Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	}, {
	  key: '2',
	  firstName: 'Jim',
	  lastName: 'Green',
	  age: 42,
	  address: 'London No. 1 Lake Park',
	}, {
	  key: '3',
	  firstName: 'Joe',
	  lastName: 'Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	},{
	  key: '1',
	  firstName: 'John',
	  lastName: 'Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	}, {
	  key: '2',
	  firstName: 'Jim',
	  lastName: 'Green',
	  age: 42,
	  address: 'London No. 1 Lake Park',
	}, {
	  key: '3',
	  firstName: 'Joe',
	  lastName: 'Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	},{
	  key: '1',
	  firstName: 'John',
	  lastName: 'Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	}, {
	  key: '2',
	  firstName: 'Jim',
	  lastName: 'Green',
	  age: 42,
	  address: 'London No. 1 Lake Park',
	}, {
	  key: '3',
	  firstName: 'Joe',
	  lastName: 'Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	},{
	  key: '1',
	  firstName: 'John',
	  lastName: 'Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	}, {
	  key: '2',
	  firstName: 'Jim',
	  lastName: 'Green',
	  age: 42,
	  address: 'London No. 1 Lake Park',
	}, {
	  key: '3',
	  firstName: 'Joe',
	  lastName: 'Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	},{
	  key: '1',
	  firstName: 'John',
	  lastName: 'Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	}];
	const Columns = [
		{
			title:"发票请求流水号",
			dataIndex:"fpqqlsh",
			key:"fpqqlsh"
		},{
			title:"接收地址",
			dataIndex:"address",
			key:"address"
		},{
			title:"标题",
			dataIndex:"title",
			key:"title"
		},{
			title:"消息内容",
			dataIndex:"content",
			key:"content"
		},{
			title:"结果",
			dataIndex: "result",
			key:"result"
		},{
			title:"Action",
			key:"action",
			render:(text, record) => (
				<span>
					<a href="#">Action 一 {record.name}</a>
					<span className="ant-divider" />
					<a href="#">Delete</a>
					<span className="ant-divider" />
					<a href="#" className="ant-dropdown-link">
						More actions <Icon type="down" />
					</a>
				</span>
			)
		}
	]

	const rowSelection = {
	  onChange: (selectedRowKeys, selectedRows) => {
	    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	  },
	  onSelect: (record, selected, selectedRows) => {
	    console.log(record, selected, selectedRows);
	  },
	  onSelectAll: (selected, selectedRows, changeRows) => {
	    console.log(selected, selectedRows, changeRows);
	  },
	  getCheckboxProps: record => ({
	    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
	  }),
	};

return( <Table rowSelection={rowSelection} columns={Columns} dataSource={data} />)

}

export default Tables;
