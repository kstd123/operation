import { Table, Icon , Pagination, Button, Row, Col } from 'antd';
import React from 'react';
import request from '../../utils/request';
import Card from './Card';
import Chart from './Chart'

class Watch extends React.Component{
  state={
    data:[30,40,18,90],
    x_data:[1,2,3,4,5]
  }
  render() {
	return(
    <div>
    <Row>
      <Card/>
    </Row>
       <Row>
          <Col span={12}><Chart data={this.state.data} x_data={this.state.x_data}/></Col>
          <Col span={12}><Chart data={this.state.data} x_data={this.state.x_data}/></Col>
        </Row>
    </div>
	)
}
}
export default Watch;
