import React from 'react'
import { Route, Link } from 'react-router-dom'

import { Layout, Menu, Breadcrumb, Icon, Col, Row, Dropdown, Button } from 'antd'

import './App.css'

import Home from './containers/home'
import About from './containers/about'
import LoginPage from './containers/auth/LoginPage'
import Routes from './Routes'

const {SubMenu, ItemGroup} = Menu
const {Header, Content, Footer} = Layout

const adminPanel = (

  <Menu>
    <Menu.Item key='0'>

      <a target='_blank'>修改密码</a>
    </Menu.Item>
    <Menu.Item key='1'>

      <Link to='/login'>
        登录
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='3' disabled>全局通知（不可用）</Menu.Item>
  </Menu>
)

class App extends React.Component {
  state = {
    current: 'mail'
  }
  handleClick = (e) => {
    console.log('click ', e)
    this.setState({
      current: e.key
    })
  }

  render () {
    return (
      <div>
        <Layout className='layout'>
          <Header>
            <Row>
              <Col xs={3} sm={2} lg={0}>图标</Col>
              <Col xs={19} sm={21} lg={4}><span style={{fontSize: 20, color: 'white'}}>洛阳师范学院</span></Col>
              <Col xs={0} lg={12}>
                <Menu
                  theme='dark'
                  onClick={this.handleClick}
                  selectedKeys={[this.state.current]}
                  mode='horizontal'
                  style={{lineHeight: '64px'}}
                >
                  <Menu.Item key='mail'>
                    <Link to='/'>
                      <Icon type='home' />主页
                    </Link>
                  </Menu.Item>
                  <SubMenu title={<span><Icon type='setting' />服务大厅</span>}>
                    <ItemGroup title='考勤管理'>
                      <Menu.Item key='setting:1'>
                        <a href='/punch-in'>签到</a>
                      </Menu.Item>
                      <Menu.Item key='setting:2'>Option 2</Menu.Item>
                    </ItemGroup>
                    <ItemGroup title='Item 2'>
                      <Menu.Item key='setting:3'>Option 3</Menu.Item>
                      <Menu.Item key='setting:4'>Option 4</Menu.Item>
                    </ItemGroup>
                  </SubMenu>
                </Menu>
              </Col>
              <Col xs={2} sm={1} lg={{span: 1, offset: 7}}
                style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Dropdown overlay={adminPanel}>
                  <a className='ant-dropdown-link' href='#'
                    style={{color: 'white', fontSize: '13px'}}>登&nbsp;&nbsp;录</a>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content style={{padding: '50px 50px 0 50px'}}>
            <div style={{background: '#fff', padding: 24, minHeight: 280}}>
              <Routes />
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            ©2017 洛阳师范学院
          </Footer>
        </Layout>
      </div>
    )
  }
}

export default App
