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
		}else{
			let data_search = arr.join("&");
			var new_data = "pageNow=1&pageNum=6&" + data_search;
			this.post_test(new_data)//异步请求
			arr.length=0;
			console.log(arr)
		}

	}
	handleReset = () => {//重置
		this.props.form.resetFields();
	}
	post_test = (data = "") => {
		const req = request( 'http://localhost:3001/cas/v1/user/admin/password/sendresetByMobile', {
			headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
			method: 'POST',
			body: data,
		}).then((data) => {
		 this.setState({
			 loading: false,
			//  data:  data.data.list,
			//  total: data.data.rowAll,
		 });
		 console.log(data.data.list)
		 this.props.foo(data.data.list)
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
