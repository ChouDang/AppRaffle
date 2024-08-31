import React from 'react'
import { Button, Row, Space } from 'antd'

const HeaderAccount = ({
    select,
    onOpenModalUpsert = () => { }
}: {
    select: string[]
    onOpenModalUpsert: (row: any) => void
}) => {
    return (
        <Row className='mb-3'>
            <Space>
                <Button
                    type='primary'
                    onClick={() => onOpenModalUpsert(null)} >
                    Thêm mới
                </Button>
                <Button
                    danger
                    type='primary'
                    disabled={select.length === 0}
                    onClick={() => console.log("click xóa")} >
                    Xóa
                </Button>
            </Space>
        </Row>
    )
}

export default HeaderAccount