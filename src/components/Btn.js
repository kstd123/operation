import React from 'react';
import { Button } from 'antd';
import styles from './Btn.css';
class Btn extends React.Component {
	state = {
		loading:false,
		f_name: ''
	}
	enterLoading = ()=> {
		let self =this.props;
		this.setState({ loading: true })
		setTimeout(()=>{this.setState({loading: false})},2000)
		this.props.foo()
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
