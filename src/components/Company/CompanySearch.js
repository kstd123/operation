import { Form, Row, Col, Input, Button, Icon, Select, Alert } from 'antd';
import React from 'react';
const FormItem = Form.Item;
import request from '../../utils/request';
const Arr_company = ['corpname', 'corpcode', 'contact', 'corpaddress', 'corpphone', 'corpemail']
const Arr_upload = ['id', 'appid', 'corpid', 'files' ]
const Arr_authority = ['corpname', 'corpcode', 'contact', 'corpaddress', 'corpphone', 'corpemail', 'businesslicense' ]
let key = '';
let message = '';
class MathSearch extends React.Component {
	state ={
		current: 1,
		pagesize: 10,
		message:''
	}
	handleSearch = (e) => {
		//search事件组装查询条件
		e.preventDefault();
		this.info_rest();
		console.log(this.props.Arr)
		let value = {};
		this.props.form.validateFields((err,info) => {
			value = info.name//取出value{name:"123"}
		});
		let data = ""//初始化查询条件
		if(key==void(0)||value==void(0)||value==""){
			this.setState({message:
				<Alert
				 description="查询值或条件不能为空"
				 type="warning"
				 showIcon
			 />
			})
		} else {
			if(this.props.Arr == 'upload') {
				data = "&col=" + Arr_upload[key] + "&kw=" + value;
			 } else if(this.props.Arr == 'company'){
				data = "&col=" + Arr_company[key] + "&kw=" + value;
			} else {
				data = "&col=" + Arr_authority[key] + "&kw=" + value
			}
			this.props.foo(data)//传出查询条件
		}
		console.log(this.state.Arr)
		console.log(data)
	}
	handleReset = () => {//重置
		this.props.form.resetFields();
		// key=''
		this.props.foo1();
		this.info_rest()
	}
	select_handleChange(e) {//选择器变化回调
		console.log(e);
		key = e
		this.info_rest()
	}
	info_rest(){
		this.state.message != '' ? this.setState({ message:'' }) : console.log('搜索正常')
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 10 },
			wrapperCol: { span: 14 },
		};
		const children = [];
		const field = [{
				 title:"查询值",
				 key:"name",
	 		}];
		for (let i = 0; i < field.length  ; i++) {
			children.push(
				<Col span={8}>
					<FormItem {...formItemLayout} label={field[i].title}>
						{getFieldDecorator(field[i].key)(
							<Input placeholder="键入以搜索" />
						)}
					</FormItem>
				</Col>
			);
		}
		const title_arr =[]
		let temp = this.props.Columns;
		for (let i in temp){
			title_arr.push(
				<Option value={i} key={i+'1'}>{temp[i].title}</Option>
			)
		}
		// console.log(title_arr.length-3)
		title_arr.length = title_arr.length-8
		return(

			<Form
				className="ant-advanced-search-form"
				onSubmit={this.handleSearch}
			>
			{this.state.message}
				<Row>
					<Col span={3}>
					<Select placeholder="查询条件"allowClear onChange={this.select_handleChange}>
							{title_arr}
						</Select>
					</Col>
						{children}
					<Col span={5} style={{ textAlign: 'right' }}>
						<Button type="primary" htmlType="submit">搜索</Button>
						<Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
							清空
						</Button>
					</Col>
				</Row>
			</Form>
		)
	}
}
const Search = Form.create()(MathSearch);
export default Search;
