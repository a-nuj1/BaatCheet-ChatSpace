import { Avatar, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminLayout from "../../components/layout/AdminLayout"
import AvatarCard from '../../components/shared/AvatarCard'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../constants/sampleData'
import { transformUrl } from '../../lib/features'

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
    renderCell: (params) => (<AvatarCard avatar={params.row.avatar} />)
  },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    width: 300,
  },
  {
    field: 'totalMembers',
    headerName: 'Total Members',
    headerClassName: 'table-header',
    width: 120,
  },
  {
    field: 'members',
    headerName: 'Members',
    headerClassName: 'table-header',
    width: 300,
    renderCell:(params)=><AvatarCard max={100} avatar={params.row.members}/>
  },
  {
    field: 'totalMessages',
    headerName: 'Total Messages',
    headerClassName: 'table-header',
    width: 120,
  },
  {
    field: 'creator',
    headerName: 'Creator By',
    headerClassName: 'table-header',
    width: 200,
    renderCell:(params)=>(
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} >
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar}/>
        <span>{params.row.creator.name}</span>
      </Stack>
    )
  }

]

function ChatManagement() {
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    setRows(dashboardData.chats.map((i)=>({
     ...i, 
     id: i._id,
     avatar: i.avatar.map((i)=>transformUrl(i, 50)),
     members: i.members.map((i)=>transformUrl(i.avatar, 50)),
     creator:{
        name: i.creator.name,
        avatar: transformUrl(i.creator.avatar, 50)
     }
    })))
  },[])
  return (
    <AdminLayout>
        <Table rows={rows} columns={columns}  heading={'All Chats'}/>
    </AdminLayout>
  )
}

export default ChatManagement