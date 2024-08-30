import { useQuery } from '@tanstack/react-query';
import { AuthUser, fetchAuthSession } from 'aws-amplify/auth';
import { useMemo, useState } from 'react';
import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';
import Error from '../Page/Error';
import Home from '../Page/Home';
import UserManagement from '../Page/Manager/User';
import UserInfoPage from '../Page/UserInfo';
import StoreOwnerManagement from '../Page/Manager/StoreOwner';
import RaffleManagement from '../Page/Manager/Raffle';
import ActivityHistory from '../Page/ActivityHistory';
import AccountManagement from '../Page/Manager/Account';
import RaffleReport from '../Page/RaffleReport';
import ConfigApp from '../Page/ConfigApp';
import PermissionManagement from '../Page/Manager/Permission';
import CustomerSupport from '../Page/CustomerSupport';
import { Router } from '@remix-run/router';

export type CustomRouteObject = RouteObject & {
    isShowMenu: boolean,
    PageName?: string,
    children?: CustomRouteObject[],
};

const useRouterHook = ({
    signOut,
    user,
}: {
    signOut: ((data?: any) => void) | undefined,
    user: AuthUser | undefined
}) => {
    const [selectedKeys, set_selectedKeys] = useState<string[]>([])
    const { data: UserInfo } = useQuery({
        queryKey: ["UserInfo"],
        queryFn: () => fetchAuthSession(),
        enabled: !!user
    })
    const isAdmin = useMemo(() => UserInfo && UserInfo?.tokens?.accessToken?.payload?.["cognito:groups"][0] === 'Admin', [UserInfo])
    const isStoreOwner = useMemo(() => UserInfo && UserInfo?.tokens?.accessToken?.payload?.["cognito:groups"][0] === 'StoreOwner', [UserInfo])
    const isUser = useMemo(() => UserInfo && UserInfo?.tokens?.accessToken?.payload?.["cognito:groups"][0] === 'User', [UserInfo])
    const customRouterAdmin: CustomRouteObject[] = [
        {
            path: "/",
            PageName: "Trang quản lý",
            handle: {
                permissionCode: null
            },
            element: <>Trang quản lý Admin thống kê tổng quan ứng dụng ở đây</>,
            errorElement: <Error />,
            isShowMenu: false,
        },
        {
            path: "/UserInfo",
            PageName: "Thông tin cá nhân",
            handle: {
                permissionCode: null
            },
            element: <UserInfoPage />,
            errorElement: <Error />,
            isShowMenu: false,
        },
        {
            path: "/Management",
            PageName: "Quản lý",
            element: <Outlet />,
            // errorElement: <Error />,
            isShowMenu: true,
            children: [
                {
                    path: "/Management/Permission",
                    PageName: "Quản lý quyền",
                    handle: {
                        permissionCode: null
                    },
                    element: <PermissionManagement />,
                    errorElement: <Error />,
                    isShowMenu: true,
                },
                {
                    path: "/Management/Account",
                    PageName: "Quản lý tài khoản",
                    handle: {
                        permissionCode: null
                    },
                    element: <AccountManagement />,
                    errorElement: <Error />,
                    isShowMenu: true,
                },
                {
                    path: "/Management/StoreOwner",
                    PageName: "Quản lý đại lý",
                    handle: {
                        permissionCode: null
                    },
                    element: <StoreOwnerManagement />,
                    errorElement: <Error />,
                    isShowMenu: true,
                },
                {
                    path: "/Management/User",
                    PageName: "Quản lý người dùng",
                    handle: {
                        permissionCode: null
                    },
                    element: <UserManagement />,
                    errorElement: <Error />,
                    isShowMenu: true,
                },
                {
                    path: "/Management/Raffle",
                    PageName: "Quản lý Raffle",
                    handle: {
                        permissionCode: null
                    },
                    element: <RaffleManagement />,
                    errorElement: <Error />,
                    isShowMenu: true,
                },
            ]
        },
        {
            path: "/RaffleReport",
            PageName: "Thống kê và báo cáo Raffle",
            handle: {
                permissionCode: null
            },
            element: <RaffleReport />,
            errorElement: <Error />,
            isShowMenu: true,
        },
        {
            path: "/ActivityHistory",
            PageName: "Lịch sử hoạt động",
            handle: {
                permissionCode: null
            },
            element: <ActivityHistory />,
            errorElement: <Error />,
            isShowMenu: true,
        },
        {
            path: "/ConfigApp",
            PageName: "Cấu hình hệ thống",
            handle: {
                permissionCode: null
            },
            element: <ConfigApp />,
            errorElement: <Error />,
            isShowMenu: true,
        },
        {
            path: "/CustomerSupport",
            PageName: "Hỗ trợ khách hàng",
            handle: {
                permissionCode: null
            },
            element: <CustomerSupport />,
            errorElement: <Error />,
            isShowMenu: true,
        },
        {
            path: "/logout",
            isShowMenu: false,
            async action() {
                signOut && signOut()
            },
        },
    ]

    const customRouterStoreOwner: CustomRouteObject[] = [
        {
            path: "/",
            PageName: "Trang quản lý",
            element: <>Trang quản lý StoreOwner thống kê tổng quan của đại lý</>,
            errorElement: <Error />,
            isShowMenu: false,
        },
        {
            path: "/UserInfo",
            PageName: "Thông tin cá nhân",
            element: <UserInfoPage />,
            errorElement: <Error />,
            isShowMenu: false,
        },
        {
            path: "/Management",
            PageName: "Quản lý",
            element: <Outlet />,
            errorElement: <Error />,
            isShowMenu: true,
            children: [
                {
                    path: "/Management/Raffle",
                    PageName: "Quản lý Raffle",
                    handle: {
                        permissionCode: null
                    },
                    element: <RaffleManagement />,
                    errorElement: <Error />,
                    isShowMenu: true,
                },
            ]
        },
        {
            path: "/RaffleReport",
            PageName: "Thống kê và báo cáo Raffle",
            handle: {
                permissionCode: null
            },
            element: <RaffleReport />,
            errorElement: <Error />,
            isShowMenu: true,
        },
        {
            path: "/ActivityHistory",
            PageName: "Lịch sử hoạt động",
            handle: {
                permissionCode: null
            },
            element: <ActivityHistory />,
            errorElement: <Error />,
            isShowMenu: true,
        },
        {
            path: "/logout",
            isShowMenu: false,
            async action() {
                signOut && signOut()
            },
        },
    ]
    const customRouter: CustomRouteObject[] = [
        {
            path: "/",
            PageName: "Trang chung",
            element: <>Trang chung</>,
            errorElement: <Error />,
            isShowMenu: false,
        },
        {
            path: "/Home",
            PageName: "Trang chủ",
            element: <Home />,
            errorElement: <Error />,
            isShowMenu: true,
        },
        {
            path: "/UserInfo",
            PageName: "Thông tin cá nhân",
            element: <UserInfoPage />,
            errorElement: <Error />,
            isShowMenu: false,
        },
        {
            path: "/logout",
            isShowMenu: false,
            async action() {
                signOut && signOut()
            },
        },
    ]
    const Route_NotFound: CustomRouteObject = {
        path: "*",
        isShowMenu: false,
        handle: {
            permissionCode: null
        },
        element: <Error />
    };
    const buildMenuItems = (_routes: CustomRouteObject[], _router: Router) => {
        return _routes
            .filter((item) => item.isShowMenu)
            .map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                return {
                    key: item.path,
                    label: item.PageName,
                    onClick: () => !hasChildren && _router.navigate(item.path),
                    children: hasChildren ? buildMenuItems(item.children, _router) : undefined,
                };
            });
    };

    const routesByRole: RouteObject[] = useMemo(() => {
        if (isAdmin) return [...customRouterAdmin, Route_NotFound]
        if (isStoreOwner) return [...customRouterStoreOwner, Route_NotFound]
        return [...customRouter, Route_NotFound]
    }, [isAdmin, isStoreOwner, isUser]);
    let router = createBrowserRouter(routesByRole);
    const menuItemsAdmin = buildMenuItems(customRouterAdmin, router)
    const menuItemsStoreOwner = buildMenuItems(customRouterStoreOwner, router)
    const menuItems = buildMenuItems(customRouter, router)

    if (import.meta.hot) {
        import.meta.hot.dispose(() => router.dispose());
    }

    return {
        router: router,
        menuItems: isAdmin ? menuItemsAdmin : isStoreOwner ? menuItemsStoreOwner : menuItems || [],

        selectedKeys,
        set_selectedKeys
    }
}

export default useRouterHook