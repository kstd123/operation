import { Table, Icon,Pagination, Button } from 'antd';
import React from 'react';
import { connect } from 'dva';
import request from '../../utils/request';
import Search from '../Search';
import Page from '../Page';

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
 		 title:"操作",
 		 key:"action",
 		 render:(record) => (
 					<Button type="primary">重发</Button>
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
		current: 1,
		pagesize: 10,
		total:0,
		search:'false',
		loading: true,
		authority:false,
		search_data:'',
	};
	Pagination(msg) {
		this.setState({ current:msg },()=>{this.page_check()})
	}
	page_check(){
		if(this.state.search=='true'){
			this.post_search()
		}else{
			this.post()
		}
	}
	Search(msg) {
		this.setState({ search:'true',search_data: msg,current: 1 },()=>{this.page_check()})
		console.log("search连接成功")
	}
	Search_clear() {
		this.setState({current:1,search:'false'},()=>this.page_check())
	}
 post=(data="")=> {
	  data= "pageNow="+this.state.current+"&pageNum="+this.state.pagesize
	 const req = request( 'http://localhost:8088/email/select/all', {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'POST',
		 body: data,
	 }).then((data) => {
		console.log(data.data)
		this.setState({
			loading: false,
		});
		if(data.data.code=='0001'){
			console.log('查询错误')
			alert('数据库查询错误')
		}else{
			this.setState({
				loading: false,
				data:  data.data.date.list,
				total: data.data.date.rowAll,
			 })
		}
		});
 }
 post_search=(data="")=> {
	 data = "pageNow="+this.state.current+"&pageNum="+this.state.pagesize+"&"+this.state.search_data
	const req = request( 'http://localhost:8088/email/select/all', {
		headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		method: 'POST',
		body: data,
	}).then((data) => {
	 console.log(data.data.date)
	 this.setState({
		 loading: false,
	 });
	 if(data.data.code=='0001'){
		 console.log('查询错误')
		 alert('数据库查询错误')
	 }else{
		 this.setState({
			 data:  data.data.date.list,
			 total: data.data.date.rowAll,
		 });
	 }
	 console.log(data.data.list)
 });
 }
	componentDidMount() {
		 this.post();
 }

render(){
	return(<div>
			<Search field={Columns} foo={msg=>this.Search(msg)}
			foo1={()=>this.Search_clear()}/>
		 	<Table
			 rowSelection={rowSelection}
			 columns={Columns}
			 dataSource={this.state.data}
			 loading={this.state.loading}
			 pagination={false}/>

			<Page
			total={this.state.total}
			current={this.state.current}
			defaultPageSize={this.state.pagesize}
			Pagination_foo={msg=>this.Pagination(msg)}
			/>
		</div>
	)
}
}
// function mapStateToProps(state) {
// 	const {pageNow, pageNum } = state.table;
// }
export default Tables;
// export default connect(maoStateToProps)(Tables)
