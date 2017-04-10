import { Table, Icon,Pagination, Button, Form, Row, Col, Input } from 'antd';
import React from 'react';
const FormItem = Form.Item;
import { connect } from 'dva';
import request from '../../utils/request';
import Mathmodal from './Mathmodal';
import MathSearch from './MathSearch';
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
		 title:"创建时间",
		 dataIndex: "createtime",
		 key:"createtime",
	 },{
		 title:"名称",
		 dataIndex: "ts",
		 key:"ts",
	 },  {
       title: 'Operation',
       key: 'operation',
       render: (text, record) => (
           <Mathmodal record={record} Columns={Columns} >
            <Button type="primary">修改</Button>
           </Mathmodal>
       ),
     },
 ]
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
	createHandler=()=>{
		this.post_test()
		console.log("createHandel!!!!!!!!!")
	}
	transferMsg(msg) {//子组件状态
		this.setState({
	      data:msg
	    })
			console.log("search连接成功")
  }
	modalpost(msg1) {
		this.setState({data:msg})
		cosole.log("modal链接成功")
	}
 post_test = (data = "") => {
	 data = "pageNow="+this.state.current+"&pageNum="+this.state.pagesize
	this.setState({ search_data: data,loading:true })
	 const req = request( 'http://localhost:3001/cas/v1/user/admin/password_failed/sendresetByMobile', {
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

	componentDidMount() {
		 this.post_test();
 }

	render(){
		return(
			<div>
				<MathSearch field={Columns} foo={ msg1=>this.transferMsg(msg1) }/>
				<Mathmodal record={{}} onOk={this.createHandler} foo={ msg=>this.modalpost(msg) }>
					<Button type="primary">新增参数</Button>
				</Mathmodal>
			 	<Table
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
