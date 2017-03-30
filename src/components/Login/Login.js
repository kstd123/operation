import { Form, Icon, Input, Button, Checkbox, Row } from 'antd';
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
				<Row type="flex" justify="center">
	        <FormItem>
	          {getFieldDecorator('remember', {
	            valuePropName: 'checked',
	            initialValue: true,
	          })(
	            <Checkbox>记住密码</Checkbox>
	          )}
	          <a className="login-form-forgot">忘记密码</a>
						<br/>
	          <Button type="primary" htmlType="submit" className="login-form-button" style={{margin:"0 0 0 30px"}}>
	            <Link to="/index">登陆</Link>

	          </Button>
						<br/>
	          没有帐号？  <a>注册</a>
	        </FormItem>
				</Row>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Login);//组建传入到From.create()

export default WrappedNormalLoginForm;
