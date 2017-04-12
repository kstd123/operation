import { Table, Icon,Pagination, Button, Form, Row, Col, Input } from 'antd';
import React from 'react';
const FormItem = Form.Item;
import { connect } from 'dva';
import request from '../../utils/request';
import Mathmodal from './Mathmodal';
import MathSearch from './MathSearch';
import Page from '../Page'

const Columns = [
	 {
		 title:"编号",
		 dataIndex:"id",
		 key:"id"
	 },{
		 title:"编码",
		 dataIndex:"code",
		 key:"code"
	 },{
		 title:"参数名称",
		 dataIndex: "name",
		 key:"name",
	 },{
		 title:"公司id",
		 dataIndex: "corpid",
		 key:"corpid",
	 },{
		 title:"组织id",
		 dataIndex: "orgid",
		 key:"orgid",
	 },{
		 title:"层次",
		 dataIndex: "layer",
		 key:"layer",
	 },{
		 title:"数值",
		 dataIndex: "value",
		 key:"value",
	 },{
		 title:"名称",
		 dataIndex: "valueclass",
		 key:"valueclass",
	 },{
		 title: "公司名称",
		 dataIndex: "corpname",
		 key:"corpname"
	 },{
       title: '操作',
       key: 'operation',
       render: (text, record) => (
           <Mathmodal record={record} Columns={Columns}
					 foo2={ msg=>this.foo_modal(msg) } >
            <Button type="primary">修改</Button>
           </Mathmodal>
       ),
     },
 ]
class Tables extends React.Component{

	state = {
		data: [],
		loading: false,
		current: 1,
		pagesize: 10,
		total:18,
		search_data:"",
		search:'false'
	};

	Pagination(msg) {
		this.setState({ current:msg },()=>{this.page_check()})
	}
	Search(msg) {
		this.setState({ search:'true',search_data: msg,current: 1 },()=>{this.page_check()})
		console.log("search连接成功")
	}
	Search_clear() {
		this.setState({current:1,search:'false'},()=>this.page_check())
	}
	createHandler=()=>{
		this.post()
		console.log("createHandel!!!!!!!!!")
	}
	page_check(){
		if(this.state.search=='true'){
			this.post_search()
		}else{
			this.post()
		}
	}
	foo_modal(msg){
		this.post_modal(msg);
		console.log("修改了"+msg)
	}
 post = (data = "") => {
	 data = "pageNow="+this.state.current+"&pageNum="+this.state.pagesize
	this.setState({ search_data: data,loading:false })
	 const req = request( 'http://localhost:8088/parameter/selectByCondition', {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'POST',
		 body: data,
	 }).then((data) => {
		console.log(data.data)
		this.setState({
			loading: false,
			data:  data.data.data.list,
			total: data.data.data.rowAll,
		});
	});
 }
 post_search = (data = "") => {
	 data="pageNow="+this.state.current+"&pageNum="+this.state.pagesize +"&"+ this.state.search_data
	 const req = request( 'http://localhost:8088/parameter/selectByCondition', {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'POST',
		 body: data,
	 }).then((data) => {
		this.setState({
			loading: false,
		  data:  data.data.data.list,
		  total: data.data.data.rowAll,
		});
		console.log(data.data.list)
	});
 }
 post_modal = (data = "") => {
	 data="pageNow="+this.state.current+"&pageNum="+this.state.pagesize +"&"+ data
	 const req = request( 'http://localhost:3001/cas/v1/user/admin/password_failed/sendresetByMobile', {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'POST',
		 body: data,
	 }).then((data) => {
		console.log(data.data)
		this.setState({
		  data:  data.data.data.list,
		  total: data.data.data.rowAll,
		});
	});
 }
	componentDidMount() {
		 this.post();
 }

	render(){
		return(
			<div>
				<MathSearch field={Columns}
				foo={ msg=>this.Search(msg)}
				foo1={()=>this.Search_clear()}
				/>
				<Mathmodal
				record={{}}
				foo2={ msg=>this.foo_modal(msg) }>
					<Button type="primary">新增参数</Button>
				</Mathmodal>
			 	<Table
				 columns={Columns}
				 dataSource={this.state.data}
				 loading={this.state.loading}
				 pagination={false}/>
				<Page
				total={this.state.total}
				current={this.state.current}
				PageSize={this.state.pagesize}
				Pagination_foo={msg=>this.Pagination(msg)}/>
			</div>
		)
	}
}
// function mapStateToProps(state) {
// 	const {pageNow, pageNum } = state.table;
// }
export default Tables;
// export default connect(maoStateToProps)(Tables)
