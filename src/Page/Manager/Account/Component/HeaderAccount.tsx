import React from 'react'
import { Button, Row, Space } from 'antd'

const HeaderAccount = ({
    onOpenModalUpsert = () => { }
}: {
    onOpenModalUpsert: (row: any) => void
}) => {
    return (
        <Row>
            <Space>
                <Button onClick={() => onOpenModalUpsert(null)} >Thêm mới</Button>
                <Button onClick={() => console.log("click xóa")} >Xóa</Button>
            </Space>
        </Row>
    )
}

export default HeaderAccount