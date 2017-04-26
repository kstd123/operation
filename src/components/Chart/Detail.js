import React from 'react';
import { Row, Col, Table, Switch, BackTop  } from 'antd';
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
	 state={//初始化状态
			Btn_status:'false',//导出报表按钮
      switch_disable:'false',
			year:2017,
      year1:2017,
      switch: 'chart',//数据展示模式
      search_model:'company'//查询条件
	 }
   msg_search(msg){
     console.log(msg)
		 if(msg.length==0){
       this.setState({Btn_status:'false'})
		 } else if(msg.length==3) {
		 this.setState({
       search_model:msg[0],//按税号查询，tax
			 year: msg[1],
			 clintid: msg[2],
       Btn_status:'true'//导出报表
		 }, ()=>{
       this.get_tax();
       this.get_corp();
       this.get_id();
     })
      } else if(msg.length==2) {
       this.setState({
         search_model: msg[0],//按公司查询，company
         year1: msg[1],
         Btn_status:'true'
       },()=>{
         this.get_custom();
         this.get_shou();
         this.get_make();
       })
     }
	 	}
   rowclick(r,i){//行点击事件切换图表_tax
    this.setState({
        data_2: this.state.data_id[r.key],
        x_data_2: this.state.x_data_id[r.key]
      })
   }
   shou_rowclick(r,i){//受票量
     console.log(r.key);
     this.setState({
       data_sp: this.state.data_shou[r.key],
       x_data_sp: this.state.x_data_shou[r.key]
     })
   }
   make_rowclick(r,i){
     this.setState({
       data_kp: this.state.data_make[r.key],
       x_data_kp: this.state.x_data_make[r.key]
     })
   }
  //  _rowclick(r,i){//行点击事件切换图表_company
  //   this.setState({
  //       data_2: this.state.data_id[r.key],
  //       x_data_2: this.state.x_data_id[r.key]
  //     })
  //  }

   switch_tax(e){//图表数据切换按钮
     this.state.switch=='chart' ? this.setState({switch:'data'}) : this.setState({ switch:'chart'})
   }
   download(){
     console.log('下载')
   }

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
				children.push({
          "value": company[i].corpid,
          "label": company[i].corpname
        })
		}
		this.setState({ company: children })
 		});
 	}
  //月客户量
  get_custom() {
    const req = request('http://192.168.52.101:8080/report-web/statistic/month/clientqty?year='+this.state.year1,{
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      menthod:'GET',
    }).then((data)=> {
    let res = data.data.datas,
        data1= [],
        x_data = [],
        source = [],
        source1 = [];
    for(let i in res) {
      data1.push(res[i].qty)
      x_data.push(res[i].month)
      source.push('\"' + res[i].month + '\":\"' + res[i].qty + '\"')
      source.push('"name":"客户量"')
    }
    source = JSON.parse('{'+ source.join(',') +'}')
    source1.push(source)
    this.setState({
      data_custom: data1,
      x_data_custom: x_data,
      source_custom: source1
      })
      console.log(source1)
    })
  }
  //月受票量，动态
  get_shou() {
    const req = request('http://192.168.52.101:8080/report-web/statistic/client/month/receive?year='+this.state.year1,{
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      menthod:'GET',
    }).then((data)=> {
    let res = data.data.datas,
        data1= [],
        x_data = [],
        source = []
        res.length = res.length-2;
    for(let i in res) {
      data1[i] = [];
      x_data[i] = [];
      source[i] = []
      for(let j in res[i]){
        data1[i].push(res[i][j].invqty)
        x_data[i].push(res[i][j].month)
        source[i].push('\"' + res[i][j].month + '\":\"' + res[i][j].invqty + '\"')
        source[i].push('"key":\"' + i + '\"')
        source[i].push('"khmc":\"' + res[i][0].corpname + '\"')
      }
        source[i] = JSON.parse('{'+ source[i].join(',') +'}')
    }
    this.setState({
      data_shou: data1,
      x_data_shou: x_data,
      source_shou: source,
      data_sp: data1[0],
      x_data_sp: x_data[0]
      })
    })
  }
  //月开票量，动态
  get_make() {
    const req = request('http://192.168.52.101:8080/report-web/statistic/client/month/invoiceqty?year='+this.state.year1,{
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      menthod:'GET',
    }).then((data)=> {
    let res = data.data.datas,
        data1= [],
        x_data = [],
        source = []
        res.length = res.length-2;
    for(let i in res) {
      data1[i] = [];
      x_data[i] = [];
      source[i] = []
      for(let j in res[i]){
        data1[i].push(res[i][j].invqty)
        x_data[i].push(res[i][j].month)
        source[i].push('\"' + res[i][j].month + '\":\"' + res[i][j].invqty + '\"')
        source[i].push('"key":\"' + i + '\"')
        source[i].push('"khmc":\"' + res[i][0].corpname + '\"')
      }
        source[i] = JSON.parse('{'+ source[i].join(',') +'}')
    }
    this.setState({
      data_make: data1,
      x_data_make: x_data,
      source_make: source,
      data_kp: data1[0],
      x_data_kp: x_data[0]
      })
      console.log(source)
    })
  }
	//公司、年份 查询,动态
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
    })
  }

