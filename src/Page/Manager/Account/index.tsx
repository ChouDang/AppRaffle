import { Row } from 'antd'
import React, { useState } from 'react'
import useModalHook from '../../../Hooks/useModalHook'
import HeaderAccount from './Component/HeaderAccount'
import TableAccount from './Component/TableAccount'
import ModalUpsertAccount from './Component/ModalUpsertAccount'

const AccountManagement = () => {

    const [rowEditing, set_rowEditing] = useState<null | User>(null)
    const [select, set_select] = useState<string[]>([])

    const {
        open: openModalUpsert,
        set_open: onOpenModalUpsert,
        set_close: onCloseModelUpsert
    } = useModalHook(set_rowEditing)

    return (
        <section>
            <HeaderAccount
                select={select}
                onOpenModalUpsert={onOpenModalUpsert}
            />
            <TableAccount
                select={select}
                set_select={set_select}
                onOpenModalUpsert={onOpenModalUpsert}
            />
            <ModalUpsertAccount
                rowEditing={rowEditing}
                open={openModalUpsert}
                onClose={onCloseModelUpsert}
            />
        </section>
    )
}

export default AccountManagement