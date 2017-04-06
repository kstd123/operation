import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
import React from 'react';
import request from '../utils/request'
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
		loading: false,
		data:  [123,2334],
		total: 1,
  };

  handleSearch = (e) => {//search事件组装查询条件
		this.setState({ loading:true })
    e.preventDefault();
		let info = {};
    this.props.form.validateFields((err, values) => {
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
		console.log(data_search)
		var new_data = "pageNow=1&pageNum=6&" + data_search;
	 	this.post(new_data)
  }

  handleReset = () => {//重置
    this.props.form.resetFields();
  }

  toggle = () => {//展开搜索框
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }
	post=(data="")=> {
		const req = request( 'http://localhost:8080/email/select/all', {
			headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
			method: 'POST',
			body: data,
		}).then((data) => {
		 console.log(data.data)
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
        <Row gutter={40}>
          {children.slice(0, shownCount)}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Search</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
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
