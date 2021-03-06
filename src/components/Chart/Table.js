import { Table, Icon,Pagination, Button } from 'antd';
import React from 'react';
import { connect } from 'dva';
import request from '../../utils/request';
import Search from '../Search';
import Page from '../Page';
import Btn from '../Btn'
import Btn_batch from '../Btn_batch'
const list =[
	{'fpqqlsh':'123','result':'000'},
	{'fpqqlsh':'123','result':'000'},
	{'fpqqlsh':'123','result':'000'},
	{'fpqqlsh':'123','result':'000'},
	{'fpqqlsh':'123','result':'000'},
	{'fpqqlsh':'123','result':'000'},
	{'fpqqlsh':'123','result':'000'},
	{'fpqqlsh':'123','result':'000'},
]
class Tables extends React.Component{
	state = {
		data: [],
		current: 1,
		pagesize: 10,
		total:99,
		search:'false',
		// loading: true,
		authority:false,
		search_data:'',
		Btn_show:'false',
		Rows:''
	};
	row_onChange=(selectedRowKeys, selectedRows) => {
		selectedRowKeys=='' ? this.setState({ Btn_show: 'false',Rows:'' }) : this.setState({ Btn_show: 'true',Rows:selectedRowKeys })
		console.log('选中了'+selectedRowKeys)
	}
	//重发回调
	chongfa(e) {
		console.log('重发成功')
		console.log(e.id)
	}
	batch(e) {
		console.log('批量重发了')
		let res = this.state.data;
		let arr = [];
		for(let i in e){
			if(res[e[i]]!=void(0))
			arr.push(res[e[i]].id)}
		console.log(arr.join(','))
	}
	//分页 搜索
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
	 const req = request(  _.HOST+'email/select/all', {
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
	const req = request(  _.HOST+'email/select/all', {
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
		 },{
	 		 title:"操作",
	 		 key:"action",
	 		 render:(record) => (
	 					<span><Btn show={'true'} name={'重发'}foo={()=>this.chongfa(record)}/></span>
	 		 )
	 	 }
	 ]
	const rowSelection = {
		 onChange: this.row_onChange,
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
	return(
		 	<Table
			 rowSelection={rowSelection}
			 columns={Columns}
			 dataSource={list}
			 loading={this.state.loading}
			 pagination={false}/>
	)
}
}
export default Tables;
