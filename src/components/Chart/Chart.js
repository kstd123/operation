import React from 'react';
import ReactEcharts1 from 'echarts-for-react';
import macarons from './macarons.js'
class Charts extends React.Component{
	getOption(){
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
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }
    ]
		};
		return option
	}
	// echarts.registerTheme('my_theme', {
  // 	backgroundColor: '#f4cccc'
	// });
	render() {
		return(
			<ReactEcharts1
			  option={this.getOption()}
				notMerge={true}
				lazyUpdate={true}
				theme="macarons"
			   />
			 )
	}
}
export default Charts
