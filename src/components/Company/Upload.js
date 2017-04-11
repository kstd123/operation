import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;
import React from 'react';

const props = {
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


class Demo extends React.Component {
	render() {
		return(
			<Dragger {...props}>
	       <p className="ant-upload-drag-icon">
	         <Icon type="inbox" />
	       </p>
	       <p className="ant-upload-text">点击或拖拽上传</p>
	     </Dragger>
		)
	}
}
export default WrappedDemo;
