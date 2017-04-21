import { Upload, Icon, Button, message } from 'antd';
import React from 'react';
const Dragger = Upload.Dragger;
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
	const props1 = {
  name: 'file',
  multiple: true,
  showUploadList: false,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
		return(
			<div style={{ marginLeft: 46, height: 125, width: 400 }}>
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">证书上传区域</p>

    </Dragger>
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
