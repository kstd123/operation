import { Table, Icon, Pagination, Button, Row, Col, message } from 'antd';
import React from 'react';
import { connect } from 'dva';
import request from '../../utils/request';
import Search from '../Search'
import Page from '../Page'
import Btn from '../Btn'
import Btn_batch from '../Btn_batch'
import * as _ from '../../Host';

 class Sms extends React.Component{
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
	row_onChange=(selectedRowKeys, selectedRows) => {
		selectedRowKeys=='' ? this.setState({ Btn_show: 'false',Rows:'' }) : this.setState({ Btn_show: 'true',Rows:selectedRowKeys })
		console.log('选中了'+selectedRowKeys)
	}
	//重发回调
  chongfa(e) {
		console.log('重发成功')
		console.log(e.fpqqlsh)
		let data = 'fpqqlshs=' + e.fpqqlsh
		this.post_chongfa(data)
	}
	batch(e) {
		console.log('批量重发了')
		let res = this.state.data;
		let arr = [];
		for(let i in e){
			if(res[e[i]]!=void(0))
			arr.push(res[e[i]].fpqqlsh)
		}
			let data = 'fpqqlshs=' + arr.join(',');
			this.post_chongfa(data)
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
 	 const req = request( _.HOST +'sms/select/all', {
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
   	const req = request( _.HOST +'sms/select/all', {
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
  post_chongfa=(data)=>{
       const req = request( _.HOST +'sms/resend', {
       headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
       method: 'POST',
       body: data,
     }).then((data) =>{
       console.log(data.data.msg)
       data.data.code == '0000'? message.success('重发成功') : message.error(data.data.msg +'  状态码:'+data.data.code );
     })
  }
  componentDidMount() {
     this.post();
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
	 			key:"conditionResult"
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
       // nsole.log(record, selected, selectedRows);
	 	 },
	 	 onSelectAll: (selected, selectedRows, changeRows) => {
       // nsole.log(selected, selectedRows, changeRows);
	 	 },
	 	 getCheckboxProps: record => ({
	 		 disabled: record.name === 'Disabled User',    // Column configuration not to be checked
	 	 }),
	  };
 	return(<div>
    <Row>
      <Col span='2'>
			   <Btn_batch name={'批量重发'} show={this.state.Btn_show} foo={()=>this.batch(this.state.Rows)}/>
      </Col>
      <Col span='22'>
        <Search field={Columns} foo={msg=>this.Search(msg)}
 			    foo1={()=>this.Search_clear()}/>
      </Col>
      </Row>
 		 	<Table
 			 rowSelection={rowSelection}
 			 columns={Columns}
 			 dataSource={this.state.data}
 			 loading={this.state.loading}
 			 pagination={false}/>

 			<Page
 			total={this.state.total}
 			current={this.state.current}
 			pagesize={this.state.pagesize}
 			Pagination_foo={msg=>this.Pagination(msg)}
 			/>
 		</div>
 	)
 }
 }
// function mapStateToProps(state) {
// 	const {pageNow, pageNum } = state.table;
// }
export default Sms;
// export default connect(maoStateToProps)(Tables)
