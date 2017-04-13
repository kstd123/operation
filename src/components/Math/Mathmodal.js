import React, { Component } from 'react';
import { Modal, Form, Input,Button } from 'antd';
import request from '../../utils/request';
const FormItem = Form.Item;
class Mathmodal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
		this.props.foo();
  };

  okHandler = () => {
    const { onOk } = this.props;
		let msg = '';
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // onOk(values);
				const arr = []
				for(let i in values){
					if(values[i]!=void(0))
					 arr.push( i+"="+values[i] )
				}
				let data = arr.join("&");
				console.log(data)
				msg =data;
				// this.props.foo2(data);
        this.hideModelHandler();
      }
    });
		this.props.foo2(msg)
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
	  const { id,code,name,corpid,orgid,layer,value,valueclass,createtime,ts,corpname } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <Button type='primary' onClick={this.showModelHandler}>
          { children }
        </Button>
        <Modal
          title="新增参数"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
					key={this.props.key}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="编号"
            >
              {
                getFieldDecorator('id', {
                  initialValue: id,
                })(<Input  disabled={true}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="编码"
            >
              {
                getFieldDecorator('code', {
                  initialValue: code,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="参数名称"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
						<FormItem
							{...formItemLayout}
							label="公司id"
						>
							{
								getFieldDecorator('corpid', {
									initialValue: corpid,
								})(<Input />)
							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="组织id"
						>
							{
								getFieldDecorator('orgid', {
									initialValue: orgid,
								})(<Input />)
							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="层次"
						>
							{
								getFieldDecorator('layer', {
									initialValue: layer,
								})(<Input />)
							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="数值"
						>
							{
								getFieldDecorator('value', {
									initialValue: value,
								})(<Input />)
							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="名称"
						>
							{
								getFieldDecorator('valueclass', {
									initialValue: valueclass,
								})(<Input />)
							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="公司名称"
						>
							{
								getFieldDecorator('corpaname', {
									initialValue: corpname,
								})(<Input />)
							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="创建时间"
						>
							{
								getFieldDecorator('createtime', {
									initialValue: createtime,
								})(<Input />)
							}
						</FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(Mathmodal);
