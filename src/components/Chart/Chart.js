import React from 'react';
import ReactEcharts from 'echarts-for-react';
import macarons from './macarons.js'
class Chart extends React.Component{

	render() {
		const option = {
	    color: ['#3398DB'],
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : this.props.x_data,
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:this.props.name,
	            type:'bar',
	            barWidth: '60%',
	            data:this.props.data
	        }
	    ]
		}
		return(
			<ReactEcharts
			  option={option}
				notMerge={true}
				lazyUpdate={true}
				theme="macarons"
			   />
			 )
	}
}
export default Chart
