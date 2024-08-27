import React, { useEffect, useState } from 'react'
import { Breadcrumb as BreadcrumbAntd } from 'antd'
import { CustomRouteObject } from '../../Hooks/useRouterHook'

const Breadcrumb = ({
    customRouter
}: {
    customRouter: CustomRouteObject[]
}) => {

    const [breadcrumbs, set_breadcrumbs] = useState<string[]>([])

    useEffect(() => {
        if (customRouter.length) {
            let findBreadCrumb = customRouter.find(i => i.path === location.pathname)
            set_breadcrumbs([findBreadCrumb?.PageName as string || ""])
        }
    }, [customRouter, location.pathname])

    return (
        <BreadcrumbAntd style={{ margin: '16px 0' }}>
            {!!breadcrumbs.length && breadcrumbs.map(pageName => {
                return <BreadcrumbAntd.Item>{pageName}</BreadcrumbAntd.Item>
            })}
        </BreadcrumbAntd>
    )
}

export default Breadcrumb