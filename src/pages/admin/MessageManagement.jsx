import React, { useEffect, useState } from 'react'
import AdminLayout from "../../components/layout/AdminLayout"
import Table from '../../components/shared/Table'
import { Avatar, Box, Stack } from '@mui/material'
import {dashboardData} from '../../constants/sampleData'
import {fileFormate, transformUrl} from '../../lib/features'
import moment from 'moment'
import RenderAttachment from '../../components/shared/RenderAttachment'

const columns = [{
    field: 'id',
    headerName: 'ID',
    width: 200,
    headerClassName: 'table-header',
  },
  {
    field: 'attachments',
    headerName: 'Attachments',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => {

      const {attachments} = params.row;
      return attachments.length > 0 ? attachments.map((i, index) => {
        const url = i.url;
        const file = fileFormate(url);
      
        return <Box key={index}>
          <a href={url} download
          target='_blank' rel='noreferrer' style={{
            color: 'black'
          }}>
            {RenderAttachment(file, url)}
          </a>
        </Box>
      }) : "No Attachments"

    }
  },

  {
    field: 'content',
    headerName: 'Content',
    headerClassName: 'table-header',
    width: 400,
  },

  {
    field: 'sender',
    headerName: 'Sent By',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => (<Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
      <Avatar src={params.row.sender.avatar} alt={params.row.sender.name} />
      <span>{params.row.sender.name}</span>
    </Stack>)
  },
  {
    field: 'chat',
    headerName: 'Chat',
    headerClassName: 'table-header',
    width: 220,
  },
  {
    field: 'groupChat',
    headerName: 'Group Chat',
    headerClassName: 'table-header',
    width: 100,
  },
  {
    field: 'createdAt',
    headerName: 'Created Time',
    headerClassName: 'table-header',
    width: 250,
  }

]

function MessageManagement() {
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    setRows(dashboardData.messages.map((i)=>({
      ...i,
      id:i._id, 
      sender:{
        name:i.sender.name,
        avatar:transformUrl(i.sender.avatar, 50)
      },
      createdAt: moment(i.createdAt).format('MMMM Do YYYY, h:mm:ss a')
    })))
  },[])
  return (
    <AdminLayout>
        <Table rows={rows} columns={columns}  heading={'All Messages'} rowHeight={100}/>
    </AdminLayout>
  )
}


export default MessageManagement