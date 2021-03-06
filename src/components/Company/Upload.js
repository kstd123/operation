import { Table, Icon,Pagination, Button, Row, Col, message } from 'antd';
import React from 'react';
import { connect } from 'dva';
import request from '../../utils/request';
import Search from './CompanySearch'
import Page from '../Page'
import Btn from '../Btn'
import File_Btn from './File_Btn'
import Modal from './Modal'
import style from '../style'
import * as _ from '../../Host';

const list = [
	{"id":"001","appid":"oopss","corpid":"123456"},
	{"id":"002","appid":"zzxx"},
	{"id":"003","appid":"mmkk"}
]
class Upload1 extends React.Component{

	state = {
		data: [],
		current: 1,
		pagesize: 10,
		total:99,
		search:'false',
		loading: true,
		authority:false,
		search_data:'',
		Btn_show:'false',
		Rows:'',
		btrail_color:''
	}
	row_onChange=(selectedRowKeys, selectedRows) => {
		selectedRowKeys=='' ? this.setState({ Btn_show: 'false',Rows:'' }) : this.setState({ Btn_show: 'true',Rows:selectedRowKeys })
		console.log('选中了'+selectedRowKeys)
	}
	//开通 授权
	kaitong(e) {
		console.log('开通成功')
		console.log(e)
	}
	batch(e) {
		console.log('批量授权了')
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
	enterLoading = ()=>{//开通权限
			this.setState({ authority: false })
			setTimeout(()=>{
				this.setstate({ authority: true })
			},2000)
		}
	updata(msg) {
		console.log('修改成功')
	}
	post = (data = {
		}) => {
		data ="cp="+this.state.current+"&ls="+this.state.pagesize
		// let info = "col=corpname&kw=84"
	 const req = request(  _.HOST+'pages/appregister?'+data, {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'GET',
	 })
	 .then((data) => {
		console.log(data.data)
		this.setState({
			loading: false,
			data: data.data.allAppregisters,
			total: data.data.allRecorders
		});
	});
		}
	post_search = (data = "") => {
	 data="?ls="+this.state.pagesize+"&cp="+this.state.current+"&"+this.state.search_data;
	 const req = request(  _.HOST+'pages/appregister'+ data,
	 {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'GET',
	 }).then((data) => {
		this.setState({
			loading: false,
			data: data.data.allAppregisters,
			total: data.data.allRecorders
		});
	});
		}
	componentDidMount() {
		this.post();
	}
	render(){
		const Columns = [
			 { title:"id", dataIndex:"id", key:"id", className:'corpname'},
			 { title:"应用id", dataIndex:"appid", key:"appid"},
			 { title:"公司id", dataIndex:"corpid", key:"corpid"},
			 { title:"公钥", dataIndex:"publickey", key:"publickey"},
			 { title:"密钥", dataIndex:"signkey", key:"signkey"},
			 { title:"无效", dataIndex:"invaliddate", key:"invaliddate"},
			 { title:"最大值", dataIndex:"maxnum", key:"maxnum"},
			 { title:"核实类", dataIndex:"verifyclass", key:"verifyclass"},
			 { title:"创建时间", dataIndex:"createtime", key:"createtime"},
			 { title:"时间", dataIndex:"ts", key:"ts"},
			 {
 					title: '操作',
 					key: 'operation',
 					render: (text, record) => (
 							<Modal record={record} Columns={Columns}
 							foo={ msg=>this.updata(msg) }children="查看证书"/>
 					),
 				},
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
		 const props = {
			  name: 'file',
			  action: '//jsonplaceholder.typicode.com/posts/',
			  headers: {
			    authorization: 'authorization-text',
			  },
			  onChange(info) {
			    if (info.file.status !== 'uploading') {
			      console.log(info.file, info.fileList);
			    }
			    if (info.file.status === 'done') {
			      message.success(`${info.file.name} file uploaded successfully`);
			    } else if (info.file.status === 'error') {
			      message.error(`${info.file.name} file upload failed.`);
			    }
			  },
		};
		return(
			<div>
				<Search
					Arr={'upload'}
					Columns={Columns}
					foo={msg=>this.Search(msg)}
					foo1={()=>this.Search_clear()}
				/>

				<Table
					size='small'
					columns={Columns}
					dataSource={this.state.data}
					loading={this.state.loading}
					pagination={false}
					loading={this.state.authority}
					onclick={this.enterLoading}
					rowKey={record => record.id}
				/>
				<style/>
				<style/>
				<Page
					showQuickJumper
					total={this.state.total}
					current={this.state.current}
					pagesize={this.state.pagesize}
					Pagination_foo={msg=>this.Pagination(msg)}
				/>
			</div>
		)
	}
}

export default Upload1;
