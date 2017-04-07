import { Table, Icon,Pagination } from 'antd';
import React from 'react';
import { connect } from 'dva';
import Search from '../Search'
import request from '../../utils/request';


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
const columns = [
	{
			title:"发票请求流水号",
			dataIndex:"fpqqlsh",
			key:"conditionFpqqlsh"
		},{
			title:"回调URL",
			dataIndex:"url",
			key:"conditionUrl"
		},{
			title:"微信订单号",
			dataIndex:"wxorderid",
			key:"conditionWxorderid"
		},
		{
			title:"微信",
			dataIndex:"wxappid",
			key:"conditionWxappid"
		},
		{
			title:"小程序推送用户id",
			dataIndex:"wxopenid",
			key:"conditionWxopenid"
		},
		{
			title:"小程序表单id",
			dataIndex:"wxformid",
			key:"conditionWxformid"
		},
		{
			title:"结果",
			dataIndex:"result",
			key:"conditionResult"
		}
];
class Wechat extends React.Component{

	state = {
		data: [],
		pagination: {},
		loading: true,
		current: 1,
		pagesize: 6,
		total:99
	};

pageChange=(e)=>{
			this.setState({
				current: e
			}, ()=>{
					this.post_test();
				}
			)
}

 post_test = (params = {
	 pageNow: this.state.current,
	 pageNum: this.state.pagesize
 	}) => {
	let data = "pageNow="+this.state.current+"&pageNum="+this.state.pagesize

		const req = request('http://localhost:3001/cas/v1/mobile/user/logout?token=a213asdfb', {
        	headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            method: 'POST',
            body:	data ,
          })

	//  const req = request( 'http://localhost:8080/wechat/select/all', {
	// 	 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
	// 	 method: 'POST',
	// 	 body: data,
	//  })
	 .then((data) => {
		console.log(data.data)
		this.setState({
			loading: false,
			data:  data.data.list,
			total: data.data.rowAll
		});
	});
 }
componentDidMount() {
  this.post_test();
}

render(){
	return(<div>
		<Search field={columns} />
		 <Table
			 rowSelection={rowSelection}
			 columns={columns}
			 dataSource={this.state.data}
			 loading={this.state.loading}
			 pagination={false}
			/>
		<Pagination
		showQuickJumper
		total={this.state.total}
		current={this.state.current}
		pagesize={this.state.pagesize}
		onChange={this.pageChange}
/>
		</div>
	)
}
}
// function mapStateToProps(state) {
// 	const {pageNow, pageNum } = state.table;
// }
export default Wechat;
// export default connect(maoStateToProps)(Tables)
