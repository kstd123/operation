import { Table, Icon,Pagination, Button } from 'antd';
import React from 'react';
import { connect } from 'dva';
import request from '../../utils/request';
import Search from '../Search'


class Button1 extends React.Component {
	state = {
		Btn_loading:false,
		name: '开通'
	}
	enterLoading = ()=> {
		let self =this; 
		this.setState({ Btn_loading: true })
		setTimeout(()=>{
			self.setState({ Btn_loading: false, name:'已开通' })
		},2000)
	}
		render() {
			return(
				<Button type="primary" loading={this.state.Btn_loading} onClick={this.enterLoading}>{this.state.name}</Button>
			)
		}
}
const Columns = [
	 { title:"公司名称",dataIndex:"corpname",key:"corpname",width:230, fixed:'left'},
	 { title:"名称",dataIndex:"corpcode",key:"corpcode"},
	 { title:"公司名称",dataIndex:"contact",key:"contact"},
	 { title:"公司地址",dataIndex:"corpaddress",key:"corpaddress"},
	 { title:"公司电话",dataIndex:"corpphone",key:"corpphone"},
	 { title:"公司邮箱",dataIndex:"corpemail",key:"corpemail"},
	 { title:"营业执照",dataIndex:"businesslicense",key:"businesslicense"},
	 { title:"公司名称",dataIndex:"orgcode",key:"orgcode"},
	 { title:"税号",dataIndex:"taxid",key:"taxid"},
	 { title:"创建时间",dataIndex:"createtime",key:"createtime"},
	 { title:"公司类型",dataIndex:"corptype",key:"corptype"},
	 { title:"数据源",dataIndex:"datasource",key:"datasource"},
	 { title:"时间",dataIndex:"ts",key:"ts"},
	 { title:"权限",dataIndex:"btrail",key:"btrail"},
	{
		 title:"操作",
		 key:"action",
		 fixed:'right',
		 width:100,
		 render:(record) => (
				<span><Button1/>{record.name}</span>
			 
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

class Company extends React.Component{

	state = {
		data: [],
		pagination: {},
		loading: true,
		current: 1,
		pagesize: 6,
		total:99,
		authority:false,
	};

	pageChange=(e)=>{
				this.setState({
					current: e
				}, ()=>{
						this.post_test();
					}
				)
	}
	enterLoading = ()=>{//开通权限
		this.setState({ authority: false })
		setTimeout(()=>{
			this.setstate({ authority: true })	
		},2000)
	}
	post_test = (params = {
		pageNow: this.state.current,
		pageNum: this.state.pagesize
		}) => {
		let data = "cp="+this.state.current+"&ls="+this.state.pagesize

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
			data:  data.data.allCompanys,
			total: data.data.allRecorders
		});
	});
 }
	componentDidMount() {
	this.post_test();
	}

	render(){
		return(<div>
				<Search field={Columns}/>
			<Table
				rowSelection={rowSelection}
				columns={Columns}
				dataSource={this.state.data}
				loading={this.state.loading}
				pagination={false}
				scroll={{ x: 2500 }}
				loading={this.state.authority}
				onclick={this.enterLoading}
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
export default Company;
// export default connect(maoStateToProps)(Tables)
