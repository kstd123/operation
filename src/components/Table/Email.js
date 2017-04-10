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
					this.post_test();
				}
			)
	}
	search_post(msg,all){
		this.setState({data:msg,total:all})
		// console.log()
		console.log('search连接成功')
	}
 post_test = (data = "") => {
	 data = "pageNow="+this.state.current+"&pageNum="+this.state.pagesize ;
	this.setState({ search_data: data })
	 const req = request( 'http://localhost:3001/cas/v1/email/select/all', {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'POST',
		 body: data,
	 }).then((data) => {
		console.log(data.data)
		this.setState({
			loading: false,
			data:  data.data.date.list,
			total: data.data.date.rowAll,
		});
	});
 }

	foo=()=>{
		console.log("失败饿了")
	}
	componentDidMount() {
		 this.post_test();
 }
render(){
	return(<div>
			<Search
			field={Columns}
			foo={(msg,all)=>this.search_post(msg,all)}/>
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
