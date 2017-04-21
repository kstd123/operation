import React from 'react';
import { Button } from 'antd';
import styles from './Btn.css';
class Btn extends React.Component {
	state = {
		loading:false,
		f_name: ''
	}
	enterLoading = ()=> {
		let self =this;
		this.setState({ loading: true })
		this.props.foo()
		this.props.status == 'ture' ? this.setState({loading:false,f_name:'已'}) : console.log('失败')
		// setTimeout(()=>{
		// 	self.setState({ loading: false, f_name:'已' })
		// },2000)
	}
		render() {
			const show = this.props.show;
			const Btn=(this.props.show=="true") ? (
				<Button
					className={styles.Btn}
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
export default Btn
