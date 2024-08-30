import React, { useEffect } from 'react'
import { fetchUsers } from '../../../../api/Service/User'

const TableAccount = () => {

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>TableAccount</div>
    )
}

export default TableAccount