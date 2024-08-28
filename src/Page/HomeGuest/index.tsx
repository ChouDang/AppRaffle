import React from 'react'
import { Button, Card } from 'antd'

const HomeGuest = ({
    set_loginAction = () => { }
}: {
    set_loginAction: (vl: boolean) => void
}) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
            justifyContent: "center",
            background: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,70,1) 100%)'
        }}>
            <Card title="Welcome to ChouDang Raffle App!" bordered={false}>
                <p>Hãy đăng nhập để tiếp tục vì đây là trang khách</p>
                <Button className='mt-3' type='primary' onClick={() => set_loginAction(true)}>
                    Nhấn vào đây để đăng nhập
                </Button>
            </Card>
        </div>
    )
}

export default HomeGuest