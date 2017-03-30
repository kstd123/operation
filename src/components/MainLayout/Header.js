import React from 'react';
import { Link } from 'dva/router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider, Row, Col } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Headers extends React.Component{
 state = {
  collapsed: false,
  mode: 'inline',
}
 onCollapse = (collapsed) => {
  console.log(collapsed);
  this.setState({
 	 collapsed,
 	 mode: collapsed ? 'vertical' : 'inline',
  });
}

  getInitialState() {
    return {
      current: '1',
    };
  }
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
			<Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}

        >
          <div className="logo" />

	      <Menu onClick={this.handleClick}
					style={{margin:'63px 0 0 0'}}
	        defaultOpenKeys={['sub1']}
	        selectedKeys={[this.state.current]}
	        mode="inline"
					theme="dark"
	      >
	        <SubMenu key="sub1" title={<span><Icon type="team" style={{margin:"0 30px 0 0 "}}/><span>公司</span></span>}>
	            <Menu.Item key="3"><Link to="/users">菜单一1</Link></Menu.Item>
	            <Menu.Item key="4"><Link to="/index">菜单一2</Link></Menu.Item>
	        </SubMenu>
	        <SubMenu key="sub2" title={<span><Icon type="appstore" style={{margin:"0 30px 0 0 "}}/><span>参数</span></span>}>
	          <Menu.Item key="5"><Link to="/chart">菜单二1</Link></Menu.Item>
	          <Menu.Item key="6">菜单二2</Menu.Item>
	        </SubMenu>
	        <SubMenu key="sub3" title={<span><Icon type="mail" style={{margin:"0 30px 0 0 "}}/><span>消息</span></span>}>
	          <Menu.Item key="9">菜单三1</Menu.Item>
	          <Menu.Item key="10">菜单三2</Menu.Item>
	        </SubMenu>
					<SubMenu key="sub4" title={<span><Icon type="area-chart" style={{margin:"0 30px 0 0 "}}/><span>报表</span></span>}>
					 <Menu.Item key="9"><Link to="">菜单四1</Link></Menu.Item>
					 <Menu.Item key="10">菜单四2</Menu.Item>
				 </SubMenu>
	      </Menu>

			</Sider>
			<Layout>
				<Header style={{ background: '#fff', padding: 0 }} />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '12px 0' }}>
						<Breadcrumb.Item>1</Breadcrumb.Item>
						<Breadcrumb.Item>2</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ padding: 24, background: '#fff', minHeight: 510 }}>
						{this.props.contents}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					yonyou invoice
				</Footer>
			</Layout>
		</Layout>
    );
  }
}
export default Headers