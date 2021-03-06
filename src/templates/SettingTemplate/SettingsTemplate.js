import {NavLink, Redirect, Route} from "react-router-dom";
import React from "react";
import {Layout, Menu} from 'antd';
import {Fragment} from "react";
import {
    UserOutlined,
    HistoryOutlined, PoweroffOutlined, HomeOutlined,
} from '@ant-design/icons';
import {USER_LOGIN} from "../../util/settings";
import {useSelector} from "react-redux";

const {Sider, Content} = Layout;

const SettingTemplate = (props) => {

    const {userLogin} = useSelector(state => state.UserReducer)

    const {Component, ...restProps} = props;

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('You are not authorized to access this page !')
        return <Redirect to='/login'/>
    }

    return <Route {...restProps} render={(propsRoute) => {

        return <Fragment>
            <Layout>
                <Sider width={200} className="site-layout-background"
                       breakpoint="lg"
                       collapsedWidth="0"
                >
                    <div className=" bg-white logo text-center flex justify-center py-6">
                        <div className="flex flex-col items-center mt-6 -mx-2">
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">{userLogin.hoTen}</h4>
                        </div>
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['2']}
                        style={{height: '100%', borderRight: 0}}
                    >

                        <Menu.Item key="1" icon={<HomeOutlined/>}>
                            <NavLink to='/'>Home page</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined/>}>
                            <NavLink to={`/setting/profile/${userLogin.taiKhoan}`}>Profile</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<HistoryOutlined/>}>
                            <NavLink to={`/setting/history/${userLogin.taiKhoan}`}>History booking</NavLink>
                        </Menu.Item>

                        <Menu.Item key="5" icon={<PoweroffOutlined/>}
                                   onClick={() => {
                                       localStorage.clear();
                                       window.location.href = '/login'
                                   }}>
                            Sign out
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout ">
                    <Content
                        className="site-layout-background lg:m-auto"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: '100vh',
                        }}
                    >
                        <Component {...propsRoute} />
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    }}/>
}

export default SettingTemplate