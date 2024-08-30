import { AuthUser } from 'aws-amplify/auth';
import React, { useEffect, useState } from 'react';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
import Error from '../Page/Error';
import Home from '../Page/Home';
import UserInfo from '../Page/UserInfo';

type PropsCustom = {

}

export type CustomRouteObject = Omit<RouteObject, "children"> & {
    Id: string,
    parentId?: string,
    PageName?: string,
    roleName?: string,
    label?: string,
    permission?: {},
    icon?: React.ReactNode,
    children?: CustomRouteObject[],
    path: string,
    isShowMenu: boolean,
};

const useRouterHook = ({
    signOut
}: {
    signOut: ((data?: any) => void) | undefined
}) => {


    const [selectedKeys, set_selectedKeys] = useState<string[]>([])

    const customRouterAdmin: CustomRouteObject[] = [
        {
            path: "/",
            Id: 'Root',
            PageName: "Trang quản lý",
            permission: { View: true, Edit: true },
            element: <>Trang quản lý</>,
            errorElement: <Error />,
            isShowMenu: false,
        },
        {
            path: "/UserInfo",
            Id: 'UserInfo',
            PageName: "Thông tin cá nhân",
            permission: { View: true, Edit: true },
            element: <UserInfo />,
            errorElement: <Error />,
            isShowMenu: false,
        },
        {
            path: "/logout",
            Id: 'logout',
            parentId: "",
            isShowMenu: false,
            async action() {
                signOut && signOut()
            },
        },
    ]


    const customRouter: CustomRouteObject[] = [
        {
            path: "/",
            Id: 'Root',
            PageName: "Trang chung",
            permission: { View: true, Edit: true },
            element: <>Trang chung</>,
            errorElement: <Error />,
            isShowMenu: false,
        },
        {
            path: "/Home",
            Id: 'Home',
            PageName: "Trang chủ",
            permission: { View: true, Edit: true },
            element: <Home />,
            errorElement: <Error />,
            isShowMenu: true,
        },
        {
            path: "/UserInfo",
            Id: 'UserInfo',
            PageName: "Thông tin cá nhân",
            permission: { View: true, Edit: true },
            element: <UserInfo />,
            errorElement: <Error />,
            isShowMenu: false,
        },
        {
            path: "/logout",
            Id: 'logout',
            parentId: "",
            isShowMenu: false,
            async action() {
                signOut && signOut()
            },
        },
    ]

    const router = createBrowserRouter(customRouter as RouteObject[]);
    const menuItems = customRouter.filter(i => i.isShowMenu).map((i) => {
        return {
            key: i.path,
            label: `${i.PageName}`,
            onClick: () => {
                router.navigate(i.path)
            }
        }
    })

    const routerAdmin = createBrowserRouter(customRouterAdmin as RouteObject[]);
    const menuItemsAdmin = customRouterAdmin.filter(i => i.isShowMenu).map((i) => {
        return {
            key: i.path,
            label: `${i.PageName}`,
            onClick: () => {
                router.navigate(i.path)
            }
        }
    })

    if (import.meta.hot) {
        import.meta.hot.dispose(() => router.dispose());
    }

    return {
        router,
        menuItems,

        routerAdmin,
        menuItemsAdmin,

        selectedKeys,
        set_selectedKeys
    }
}

export default useRouterHook