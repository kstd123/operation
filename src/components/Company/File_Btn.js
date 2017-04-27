import { Upload, Icon, Button, message } from 'antd';
import React from 'react';
import * as _ from '../../Host';

const Dragger = Upload.Dragger;
class File_Btn extends React.Component{
	// let res = this.props.record;

	render(){
		let self = this.props
		// let res = 'corpname='+ self.corpname+'corpcode='+ self.corpcode;
		let res = {'corpname':self.corpname,'corpcode':self.corpcode}
		const props = {
		  name: 'pic',
		  action: _.HOST+'pages/upload',
			data: res,
		  headers: {
		    authorization: 'authorization-text',
		  },
		  onChange(info) {
		    if (info.file.status !== 'uploading') {
		      // console.log(info.file, info.fileList, );

					setTimeout(()=>{
						self.file(data)
					},0)

		    }
		    if (info.file.status === 'done') {
		      message.success(`${info.file.name}上传成功`);
		    } else if (info.file.status === 'error') {
		      message.error(`${info.file.name}上传失败`);
		    }
		  },
		};

		return(
			<div>
			<Upload {...props}>
				<Button type="primary">
					<Icon type="upload" /> 上传
				</Button>
			</Upload>
			</div>
		)
	}
}
export default File_Btn;
