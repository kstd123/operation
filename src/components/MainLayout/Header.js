import React from 'react';
import { Link } from 'dva/router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider, Row, Col } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// class SubMenuComponent extends React.Component {
// 	return(
// 			<SubMenu
// 			 key="{this.ptops.father_key}"
// 			 title={
// 				 <span><Icon type="team"
// 				 style={{margin:"0 30px 0 0 "}}/>
// 				 <span>{this.props.fater_title}</span>
// 				 </span>
// 			 }>
// 				 <Menu.Item key={this.props.key}>
// 				 		<Link to="{this.props.routes}">{this.props.title}</Link>
// 				 </Menu.Item>
// 			</SubMenu>
// 	)
// }
class Headers extends React.Component{

 state = {
  collapsed: false,
  mode: 'inline',
	current:''
}
 onCollapse = (collapsed,mode) => {
  console.log(collapsed);
	console.log(mode)
  this.setState({
  	collapsed,
		mode: collapsed ? 'vertical' : 'inline',
  });
}

  // getInitialState() {
  //   return {
  //     current: '1',
  //   };
  // }
  // handleClick(e) {
  //   console.log('click ', e);
  //   this.setState({
  //     current: e.key,
  //   });
  // }

  render() {
    return (
			<Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
					style={{width:"15px"}}
        >
          <div className="logo" />
	      <Menu onClick={this.handleClick}
					style={{margin:'63px 0 0 0'}}

	        selectedKeys={[this.state.current]}
	       	mode={this.state.mode}
					theme="dark"
	      >
	        <SubMenu key="sub1" title={<span><Icon type="team" style={{margin:"0 30px 0 0 "}}/><span>公司</span></span>}>
	            <Menu.Item key="1"><Link to="/Company">公司管理</Link></Menu.Item>
	            <Menu.Item key="2"><Link to="/Authority">授权管理</Link></Menu.Item>
							<Menu.Item key="3"><Link to="/Upload">证书查看</Link></Menu.Item>
	        </SubMenu>
					<SubMenu key="sub2" title={<span><Icon type="mail" style={{margin:"0 30px 0 0 "}}/><span>参数</span></span>}>
						<Menu.Item key="5"><Link to="/Math">参数列表</Link></Menu.Item>
						<Menu.Item key="6">菜单三2</Menu.Item>
					</SubMenu>
	        <SubMenu key="sub3" title={<span><Icon type="appstore" style={{margin:"0 30px 0 0 "}}/><span>消息</span></span>}>
	          <Menu.Item key="7"><Link to="/Email">email</Link></Menu.Item>
	          <Menu.Item key="8"><Link to="/Sms">短信</Link></Menu.Item>
						<Menu.Item key="9"><Link to="/Url">URL回调</Link></Menu.Item>
						<Menu.Item key="10"><Link to="/Web">Webservice回调</Link></Menu.Item>
						<Menu.Item key="11"><Link to="/Wechat">微信</Link></Menu.Item>
	        </SubMenu>
					<SubMenu key="sub4" title={<span><Icon type="area-chart" style={{margin:"0 30px 0 0 "}}/><span>报表</span></span>}>
					 <Menu.Item key="12"><Link to="/watch">开票总览</Link></Menu.Item>
					 <Menu.Item key="13"><Link to="/Chart_detail">按税号统计</Link></Menu.Item>
				 </SubMenu>
	      </Menu>
			</Sider>
			<Layout>
				<Header style={{ background: '#fff', padding: 0 ,maxHeight:0}} />
				<Content style={{ margin: '12px 16px 0 16px' }}>
					<div style={{ padding: 24, background: '#fff', minHeight: 680 }}>
						{this.props.contents}
					</div>
				</Content>
			</Layout>
		</Layout>
    );
  }
}
export default Headers
