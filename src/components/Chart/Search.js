import { Table, Icon,Pagination, Button, Row, Col } from 'antd';
import React from 'react';
import { Cascader } from 'antd';
import request from '../../utils/request';

class Search extends React.Component {
  state:{
    status:company
  }
  Search_onChange = (value) => {
    console.log(value);
    this.props.foo(value);
  }
  render(){
    const options = [//search
      {
      value: 'tax',
      label: '税号统计',
      children: [
        {
        value: '2014',
        label: '2014年',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      },{
        value:'2015',
        label: '2015年',
        children: this.props.children
      },
      {
        value:'2016',
        label: '2016年',
        children: this.props.children
      },
      {
        value:'2017',
        label: '2017年',
        children: this.props.children
      },
    ],
      }, {
        value: 'company',
        label: '公司统计',
        children: [{
          value: '2016',
          label: '2016年',
        },{
          value: '2017',
          label: '2017年',
        }],
      }];

    return(
       <Cascader options={options} onChange={this.Search_onChange} placeholder="请选择" />
    )
  }
}
export default Search
