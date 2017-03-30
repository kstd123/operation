
import { Chart } from './Chart'
import React from 'react'
//data的格式

const data = [
    {value: 1, name: "是"},
    {value: 2, name: "否"}
]

class Charts extends React.Component {

    render () {
				<div>
          <Chart data={data} reducer= {data}/>
				</div>
    }
}
export default Charts
