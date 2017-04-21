import React from 'react';
import { Row, Col, Table, Switch } from 'antd';
import request from '../../utils/request';
import Chart from './Chart';
import Search from './Search';
import Btn from '../Btn.js';
let company = [
  {"corpname":'yonyou',"corpid":"01"},
  {"corpname":'yonyou2',"corpid":"02"},
  {"corpname":'yonyou3',"corpid":"03"}
]

class Detail extends React.Component {
	 state={
			company:[],
			Btn_status:'false',
			year:2017,
			tax:[],
			corp:[],
			data_id:[],
			x_data_id:[],
      data:[],
      arr: [],
      _switch:'chart'
	 }
   msg_search(msg){
    //  console.log(msg)
		 if(msg.length==0){
       this.setState({Btn_status:'false'})
		 } else {
		 this.setState({
			 year: msg[1],
			 clintid: msg[2],
       Btn_status:'true'//导出报表
		 },()=>{
			 this.get_tax();
			 this.get_corp();
			 this.get_id();
		 })
	 	}
   }
   rowclick(r,i){//行点击时间切换图表
    this.setState({
        data_2: this.state.data_id[r.key],
        x_data_2: this.state.x_data_id[r.key]
      })
   }
   _switch(e){
     this.state._switch=='chart' ? this.setState({_switch:'data'},()=>{console.log(this.state._switch)}) : this.setState({ _switch:'chart'},()=>{console.log(this.state._switch)})
   }
   download(){
     console.log('下载')
   }
	 //按税号统计
	 //公司名称
	get_company () {
			const req = request( 'http://192.168.52.101:8080/report-web/find/getclient', {
 	   headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
 		 method: 'GET',
 	 })
 	 .then((data) => {
 		let company = data.data.datas
    let children = []
		for(let i in company){
				children.push({ "value": company[i].corpid, "label": company[i].corpname })
		}
		this.setState({ company: children })
 		});
 	}
	//公司、年份 查询
	get_id() {
		const req = request('http://192.168.52.101:8080/report-web/find/getorgmonthinvqty?year='+this.state.year+'&clientid='+this.state.clintid,{
			headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
			menthod:'GET'
		}).then(data=>{
			// console.log(data.data.datas)
			if(data.data.datas!=void(0)){
				let arr = data.data.datas;
				let data1 = [],
		       x_data = [];
		    for(let i in arr[2]){
		      data1.push(arr[2][i].invqty)
		      x_data.push(arr[2][i].nsrsbh)
		    }
				this.setState({
					data_num: data1,
					x_data_num:x_data,//税号图
				 })
				let data2 = [],
					x_data2 = [];
				for(let i in arr[0]){
					 data2[i] = [], x_data2[i] = [];
					for(let j in arr[0][i].months){
						data2[i].push(arr[0][i].months[j].invqty)
			      x_data2[i].push(arr[0][i].months[j].month)
					}
				}
        this.setState({
          data_id: data2,
          x_data_id: x_data2,//二维数组
          data_2: data2[0],
          x_data_2:x_data2[0]
        })
				// console.log(data2)
        // console.log(x_data2)
        let list = [];
        let source = []
        let total = [];

        for(let i in data2){
           list[i] = [];
          for(let j in data2[i]){
              list[i].push('\"' + x_data2[i][j] + '\":\"' + data2[i][j] + '\"')
          }
          total[i] = data2[i].reduce((prev,next)=>{return(prev+next)});
          list[i].push('\"total\":\"'+ total[i] +'\"')
          list[i].push('\"nsrsbh\":\"'+arr[0][i].nsrsbh+'\"')
          list[i].push('\"nsrmc\":\"'+arr[0][i].nsrmc+'\"')
          list[i].push('\"key\":\"'+i+'\"')
          source[i] = JSON.parse( '{'+ list[i].join(',')+ '}')//形成table
        }
          console.log(source)
          this.setState({ data: source })
			}else{
				console.log('未选择')
			}
		})
	}
	//每月组织总量
  get_corp() {
    const req = request('http://192.168.52.101:8080/report-web/get/orgnumber?year='+this.state.year,{
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      menthod:'GET',
    }).then((data)=> {
			let data1 = [],
	       x_data = [],
           corp = [],
            arr = [];
	    for(let i in data.data.datas){
	      data1.push(data.data.datas[i].invqty)
	      x_data.push(data.data.datas[i].month)
        corp.push('\"'+data.data.datas[i].month+'\":\"'+data.data.datas[i].invqty+'\"')
	    }
      corp = JSON.parse('{'+corp.join(',')+'}')
      arr.push(corp)
	    this.setState({
	      	data_corp: data1,
	      x_data_corp: x_data,
        columns_corp: arr
	    })
			// console.log(arr)
    })
  }
	//每月税号总量
	get_tax() {
    const req = request('http://192.168.52.101:8080/report-web/get/month/nsrsbhNum?year='+this.state.year,{
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      menthod:'GET',
    }).then((data)=> {
			let data1 = [],
				 x_data = [],
            tax = [],
            arr = [];
			for(let i in data.data.datas){
				data1.push(data.data.datas[i].invqty)
				x_data.push(data.data.datas[i].month)
        tax.push('\"'+data.data.datas[i].month+'\":\"'+data.data.datas[i].invqty+'\"')
			}
      tax = JSON.parse('{'+tax.join(',')+'}');
      arr.push(tax)
			this.setState({
				data_tax: data1,
			x_data_tax: x_data,
      columns_tax: arr
			})
      // console.log(arr)
    })
  }

componentDidMount() {
	this.get_company();
	this.get_tax();
	this.get_corp();
	this.get_id();
}
	 render() {
     const month = [
       {
       title:"一月",
       dataIndex: "01",
       key:"action1",
       },{
         title:"二月",
         dataIndex: "02",
         key:"action2",
       },{
         title:"三月",
         dataIndex: "03",
         key:"action3",
       },{
         title:"四月",
         dataIndex: "04",
         key:"action4",

       },{
         title:"五月",
         dataIndex: "05",
         key:"action5",

       },{
         title:"六月",
         dataIndex: "06",
         key:"action6",

       },{
         title:"七月",
         dataIndex: "07",
         key:"action7",

       },{
         title:"八月",
         dataIndex: "08",
         key:"action8",

       },{
         title:"九月",
         dataIndex: "09",
         key:"action9",
       },{
         title:"十月",
         dataIndex: "10",
         key:"action10",

       },{
         title:"十一月",
         dataIndex: "11",
         key:"action11",
       },{
         title:"十二月",
         dataIndex: "12",
         key:"action12",
     }
   ]
     const Columns = [
        {
          title:"税号",
          dataIndex:"nsrsbh",
          key:"conditionFpqqlsh",
          width:180,
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },{
          title:"组织名称",
          dataIndex:"nsrmc",
          key:"conditionAddress",
          width:180,
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },
     	 {
     		 title:"纳税人名称",
     		 dataIndex:"nsrmc",
     		 key:"conditionAddress1",
          width:180,
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
     	 },
        {
          title:"一月",
          dataIndex: "01",
          key:"action1",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },
        {
          title:"二月",
          dataIndex: "02",
          key:"action2",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },{
          title:"三月",
          dataIndex: "03",
          key:"action3",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },{
          title:"四月",
          dataIndex: "04",
          key:"action4",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },{
          title:"五月",
          dataIndex: "05",
          key:"action5",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },
     	 {
          title:"六月",
          dataIndex: "06",
          key:"action6",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },
     	 {
          title:"七月",
          dataIndex: "07",
          key:"action7",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },
     	 {
          title:"八月",
          dataIndex: "08",
          key:"action8",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },
     	 {
          title:"九月",
          dataIndex: "09",
          key:"action9",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },
     	 {
          title:"十月",
          dataIndex: "10",
          key:"action10",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },
     	 {
          title:"十一月",
          dataIndex: "11",
          key:"action11",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },
     	 {
          title:"十二月",
          dataIndex: "12",
          key:"action12",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },
     	 {
          title:"总计",
          dataIndex: "total",
          key:"conditionResult",
          onCellClick:(record,index)=>{
            this.rowclick(record,index)
          }
        },
      ]
		 return(

       <div>
       <Row style={{marginBottom:20}}>
         <Col span={2}>
         <Switch
         checkedChildren={'数据'}
         unCheckedChildren={'图表'}
         disabled={this.state.switch}
         onChange={(e)=>this._switch(e)} />
         </Col>
         <Col span={6} ></Col>

         <Col span={4}>
           <Search
           children={this.state.company}
            foo={ (msg)=>this.msg_search(msg) }/>
         </Col>

         <Col span={3}>
          <Btn show={this.state.Btn_status} name='导出报表'foo={()=>this.download()}/>
         </Col>

       </Row>
       <Row>
         <Col span={2}></Col>
         <Col span={18}>
     		 	<Table
            size="small"
            bordered
     			  columns={Columns}
     			  dataSource={this.state.data}
     			  pagination={false}/>
            </Col>
            <Col span={2}></Col>
          </Row>



       {
         (this.state._switch=='chart')?(
           <div>
           <Row>
             <Col span={12}>
             <Chart
             data={this.state.data_2}
             x_data={this.state.x_data_2}
              name={this.state.year}
              />
            </Col>
             <Col span={12}>
             <Chart
             data={this.state.data_num}
             x_data={this.state.x_data_num}
             name={'开票量'}/>
            </Col>
           </Row>
           <Row style={{marginBottom:10, marginTop:20}}>
             <Col span={5}></Col>
             <Col span={5}>
                <span style={{color: "#404040", fontSize: 22}}>每月税号量统计</span>
             </Col>
             <Col span={7}></Col>
             <Col span={6}>
                <span style={{color: "#404040", fontSize: 22}}>每月组织量统计</span>
             </Col>
           </Row>
           <Row >
              <Col span={12}>
     				 	<Chart
     					data={this.state.data_corp} x_data={this.state.x_data_corp}
     					name={this.state.year+'年度月组织量'}
     					/>
     				 </Col>
              <Col span={12}>
     				 	<Chart
     					 data={this.state.data_tax} x_data={this.state.x_data_tax}
     					 name={this.state.year+'年度月税号量'}
     					 />
     				 </Col>
            </Row>
            </div>
          ):(
            <div>
            <Row style={{marginBottom:10, marginTop:20}}>
              <Col span={5}></Col>
              <Col span={5}>
                 <span style={{color: "#404040", fontSize: 22}}>每月税号量统计</span>
              </Col>
              <Col span={7}></Col>
              <Col span={6}>
                 <span style={{color: "#404040", fontSize: 22}}>每月组织量统计</span>
              </Col>
            </Row>
            <Row style={{marginTop: 50}}>
            <Col span={1}></Col>

              <Col span={10}>
                <Table
                  size="small"
                  bordered
                  columns={month}
                  dataSource={this.state.columns_corp}
                  pagination={false}/>
              </Col>
              <Col span={2}></Col>
              <Col span={10}>
                <Table
                  size="small"
                  bordered
                  columns={month}
                  dataSource={this.state.columns_tax}
                  pagination={false}/>
              </Col>
            </Row>
            </div>
             )
           }
       </div>
		 )
	 }
 }
 export default Detail