componentDidMount() {

  this.get_company();
  if(this.state.search_model=='tax') {
    this.get_tax();
    this.get_corp();
    this.get_id();
  }else{
    this.get_custom();
    this.get_shou();
    this.get_make();
  }
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
   const company_client = [
     {
        title:"月份",
        dataIndex: "name",
        key:"name"
      },
      ...month
      ,
      {
        title:"总计",
        dataIndex: "total",
        key:"total",
      }]
   const Columns = [
      {
        title:"税号",
        dataIndex:"nsrsbh",
        key:"nsrsbh",
        width:180,
        onCellClick:(record,index)=>{
          this.rowclick(record,index)
        }
      },{
        title:"组织名称",
        dataIndex:"nsrmc",
        key:"nsrmc",
        width:180,
        onCellClick:(record,index)=>{
          this.rowclick(record,index)
        }
      },
   	 {
   		 title:"纳税人名称",
   		 dataIndex:"nsrmc",
   		 key:"nsrmc1",
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
     },
     {
       title:"三月",
       dataIndex: "03",
       key:"action3",
       onCellClick:(record,index)=>{
         this.rowclick(record,index)
       }
     },
     {
       title:"四月",
       dataIndex: "04",
       key:"action4",
       onCellClick:(record,index)=>{
         this.rowclick(record,index)
       }
     },
     {
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
  const company_sp = [
    {
      title: "客户名称",
      dataIndex: "khmc",
      key:"custom",
      onCellClick:(record,index)=>{
        this.shou_rowclick(record,index)
      }
    },
    {
      title:"一月",
      dataIndex: "01",
      key:"action1",
      onCellClick:(record,index)=>{
        this.shou_rowclick(record,index)
      }
    },
    {
      title:"二月",
      dataIndex: "02",
      key:"action2",
      onCellClick:(record,index)=>{
        this.shou_rowclick(record,index)
      }
    },
    {
      title:"三月",
      dataIndex: "03",
      key:"action3",
      onCellClick:(record,index)=>{
        this.shou_rowclick(record,index)
      }
    },
    {
      title:"四月",
      dataIndex: "04",
      key:"action4",
      onCellClick:(record,index)=>{
        this.shou_rowclick(record,index)
      }
    },
    {
      title:"五月",
      dataIndex: "05",
      key:"action5",
      onCellClick:(record,index)=>{
        this.shou_rowclick(record,index)
       }
   },
   {
      title:"六月",
      dataIndex: "06",
      key:"action6",
      onCellClick:(record,index)=>{
        this.shou_rowclick(record,index)
       }
   },
   {
    title:"七月",
    dataIndex: "07",
    key:"action7",
    onCellClick:(record,index)=>{
      this.shou_rowclick(record,index)
     }
   },
   {
    title:"八月",
    dataIndex: "08",
    key:"action8",
    onCellClick:(record,index)=>{
      this.shou_rowclick(record,index)
     }
   },
   {
    title:"九月",
    dataIndex: "09",
    key:"action9",
    onCellClick:(record,index)=>{
      this.shou_rowclick(record,index)
     }
   },
   {
    title:"十月",
    dataIndex: "10",
    key:"action10",
    onCellClick:(record,index)=>{
      this.shou_rowclick(record,index)
     }
   },
   {
    title:"十一月",
    dataIndex: "11",
    key:"action11",
    onCellClick:(record,index)=>{
      this.shou_rowclick(record,index)
     }
   },
   {
    title:"十二月",
    dataIndex: "12",
    key:"action12",
    onCellClick:(record,index)=>{
      this.shou_rowclick(record,index)
     }
   },
   {
    title:"总计",
    dataIndex: "total",
    key:"conditionResult",
    onCellClick:(record,index)=>{
      this.shou_rowclick(record,index)
     }
  },
  ]
  const company_kp = [
    {
      title: "客户名称",
      dataIndex: "khmc",
      key:"custom",
      onCellClick:(record,index)=>{
        this.make_rowclick(record,index)
      }
    },
    {
      title:"一月",
      dataIndex: "01",
      key:"action1",
      onCellClick:(record,index)=>{
        this.make_rowclick(record,index)
      }
    },
    {
      title:"二月",
      dataIndex: "02",
      key:"action2",
      onCellClick:(record,index)=>{
        this.make_rowclick(record,index)
      }
    },
    {
      title:"三月",
      dataIndex: "03",
      key:"action3",
      onCellClick:(record,index)=>{
        this.make_rowclick(record,index)
      }
    },
    {
      title:"四月",
      dataIndex: "04",
      key:"action4",
      onCellClick:(record,index)=>{
        this.make_rowclick(record,index)
      }
    },
    {
      title:"五月",
      dataIndex: "05",
      key:"action5",
      onCellClick:(record,index)=>{
        this.make_rowclick(record,index)
       }
   },
   {
      title:"六月",
      dataIndex: "06",
      key:"action6",
      onCellClick:(record,index)=>{
        this.make_rowclick(record,index)
       }
   },
   {
    title:"七月",
    dataIndex: "07",
    key:"action7",
    onCellClick:(record,index)=>{
      this.make_rowclick(record,index)
     }
   },
   {
    title:"八月",
    dataIndex: "08",
    key:"action8",
    onCellClick:(record,index)=>{
      this.make_rowclick(record,index)
     }
   },
   {
    title:"九月",
    dataIndex: "09",
    key:"action9",
    onCellClick:(record,index)=>{
      this.make_rowclick(record,index)
     }
   },
   {
    title:"十月",
    dataIndex: "10",
    key:"action10",
    onCellClick:(record,index)=>{
      this.make_rowclick(record,index)
     }
   },
   {
    title:"十一月",
    dataIndex: "11",
    key:"action11",
    onCellClick:(record,index)=>{
      this.make_rowclick(record,index)
     }
   },
   {
    title:"十二月",
    dataIndex: "12",
    key:"action12",
    onCellClick:(record,index)=>{
      this.make_rowclick(record,index)
     }
   },
   {
    title:"总计",
    dataIndex: "total",
    key:"conditionResult",
    onCellClick:(record,index)=>{
      this.make_rowclick(record,index)
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

         onChange={(e)=>this.switch_tax(e)} />
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
       {(this.state.search_model=='company') ? ((this.state.switch=='chart')?(
       <div>
          <Row>
            <Col span={2}></Col>
            <Col span={20}>
           <Table
             size="small"
             bordered
             columns={company_client}
             dataSource={this.state.source_custom}
             pagination={false}/>
             </Col>
             <Col span={2}></Col>
           </Row>
           <Row style={{ marginTop:50}}>
             <Col span={2}></Col>
             <Col span={20}>
             <Table
               size="small"
               bordered
               columns={company_sp}
               dataSource={this.state.source_shou}
               pagination={false}/>
             </Col>
           </Row >
           <Row style={{marginTop:20}}>
           <Col span= {4}></Col>
            <Col span={6}><span style={{ fontSize:24 }}>月客户量</span></Col>
            <Col span={8}><span style={{ fontSize:24 }}>月受票量</span></Col>
            <Col span={6}><span style={{ fontSize:24 }}>月开票量</span></Col>
           </Row>
           <Row >
            <Col span={2}></Col>
            <Col span={7}>
               <Chart
               data={this.state.data_custom} x_data={this.state.x_data_custom}
               name={'月客户量'}
               />
             </Col>
             <Col span={7}>
               <Chart
               data={this.state.data_sp} x_data={this.state.x_data_sp}
               name={'月受票量'}
               />
             </Col>
             <Col span={7}>
               <Chart
               data={this.state.data_kp} x_data={this.state.x_data_kp}
               name={'月开票量'}
               />
             </Col>
           </Row>

           <Row >
             <Col span={2}></Col>
               <Col span={20}>
                 <Table
                   size="small"
                   bordered
                   columns={company_kp}
                   dataSource={this.state.source_make}
                   pagination={false}/>
              </Col>
              <Col span={8} >
              </Col>
           </Row>

       </div>
       ):(
       <div>
         <Row>
           <Col span={2}></Col>
           <Col span={20}>
          <Table
            size="small"
            bordered
            columns={company_client}
            dataSource={this.state.source_custom}
            pagination={false}/>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row style={{ marginTop:30 }}>
            <Col span={2}></Col>
            <Col span={20}>
            <Table
              size="small"
              bordered
              columns={company_sp}
              dataSource={this.state.source_shou}
              pagination={false}/>
            </Col>
          </Row>
          <Row style={{marginTop:30}}>
            <Col span={2}></Col>
              <Col span={20}>
                <Table
                  size="small"
                  bordered
                  columns={company_kp}
                  dataSource={this.state.source_make}
                  pagination={false}/>
             </Col>
             <Col span={8} >
             </Col>
          </Row>
       </div>
     )):((this.state.switch=='chart')?(
             <div>
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
       ))}

{/*(tax?tax(switch?chart:table):company(switch_tax?chart:table))*/}

       {

        }
       </div>
		 )
	 }
 }
 export default Detail
