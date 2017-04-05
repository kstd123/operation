import { Table, Icon,Pagination } from 'antd';
import React from 'react';
import { connect } from 'dva';
// import reqwest from 'reqwest';
import request from '../../utils/request';

// const { Column, ColumnGroup } = Table;
// import data from './data.js';

const Columns = [
        {
			title:"发票请求流水号",
			dataIndex:"fpqqlsh",
			key:"fpqqlsh"
		},{
			title:"接收地址",
			dataIndex:"address",
			key:"address"
		},{
			title:"结果",
			dataIndex: "result",
			key:"result"
		},{
		 title:"Action",
		 key:"action",
		 render:(text, record) => (
			 <span>
				 <a href="#">Action 一 {record.name}</a>
				 <span className="ant-divider" />
				 <a href="#">Delete</a>
				 <span className="ant-divider" />
				 <a href="#" className="ant-dropdown-link">
					 More actions <Icon type="down" />
				 </a>
			 </span>
		 )
	 }
 ]
const rowSelection = {
	 onChange: (selectedRowKeys, selectedRows) => {
		 console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	 },
	 onSelect: (record, selected, selectedRows) => {
		 console.log(record, selected, selectedRows);
	 },
	 onSelectAll: (selected, selectedRows, changeRows) => {
		 console.log(selected, selectedRows, changeRows);
	 },
	 getCheckboxProps: record => ({
		 disabled: record.name === 'Disabled User',    // Column configuration not to be checked
	 }),
 };

class Sms extends React.Component{

	state = {
		data: [],
		pagination: {},
		loading: false,
		current: 1,
		pagesize: 6,
		total:99
	};

    pageChange=(e)=>{
                this.setState({
                    current: e
                }, ()=>{
                        this.post_test();
                    }
                )
    }

     post_test = (params = {
        pageNow: this.state.current,
        pageNum: this.state.pagesize
        }) => {
            let data = "pageNow="+this.state.current+"&pageNum="+this.state.pagesize

        	const req = request('http://localhost:3001/cas/v1/mobile/user/logout?token=a213asdfb', {
        	headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            method: 'POST',
            body:	data ,
          })

        // const req = request( 'http://localhost:8080/sms/select/all', {
        //     headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        //     method: 'POST',
        //     body: data,
        // })
        .then((data) => {
            console.log(data.data)
            this.setState({
                loading: false,
                data:  data.data.list,
                total: data.data.rowAll
            });
        });
     }  

	componentDidMount() {
		 this.post_test();
         console.log(this.state.total)
    }
render(){
	return(<div>
		 <Table
			 rowSelection={rowSelection}
			 columns={Columns}
			 dataSource={this.state.data}
			 loading={this.state.loading}
			 pagination={false}
			/>
		<Pagination
		showQuickJumper
		total={this.state.total}
		current={this.state.current}
		pagesize={this.state.pagesize}
		onChange={this.pageChange}
/>
		</div>
	)
}
}
// function mapStateToProps(state) {
// 	const {pageNow, pageNum } = state.table;
// }
export default Sms;
// export default connect(maoStateToProps)(Tables)
