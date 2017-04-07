import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class Mathmodal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,//设置对话框状态
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
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
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
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="编号"
            >
              {
                getFieldDecorator('id', {
                  initialValue: id,
                })(<Input />)
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
              label="名称"
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
						<FormItem
							{...formItemLayout}
							label="名称"
						>
							{
								getFieldDecorator('ts', {
									initialValue: ts,
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
