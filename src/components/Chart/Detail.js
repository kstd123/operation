import React from 'react';
import { Row, Col } from 'antd';
import request from '../../utils/request';
import Chart from './Chart'
import Search from './Search'
import Card from './Card'
let company = [
  {"corpname":'yonyou',"corpid":"01"},
  {"corpname":'yonyou2',"corpid":"02"},
  {"corpname":'yonyou3',"corpid":"03"}
]
let mock_data = {"code":"0000","datas":[
                    {"invqty":24,"month":"01"},
                    {"invqty":31,"month":"02"},
                    {"invqty":109,"month":"03"},
                    {"invqty":117,"month":"04"},
                    {"invqty":0,"month":"05"},
                    {"invqty":0,"month":"06"},
                    {"invqty":0,"month":"07"},
                    {"invqty":0,"month":"08"},
                    {"invqty":0,"month":"09"},
                    {"invqty":0,"month":"10"},
                    {"invqty":0,"month":"11"},
                    {"invqty":0,"month":"12"}
                ],"msg":"操作成功"}
class Detail extends React.Component {
	 state={
		 	data:[],
			company:[],
			x_data:[2,2,3,4,5,6,7,8,9,10,11,12],
	 }
   msg_search(msg){
     console.log(msg)
     console.log('success')
    //  this.get_data()
   }
	get_company () {
			const req = request( 'http://192.168.52.101:8080/report-web/find/getclient', {
 	      // 	 headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
  	Headers:{
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    },
 		 method: 'GET',
		 mode:'no-cors'
 	 })
 	 .then((data) => {
 		console.log(data.data.datas.corpname)
 		this.setState({
 			loading: false,
 			company: data.data.datas,
 		});
 	});
 	}
  get_data() {
    const req = request('http://192.168.101:8080/report-web',{
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      menthod:'GET',
      mode:'cors'
    }).then((data)=> {
      this.setState({
        data:data.data.datas,
      })
    })
  }
	company_change() {
    let children = []
		for(let i in company){
				children.push({"value":company[i].corpid,"label":company[i].corpname})
		}
		this.setState({
			company:children
		})
	}
  mock(){
    let data = [],
        x_data=[];
    for(let i in mock_data.datas){
      data.push(mock_data.datas[i].invqty)
      x_data.push(mock_data.datas[i].month)
    }
    this.setState({
      data:data,
      x_data:x_data
    })
  }
componentDidMount() {
	// this.get_company();
	this.company_change()
  this.mock()
}
	 render() {
		 const month = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
		 return(
       <div>
       <Row>
         <Card/>
       </Row>
       <Row>
        <Search
        children={this.state.company}
         foo={ (msg)=>this.msg_search(msg) }/>
       </Row>
         <Row >
           <Col span={12}><Chart data={this.state.data} x_data={this.state.x_data}/></Col>
           <Col span={12}><Chart data={this.state.data} x_data={this.state.x_data}/></Col>
         </Row>
         <Row>
           <Col span={12}><Chart data={this.state.data} x_data={this.state.x_data}/></Col>
           <Col span={12}><Chart data={this.state.data} x_data={this.state.x_data}/></Col>
         </Row>
       </div>
		 )
	 }
 }
 export default Detail
