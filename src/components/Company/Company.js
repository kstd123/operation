import { Table, Icon,Pagination, Button } from 'antd';
import React from 'react';
import { connect } from 'dva';
import request from '../../utils/request';
import Search from './CompanySearch'
import Page from '../Page'
import File_Btn from './File_Btn'
import * as _ from '../../Host';

class Company extends React.Component{

	state = {
		data: [],
		current: 1,
		pagesize: 10,
		total:99,
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
	file_upload(data) {
		// this.file_upload(data)
		console.log('上传成功回调')
		console.log(data)
	}
	post = (data = {
		}) => {
		data ="cp="+this.state.current+"&ls="+this.state.pagesize
		// let info = "col=corpname&kw=84"
	 const req = request(  _.HOST+'company/list?'+data, {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'GET',
	 })
	 .then((data) => {
		// console.log(data.data)
		for(let i in data.data.allCompanys){
			data.data.allCompanys[i].btrail=='N'?data.data.allCompanys[i].btrail="未开通" : data.data.allCompanys[i].btrail="已开通"
		}
		this.setState({
			loading: false,
			data: data.data.allCompanys,
			total: data.data.allRecorders
		});
	});
 	}
 post_search = (data = "") => {
	 data="?ls="+this.state.pagesize+"&cp="+this.state.current+"&"+this.state.search_data;
	 const req = request(  _.HOST+'company/list'+ data,
	 {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'GET',
	 }).then((data) => {
		 for(let i in data.data.allCompanys){
			 data.data.allCompanys[i].btrail=='Y'?data.data.allCompanys[i].btrail="已开通" : data.data.allCompanys[i].btrail="未开通"
		 }
		this.setState({
			loading: false,
			data: data.data.allCompanys,
			total: data.data.allRecorders
		});
	});
 }

	componentDidMount() {
	this.post();
	}

	render(){
		const Columns = [
			 { title:"公司名称",dataIndex:"corpname",key:"corpname",width:230, fixed:'left'},
			 { title:"公司编号",dataIndex:"corpcode",key:"corpcode"},
			 { title:"联系人",dataIndex:"contact",key:"contact"},
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
			 { title:"权限",dataIndex:"btrail",key:"btrail"},	{
						title:"操作",
						key:"action",
						fixed:'right',
						width:220,
						render:(text, record, index) => {
							return(
								<div key={index} >
									<File_Btn key={index} corpname={text.corpname} corpcode={text.corpcode} file={data=>{this.file_upload(data)}}/>
								</div>
							)
						}

					}
		 ]
		return(
			<div>
				<Search
				Arr={'company'}
				Columns={Columns}
				foo={msg=>this.Search(msg)}
				foo1={()=>this.Search_clear()}/>
			<Table
				columns={Columns}
				dataSource={this.state.data}
				loading={this.state.loading}
				pagination={false}
				scroll={{ x: 2500 }}
				loading={this.state.authority}
				rowKey='corpcode'
				/>
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
export default Company;
// export default connect(maoStateToProps)(Tables)
