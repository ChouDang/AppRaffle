import { Col, Divider, Row } from 'antd'
import { Fragment } from 'react'
import Avatar from './Component/Avatar'
import UserDetail from './Component/UserDetail'

const UserInfo = () => {
    return (
        <Fragment>
            <Row wrap={false}>
                <Col style={{ width: 200 }}><Avatar /></Col>
                <Divider type="vertical" style={{ height: "auto" }} />
                <Col style={{
                    width: "100%",
                    margin: "0 auto",
                    padding: 12,
                }}>
                    <UserDetail />
                </Col>
            </Row>
        </Fragment>
    )
}

export default UserInfo