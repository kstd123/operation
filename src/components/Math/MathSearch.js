import { Form, Row, Col, Input, Button, Icon } from 'antd';
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
		let arr =[]
		for(let i in info){
			if(info[i]===void(0)){}
			else {
				arr.push(i+"="+info[i])
			}
		}
		if(arr.length==0){
			console.log('查询条件为空')
			alert("输入查询条件")
		}else{
			let data = arr.join("&");
			this.props.foo(data);
			console.log(data)
			arr.length=0;
		}

	}
	handleReset = () => {//重置
		this.props.form.resetFields();
		this.props.foo1();
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 10 },
			wrapperCol: { span: 14 },
		};
		const children = [];
		const field = [{
	 		 title: "公司名称",
	 		 key:"corpname"
		 	 },{
				 title:"参数名称",
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
		return(
			<Form
				className="ant-advanced-search-form"
				onSubmit={this.handleSearch}
			>
				<Row>
			{children}
					<Col span={8} style={{ textAlign: 'right' }}>
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
