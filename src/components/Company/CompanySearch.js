import { Form, Row, Col, Input, Button, Icon,Select } from 'antd';
import React from 'react';
const FormItem = Form.Item;
import request from '../../utils/request';
class MathSearch extends React.Component {
	state ={
		current: 1,
		pagesize: 6,
		data:[]
	}
	handleSearch = (e) => {//search事件组装查询条件
		this.setState({ loading:true })
		e.preventDefault();
		let info = {};
		console.log(e)
		this.props.form.validateFields((err,values) => {
			info = values//取出value
		});
		const arr =[]
		for(let i in info){
			if(info[i]===void(0)){}
			else {
				arr.push(i+"="+info[i])
			}
		}
		const data_search = arr.join("&");
		var new_data = "pageNow=1&pageNum=6&" + data_search;
		this.fetch(new_data)
		console.log(this.state.data)
		this.props.foo(this.state.data)
	}
	handleReset = () => {//重置
		this.props.form.resetFields();
	}
	fetch = (data = "") => {
		const req = request( 'http://localhost:8080/parameter/selectByCondition', {
			headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
			method: 'GET',
		}).then((data) => {
		 this.setState({
			 loading: false,
			 data:  data.data.list,
			 total: data.data.rowAll,
		 });
	 });
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
		for (let i = 0; i < field.length; i++) {
			children.push(
				<Col span={8} key={i}>
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
		console.log(temp[5].title)
		for (let i in temp){
			title_arr.push(
				<Option value={i}>{temp[i].title}</Option>
			)
		}
		return(
			<Form
				className="ant-advanced-search-form"
				onSubmit={this.handleSearch}
			>
				<Row>
					<Col span={4}></Col>
					<Col span={3}>
					<Select placeholder="Select a option and change input text above">
							{title_arr}
						</Select>
					</Col>
						{children}
					<Col span={5} style={{ textAlign: 'right' }}>
						<Button type="primary" htmlType="submit">Search</Button>
						<Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
							Clear
						</Button>
					</Col>
				</Row>
			</Form>
		)
	}
}
const Search = Form.create()(MathSearch);
export default Search;
