import React, { Component } from 'react';
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/title')

class Chart extends React.Component {
	constructor(props) {
		super(props)
		this.setPieOption = this.setPieOption.bind(this)
	}
	initPie() {//公用方法
		const { data } = this.props;
		let myChart = echarts.init(this.refs.pieChart)//初始化echarts
		let options = this.setPieOption(data)
		myChart.setOption(options)
	}
	componentDidMount() {
		this.initPie()
	}
	ComponentDidUpdate() {
		this.initPie()
	}
	render () {
		return(
			<div className="pie-react">
				<div ref="pieReact" style={{width:"100%", height:"200px"}}></div>
			</div>
		)
	}

	setPieOption(data) {
			 return {
					 series : [

							 {
									 name: '比例',
									 type: 'pie',
									 radius: ['70%', '90%'],
									 avoidLabelOverlap: true,
									 data: data, //传入外部的data数据
									 label: {
											 normal: {
													 show: false,
													 position: 'center',
													 textStyle: {
															 fontSize: '18'
													 },
													 formatter: "{d}% \n{b}",
											 },
											 emphasis: {
													 show: true,
													 textStyle: {
															 fontSize: '18',
													 }
											 }
									 },
									 labelLine: {
											 normal: {
													 show: false
											 }
									 }
							 }
					 ]
			 }
	 }
}
export default Chart
