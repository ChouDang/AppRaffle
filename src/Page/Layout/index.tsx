import { Button, Dropdown, Layout as LayoutAntd, Menu, theme } from 'antd';
import { AuthUser } from 'aws-amplify/auth';
import { Fragment } from 'react';
import { RouterProvider } from 'react-router-dom';
import Avatar from '../../Component/Avatar';
import useRouterHook from '../../Hooks/useRouterHook';
const { Header, Content, Footer } = LayoutAntd;

const Layout = ({
    signOut,
    user
}: {
    signOut: ((data?: any) => void) | undefined,
    user: AuthUser | undefined
}) => {
    const {
        router,
        menuItems,
        selectedKeys,
        set_selectedKeys
    } = useRouterHook({
        signOut,
        user
    })
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Fragment>
            <LayoutAntd>
                <Header style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    background: "#fff"
                }}>
                    <div className="Logo" style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 20,
                        marginBottom: 20
                    }} onClick={() => {
                        router.navigate("/")
                        set_selectedKeys([])
                    }}>
                        <img src={process.env.NODE_ENV == "development"
                            ? `${window.location.origin}/public/LOGOCHOUDANG.png`
                            : `${window.location.origin}/LOGOCHOUDANG.png`
                        } alt="logo" width={80} height={40} />
                    </div>
                    <Menu
                        mode="horizontal"
                        items={!!menuItems.length ? menuItems : []}
                        selectedKeys={selectedKeys}
                        onClick={e => set_selectedKeys(e.keyPath)}
                        style={{
                            display: "flex", justifyContent: 'center', flex: 1,
                        }}
                    />
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    label: "Thông tin cá nhân",
                                    onClick: () => {
                                        router.navigate("/UserInfo")
                                    }
                                },
                                {
                                    key: '2',
                                    label: "Đăng xuất",
                                    onClick: () => signOut && signOut()
                                },
                            ],
                        }}
                        trigger={['click']}
                    >
                        <Button shape={"circle"} icon={<Avatar />} style={{
                            outline: "unset",
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                        }} />
                    </Dropdown>
                </Header>
                <Content style={{ padding: '0 48px' }}>
                    <div
                        style={{
                            marginTop: 56,
                            background: colorBgContainer,
                            minHeight: 'calc(100vh - 190px)',
                            padding: 24,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {!!menuItems.length && <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    AppRaffle Created by ChouDang
                </Footer>
            </LayoutAntd>
        </Fragment>
    )
}

export default Layout