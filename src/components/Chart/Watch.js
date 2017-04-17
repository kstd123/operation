import { Table, Icon , Pagination, Button, Row, Col } from 'antd';
import React from 'react';
import request from '../../utils/request';
const list = [{"sh":'001','corpname':'yonyou','one':'001','two':'301'}]
class Watch extends React.Component{
  render() {
    const Columns = [
       {
         title:"税号",
         dataIndex:"sh",
         key:"conditionFpqqlsh"
       },{
         title:"组织名称",
         dataIndex:"corpname",
         key:"conditionAddress"
       },
       {
         title:"一月",
         dataIndex: "one",
         key:"action"
       },
       {
         title:"二月",
         dataIndex: "two",
         key:"action1"
       },{
         title:"三月",
         dataIndex: "three",
         key:"action2"
       },{
         title:"四月",
         dataIndex: "four",
         key:"action3"
       },{
         title:"五月",
         dataIndex: "f",
         key:"action4"
       },{
         title:"结果",
         dataIndex: "result",
         key:"conditionResult"
       }
     ]

	return(
    <div>
      <Row>
      <Col span={6}></Col>
      <Col span={12}>
  		 	<Table
          size="small"
          bordered
  			 columns={Columns}
  			 dataSource={list}
  			 pagination={false}/>
         </Col>
         <Col span={6}></Col>
       </Row>
    </div>
	)
}
}
export default Watch;
