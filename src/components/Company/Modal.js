import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col } from 'antd';
import request from '../../utils/request';
import File_Btn from './File_Btn'
const FormItem = Form.Item;
class Mathmodal extends React.Component {
  state = {
    visible: false,
    loading: false
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    this.setState({ loading: false, visible: false });
  }
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
	  const { id, appid, corpid, publickey, signkey, invaliddate, maxnum, verifyclass, createtime, ts } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },

    };
    const uploadLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    }
    return (
      <span>
        <Button type='primary' onClick={this.showModal}>
          { children }
        </Button>
        <Modal
          title="证书信息"
          visible={this.state.visible}
					key={this.props.key}
          closable={false}
          footer={[
           <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
             确认
           </Button>,
         ]}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="id"
            >
              {

                getFieldDecorator('id', {
                  initialValue: id,
                })(<Input disabled={true}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="应用id"
            >
              {
                getFieldDecorator('appid', {
                  initialValue: appid,
                })(<Input disabled={true}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="公司id"
            >
              {
                getFieldDecorator('corpid', {
                  initialValue: corpid,
                })(<Input disabled={true}/>)
              }
            </FormItem>
						<FormItem
							{...formItemLayout}
							label="公钥"
						>
							{
								getFieldDecorator('publickey', {
									initialValue: publickey,
								})(<Input disabled={true}/>)
							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="私钥"
						>
							{
								getFieldDecorator('signkey', {
									initialValue: signkey,
								})(<Input disabled={true}/>)
							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="无效"
						>
							{
								getFieldDecorator('invaliddate', {
									initialValue: invaliddate,
								})(<Input disabled={true}/>)
							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="最大值"
						>
							{
								getFieldDecorator('maxnum', {
									initialValue: maxnum,
								})(<Input disabled={true}/>)
							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="核实类"
						>
							{
								getFieldDecorator('verifyclass', {
									initialValue: verifyclass,
								})(<Input disabled={true}/>)
							}
						</FormItem>
            <FormItem
							{...formItemLayout}
							label="创建时间"
						>
							{
								getFieldDecorator('createtime', {
									initialValue: createtime,
								})(<Input disabled={true}/>)
							}
						</FormItem>
            <FormItem
							{...formItemLayout}
							label="时间"
						>
							{
								getFieldDecorator('ts', {
									initialValue: ts,
								})(<Input disabled={true}/>)
							}
						</FormItem>
            <Row>
            <Col span={10}></Col>
            <FormItem
            >

            </FormItem></Row>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(Mathmodal);
