import React from 'react';
import { connect } from 'dva';
import LoginComponent from '../components/Login/Login';
import { Row, Col } from 'antd';

function Login() {
  return (
      <div>
			<Row style={{height:"200px"}}></Row>
			<Row type="flex" justify="center">
				<Col span={5}><LoginComponent /></Col>
			</Row>
      </div>

  );
}

export default connect()(Login);
