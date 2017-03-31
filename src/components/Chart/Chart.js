import React, { Component } from 'react';
var echarts = require('echarts/lib/echarts') //必须
require('echarts/lib/chart/pie') //图表类型
require('echarts/lib/component/title') //标题插件

class Chart extends React.Component {
	constructor(props) {
		super(props)
		this.setPieOption = this.setPieOption.bind(this)
	}
	initPie() {//公用方法
		const { data } = this.props;
		let myChart = echarts.init(this.refs.charts_react)//初始化echarts
		let options = this.option;
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
			<div className="chart">
				<div ref="charts_react" style={{width:"200px", height:"200px"}}></div>
			</div>
		
		)
	}
	setOption(data) {
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
