import React from 'react';
import { Button } from 'antd';
class Btn_patch extends React.Component {
	state = {
		loading:false,
		f_name: ''
	}
	enterLoading = ()=> {
		let self =this;
		this.setState({ loading: true })
		this.props.foo()
		setTimeout(()=>{
			self.setState({ loading: false, f_name:'已经' })
		},2000)
	}
		render() {
			const show = this.props.show;
			const Btn=(this.props.show=="true") ? (
				<Button
					type="primary"
					loading={this.state.loading}
					onClick={this.enterLoading}
			 	>{this.state.f_name+this.props.name}</Button> ) : (
				<Button
					disabled
					type="primary"
				>{this.props.name}</Button>)
			return(
				<span>{Btn}</span>
			)
		}
}
export default Btn_patch
