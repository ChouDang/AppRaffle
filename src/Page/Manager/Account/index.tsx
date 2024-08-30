import { Row } from 'antd'
import React, { useState } from 'react'
import useModalHook from '../../../Hooks/useModalHook'
import HeaderAccount from './Component/HeaderAccount'
import TableAccount from './Component/TableAccount'
import ModalUpsertAccount from './Component/ModalUpsertAccount'

const AccountManagement = () => {

    const [rowEditing, set_rowEditing] = useState(null)

    const {
        open: openModalUpsert,
        set_open: onOpenModalUpsert,
        set_close: onCloseModelUpsert
    } = useModalHook(set_rowEditing)

    return (
        <section>
            <Row>
                <HeaderAccount
                    onOpenModalUpsert={onOpenModalUpsert}
                />
                <TableAccount />
                <ModalUpsertAccount />
            </Row>
        </section>
    )
}

export default AccountManagement