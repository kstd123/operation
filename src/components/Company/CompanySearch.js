import { Form, Row, Col, Input, Button, Icon,Select } from 'antd';
import React from 'react';
const FormItem = Form.Item;
import request from '../../utils/request';
const Arr=['corpname','corpcode','contact','corpaddress','corpphone','corpemail']
let key = '';
class MathSearch extends React.Component {
	state ={
		current: 1,
		pagesize: 10,
		loading:false,
		// key:"xxx",
	}
	handleSearch = (e) => {//search事件组装查询条件
		this.setState({ loading:true })
		e.preventDefault();
		let value = {};
		this.props.form.validateFields((err,info) => {
			value = info.name//取出value{name:"123"}
		});
		// let key = this.state.key
		let data = "&col="+Arr[key]+"&kw="+value;
		console.log(this.state.key)
		console.log(data)
		this.props.foo(data)//传出查询条件
	}
	handleReset = () => {//重置
		this.props.form.resetFields();
		key=''
		this.props.foo1();
	}
	select_handleChange(e) {
		console.log(e)
		key=e
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
		for (let i in temp){
			title_arr.push(
				<Option value={i}>{temp[i].title}</Option>
			)
		}
		// console.log(title_arr.length-3)
		title_arr.length = title_arr.length-8
		return(
			<Form
				className="ant-advanced-search-form"
				onSubmit={this.handleSearch}
			>
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
