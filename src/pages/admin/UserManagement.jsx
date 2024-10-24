import React, { useEffect, useState } from 'react'
import AdminLayout from "../../components/layout/AdminLayout"
import Table from '../../components/shared/Table'
import { Avatar } from '@mui/material'
import {dashboardData} from '../../constants/sampleData'
import {transformUrl} from '../../lib/features'

const columns = [{
    field: 'id',
    headerName: 'ID',
    width: 200,
    headerClassName: 'table-header',
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    headerClassName: 'table-header',
    width: 150,
    renderCell: (params) => (<Avatar src={params.row.avatar} alt={params.row.name} />)
  },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'username',
    headerName: 'Username',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'friends',
    headerName: 'Friends',
    headerClassName: 'table-header',
    width: 150,
  },
  {
    field: 'groups',
    headerName: 'Groups',
    headerClassName: 'table-header',
    width: 150,
  },

]

function UserManagement() {
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    setRows(dashboardData.users.map((i)=>({
      ...i, id:i._id, avatar: transformUrl(i.avatar, 50)
    })))
  },[])
  return (
    <AdminLayout>
        <Table rows={rows} columns={columns}  heading={'All Users'}/>
    </AdminLayout>
  )
}

export default UserManagement