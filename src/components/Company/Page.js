import { Pagination } from 'antd';
import React from 'react';

class Pagination extends React.Component {
	pageChange=(e)=>{
		console.log("当前位于第" + e + "页")
		this.props.Pagination_foo(e);//传出当前页
	}
	render() {
		return (
			<Pagination
			showQuickJumper
			total={this.props.total}
			current={this.props.current}
			pagesize={this.props.pagesize}
			onChange={this.pageChange}
	/>
		)
	}
}
export default Page
