import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'dva/router';
import './Login.css';
const FormItem = Form.Item;
class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
	        <FormItem>
					<Row>
					<Col span={4}></Col>
						<Col span={8}>
			          {getFieldDecorator('remember', {
			            valuePropName: 'checked',
			            initialValue: true,
			          })(
			            <Checkbox>记住密码</Checkbox>
			          )}
							</Col>
							<Col span={8}>
			          <a className="login-form-forgot">忘记密码</a>
							</Col>
							<Col span={4}></Col>
						</Row>
						<Row>
						<Col span={8}></Col>
						<Col span={8}>
							<Button type="primary" htmlType="submit" className="login-form-button" >
								<Link to="/index">登陆</Link>
							</Button>
						</Col>
						<Col span={8}></Col>
						</Row>
						<Row>
							<Col span={7}></Col>
							<Col span={10}>
								 没有帐号?<a>注册</a>
							</Col>
							<Col span={7}></Col>
						</Row>
	        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Login);//组建传入到From.create()

export default WrappedNormalLoginForm;
