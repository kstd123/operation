import { Table, Icon,Pagination } from 'antd';
import React from 'react';
import reqwest from 'reqwest';//ajax
// const { Column, ColumnGroup } = Table;
// import data from './data.js';
const datas = [
		{
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
	}
 ];
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
const columns = [{
	  title: 'Name',
	  dataIndex: 'name',
	  sorter: true,
	  render: name => `${name.first} ${name.last}`,
	  width: '20%',
		}, {
	  title: 'Gender',
	  dataIndex: 'gender',
	  filters: [
	    { text: 'Male', value: 'male' },
	    { text: 'Female', value: 'female' },
	  ],
	  width: '20%',
	}, {
	  title: 'Email',
	  dataIndex: 'email',
	},
	{
		title: 'dob',
		dataIndex: 'dob'
	},
];
class Tables extends React.Component{

	state = {
	data: [],
	pagination: {},
	loading: false,
};


	fetch = (params = {}) => {
     console.log('params:', params);
     this.setState({ loading: true });
     reqwest({
       url: 'https://randomuser.me/api',
       method: 'get',
       data: {
	         results: 10,
         ...params,
       },
       type: 'json',
     }).then((data) => {
			 console.log(data.results)
       const pagination = { ...this.state.pagination };
       pagination.total = 200;
       this.setState({
         loading: false,
         data: data.results,
        //  pagination,
       });
     });
   }
   componentDidMount() {
     this.fetch();
   }
render(){
	return(<div>
		 <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} loading={this.state.loading} pagination={false}/>
		<Pagination total={10} current={20}pagesize={2}/>
		</div>
	)
}
}
function mapStateToProps(state) {
	const {pageNow, pageNum } = state.table;
}
export default Tables;
