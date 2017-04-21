import { Form, Row, Col, Input, Button, Icon, Alert } from 'antd';
const FormItem = Form.Item;
import React from 'react';
import request from '../utils/request'
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
		loading: false,
		total: 1,
		message:''
  };
  handleSearch = (e) => {//search事件组装查询条件
		this.setState({ loading:true })
    e.preventDefault();//阻止刷新
		let info = {};
    this.props.form.validateFields((err, values) => {
			info = values//取出value
    });
		let arr =[];
		for(let i in info){
			if(info[i]==void(0)||info[i]==""){}//筛选有效值
			else {
				arr.push(i+"="+info[i])
			}
		}
		// console.log(info)
		if(arr.length==0){
			console.log("查询条件为空");
			this.setState({message:
				<Alert
				 description="查询值或条件不能为空"
				 type="warning"
				 showIcon
			 />
			})
		}else{
			this.setState({ message: '' })
			let data = arr.join("&");
			this.props.foo(data);
			console.log(data)
		}
  }
  handleReset = () => {//重置
    this.props.form.resetFields();
		this.props.foo1()
		this.state.message != '' ? this.setState({ message: '' }) : console.log('搜索正常')
  }
  toggle = () => {//展开搜索框
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };

    // To generate mock Form.Item
    const children = [];
    const field = this.props.field;
    for (let i = 0; i < field.length-1; i++) {
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

    const expand = this.state.expand;
    const shownCount = expand ? children.length : 3;
    const box = (children.length < 4) ? (<span></span>) : (<a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              高级搜索 <Icon type={expand ? 'up' : 'down'} />
  </a>);
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
			{this.state.message}
        <Row gutter={40}>
          {children.slice(0, shownCount)}
        </Row>
        <Row style={{ marginBottom:20 }}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空
            </Button>
           {box}
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm;
