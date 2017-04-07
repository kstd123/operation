import { Table, Icon,Pagination } from 'antd';
import React from 'react';
import { connect } from 'dva';
import request from '../../utils/request';
import Search from '../Search'


const Columns = [
	 {
		 title:"发票请求流水号",
		 dataIndex:"fpqqlsh",
		 key:"conditionFpqqlsh"
	 },{
		 title:"接收地址",
		 dataIndex:"address",
		 key:"conditionAddress"
	 },{
		 title:"结果",
		 dataIndex: "result",
		 key:"conditionResult",
		 filters: [
			 { text: '成功', value: '0' },
			 { text: '失败', value: '1' },
		 ]
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

class Tables extends React.Component{

	state = {
		data: [],
		pagination: {},
		loading: false,
		current: 1,
		pagesize: 6,
		total:99,
		search_data:""
	};
	pageChange=(e)=>{
			this.setState({
				current: e
			}, ()=>{
					this.test_123();
				}
			)
	}
	SearchChange=(e)=>{
		console.log(e+"子组件更新");
		// console.log(this.refs.SearchComponent.state)
		// (this.refs.SearchComponent.state.data === []) ? console.log("未更新") :this.setState({ current:1,pagesize:6,data:this.refs.SearchComponent.state.data })
	}
 post_test = (data = "") => {
	 data = "pageNow="+this.state.current+"&pageNum="+this.state.pagesize
	this.setState({ search_data: data })
	 const req = request( 'http://localhost:8080/email/select/all', {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'POST',
		 body: data,
	 }).then((data) => {
		console.log(data.data)
		this.setState({
			loading: false,
			data:  data.data.list,
			total: data.data.rowAll,
		});
	});
 }
 test_123 = (data = {}) => {
	 	data = "pageNow="+this.state.current+"&pageNum="+this.state.pagesize
		const req = request('http://localhost:3001/cas/v1/mobile/user/logout?token=a213asdfb', {
		headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
	    method: 'POST',
	    body:	data ,
	  });
		req.then((resp)=>{
			console.log(resp.data);
		}, (err)=>{console.log("failed!!!!")});
	}
	foo=()=>{
				// console.log(this.refs.SearchComponent.state+"------------------")
				console.log("失败饿了")
	}
	componentWillMount() {
		this.foo()
	}
	componentDidMount() {

		 this.test_123();
 }
// componentWillReceiveProps() {
//
// }
render(){
	return(<div>
			<Search
			field={Columns} ref="SearchComponent"
		 	data={this.state.search_data}
			onChange={this.SearchChange()}/>

		 	<Table
			 rowSelection={rowSelection}
			 columns={Columns}
			 dataSource={this.state.data}
			 loading={this.state.loading}
			 pagination={false}/>

			<Pagination
			showQuickJumper
			total={this.state.total}
			current={this.state.current}
			pagesize={this.state.pagesize}
			onChange={this.pageChange}/>
		</div>
	)
}
}
// function mapStateToProps(state) {
// 	const {pageNow, pageNum } = state.table;
// }
export default Tables;
// export default connect(maoStateToProps)(Tables)
