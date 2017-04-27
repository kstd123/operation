import { Table, Icon,Pagination, Button, Row, Col, message } from 'antd';
import React from 'react';
import { connect } from 'dva';
import request from '../../utils/request';
import Search from './CompanySearch'
import Page from '../Page'
import Btn from '../Btn'
import Btn_batch from '../Btn_batch'
import  './Authority.css'
import * as _ from '../../Host';

const list = [
		{'corpname':'zzz','corpid':'123','btrail':'Y','key':'0'},
		{'corpname':'mmm','corpid':'000','btrail':'Y','key':'1'},
		{'corpname':'mmm','corpid':'000','btrail':'N','key':'2'},
		{'corpname':'mmm','corpid':'000','btrail':'Y','key':'3'},
		{'corpname':'mmm','corpid':'000','btrail':'Y','key':'4'},
		{'corpname':'mmm','corpid':'000','btrail':'Y','key':'5'},
		{'corpname':'mmm','corpid':'000','btrail':'N','key':'6'},
		{'corpname':'mmm','corpid':'000','btrail':'N','key':'7'},
		{'corpname':'mmm','corpid':'000','btrail':'Y','key':'8'},
		{'corpname':'mmm','corpid':'000','btrail':'N','key':'91'},
		{'corpname':'mmm','corpid':'000','btrail':'N','key':'29'},
		{'corpname':'mmm','corpid':'000','btrail':'N','key':'93'},
		{'corpname':'mmm','corpid':'000','btrail':'N','key':'94'},
	]

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
		Btn_show:'false',
		status:'false',//按钮状态
		Rows:'',
		btrail_color:''
	}
	row_onChange=(selectedRowKeys, selectedRows) => {
		selectedRowKeys=='' ? this.setState({ Btn_show: 'false',Rows:'' }) : this.setState({ Btn_show: 'true',Rows:selectedRowKeys })
		console.log('选中了'+selectedRowKeys)
	}
	//开通 授权
	kaitong(e) {
		this._open(e.corpid)
		this.setState({ status_kaitong:'true' })
	}
	shouquan(e) {
		// console.log('授权成功')
		// console.log(e)
		this.authority_batch(e.corpid)
		this.setState({ status_shouquan: 'true' })
	}
	batch(e) {
		console.log('批量授权了')
		const res = this.state.data;
		// const res = list;
		let arr = [];
		for(let i in e){
		if(res[e[i]] != void(0))
		arr.push(res[e[i]].corpid)
		}
		console.log(arr.join(","))
		const data = arr.join(',')
		console.log(data)
		this.authority_batch(data)
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
	post = (data = {
		}) => {
		data ="cp="+this.state.current+"&ls="+this.state.pagesize
		// let info = "col=corpname&kw=84"
	 const req = request(  _.HOST+'company/listNoOpen?'+data, {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'GET',
	 })
	 .then((data) => {
		console.log(data.data)
		for(let i in data.data.allCompanys){
			data.data.allCompanys[i].btrail=='N'?data.data.allCompanys[i].btrail="已开通" : data.data.allCompanys[i].btrail="未开通"
		}
		this.setState({
			loading: false,
			data: data.data.allCompanys,
			total: data.data.allRecorders
		});
	});
	}
	post_search = (data = "") => {
		for(let i in list){
			list[i].btrail=='Y'?list[i].btrail="已开通" : list[i].btrail="未开通"
		}
	 data="?ls="+this.state.pagesize+"&cp="+this.state.current+"&"+this.state.search_data;
	 const req = request(  _.HOST+'company/listNoOpen'+ data,
	 {
		 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		 method: 'GET',
	 }).then((data) => {
		this.setState({
			loading: false,
			data: data.data.allCompanys,
			total: data.data.allRecorders
		});
	});
	}

	authority_batch(data){
			const req = request( _.HOST+'company/authorize',{
					 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
					 method: 'POST',
					 body:'ids='+data
				 }).then((data) => {
					data.data.result.code == '0000' ? message.success(data.data.result.msg) : message.error(data.data.result.msg+'  状态码：'+data.data.result.code)
						this.post()
				 })
		}
		 _open(data){
			 const req = request( _.HOST+'company/open',{
				  headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
					method: 'POST',
					body:'corpid='+data
				}).then((data) => {
					data.data.result.code == '0000' ? message.success(data.data.result.msg+'。。') : message.error(data.data.result.msg+'  状态码：'+data.data.result.code)
						this.post();
				  })
				}
	componentDidMount() {
		this.post();
	}
	render(){
		const Columns = [
			 { title:"公司名称", dataIndex:"corpname", key:"corpname", width:230, fixed:'left', className:'corpname'},
			 { title:"名称", dataIndex:"corpcode", key:"corpcode"},
			 { title:"联系人", dataIndex:"contact", key:"contact"},
			 { title:"公司地址", dataIndex:"corpaddress", key:"corpaddress"},
			 { title:"公司电话", dataIndex:"corpphone", key:"corpphone"},
			 { title:"公司邮箱", dataIndex:"corpemail", key:"corpemail"},
			 { title:"营业执照", dataIndex:"businesslicense", key:"businesslicense"},
			 { title:"公司名称", dataIndex:"orgcode", key:"orgcode"},
			 { title:"税号", dataIndex:"taxid", key:"taxid"},
			 { title:"创建时间", dataIndex:"createtime", key:"createtime"},
			 { title:"公司类型", dataIndex:"corptype", key:"corptype"},
			 { title:"数据源", dataIndex:"datasource", key:"datasource"},
			 { title:"时间", dataIndex:"ts", key:"ts"},
			 { title:"权限", dataIndex:"btrail", key:"btrail", className:"btrail_Y"},
			{
				 title:"操作",
				 key:"action",
				 fixed:'right',
				 width:220,
				 render:(record) => (
					 	<div>
							<span>
								<Btn
								show={'true'}
								name={'开通'}
							  foo={()=>this.kaitong(record)}
								status={this.state.status_kaitong}
								/>
							</span>
							<span>
								<Btn
								show={'true'}
								name={'授权'}
								foo={()=>this.shouquan(record)}
								status={this.state.status_shouquan}/>
							</span>
						</div>
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
			<div>
				<Row>
					<Col span={5}>
						<Btn_batch
						name={'批量授权'}
						status={this.state.status}
						show={this.state.Btn_show}
						foo={()=>this.batch(this.state.Rows)}/>
					</Col>
					<Col span={19}>
						<Search
							Columns={Columns}
							foo={msg=>this.Search(msg)}
							foo1={()=>this.Search_clear()}
							/>
					</Col>
					</Row>
				<Table
					rowSelection={rowSelection}
					columns={Columns}
					dataSource={this.state.data}
					loading={this.state.loading}
					pagination={false}
					scroll={{ x: 2500 }}
					loading={this.state.authority}
					onclick={this.enterLoading}
					rowKey='key'

				/>
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


// function mapStateToProps(state) {
// 	const {pageNow, pageNum } = state.table;
// }
export default Company;
// export default connect(maoStateToProps)(Tables)
