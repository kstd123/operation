import { Upload, Icon,Button} from 'antd';
import React from 'react';

class File_Btn extends React.Component{
	render(){
		const props = {
		  name: 'file',
		  action: '//jsonplaceholder.typicode.com/posts/',
		  headers: {
		    authorization: 'authorization-text',
		  },
		  onChange(info) {
		    if (info.file.status !== 'uploading') {
		      console.log(info.file, info.fileList);
		    }
		    if (info.file.status === 'done') {
		      message.success(`${info.file.name} file uploaded successfully`);
		    } else if (info.file.status === 'error') {
		      message.error(`${info.file.name} file upload failed.`);
		    }
		  },
		};
		return(
			<Upload {...props}>
				<Button type="primary">
					<Icon type="upload" /> 上传
				</Button>
			</Upload>
		)
	}
}
export default File_Btn;
