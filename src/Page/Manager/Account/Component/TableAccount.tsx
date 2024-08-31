import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Row, Space, Table, TableColumnsType } from 'antd'
import { Fragment } from 'react'
import { fetchUsers } from '../../../../api/Service/User'
import { converRoleToText } from '../Common'

const TableAccount = ({
    select,
    set_select = () => { },
    onOpenModalUpsert = () => { }
}: {
    select: string[],
    set_select: React.Dispatch<React.SetStateAction<string[]>>,
    onOpenModalUpsert: (row: any) => void
}) => {

    const { data, isFetching } = useQuery<{ Users: UsersList }>({
        queryKey: ['getUserPool'],
        queryFn: fetchUsers,
    })
    console.log(data, "data")
    const columns: TableColumnsType<User> = [
        {
            title: "STT",
            width: 75,
            render: (value, record, index) => {
                let stt = data?.Users.findIndex(i => i.Username === record.Username)
                return <>{stt + 1}</>
            }
        },
        {
            title: "Email",
            width: 200,
            render: (value, record, index) => {
                let email = record?.Attributes.find(i => i.Name === "email")
                return <>{email.Value || 'Dữ liệu chưa cập nhật'}</>
            },
        },
        {
            title: "Số điện thoại",
            width: 200,
            render: (value, record, index) => {
                let sdt = record?.Attributes.find(i => i.Name === "phone_number")
                return <>{sdt.Value || 'Dữ liệu chưa cập nhật'}</>
            },
        },
        {
            title: "Vai trò",
            width: 200,
            render: (value, record, index) => {
                let role = record?.Attributes.find(i => i.Name === "locale")
                return <>{converRoleToText[role?.Value] || 'Dữ liệu chưa cập nhật'}</>
            },
        },
        {
            title: "Hành động",
            width: 100,
            render: (value, record, index) => {
                return <>
                    <Space>
                        <Button type='text' icon={<EditOutlined style={{ color: '#1677ff' }} />} onClick={() => onOpenModalUpsert(record)} />
                        <Button type='text' icon={<DeleteOutlined style={{ color: 'red' }} />} />
                    </Space>
                </>
            },
        },
    ]

    return (
        <Fragment>
            <Row>
                <Table
                    rowKey={"Username"}
                    tableLayout='fixed'
                    loading={isFetching}
                    dataSource={data?.Users || []}
                    columns={columns}
                    rowSelection={{
                        selectedRowKeys: select,
                        onChange: (vl) => set_select(vl as string[]),
                    }}
                />
            </Row>
        </Fragment>
    )
}

export default TableAccount