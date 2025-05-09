import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from '../Styles/StyledComponents'
import { Box, Stack, Typography } from '@mui/material'
import AvatarCard from './AvatarCard'
import {motion} from 'framer-motion'


function ChatItem({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeletedChat,

}) {

  return (
    <Link
    sx={{padding:'0'}}
    to={`/chat/${_id}`} onContextMenu={(e)=>handleDeletedChat(e, _id, groupChat)}>
        <motion.div 
            initial={{opacity:0, y: '-100%'}}
            whileInView={{opacity:1, y:0}}
            transition={{delay:0.1 * index}}
        style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            borderBottom: '1px solid #ccc',
            backgroundColor: sameSender ? 'black' : 'unset',
            color: sameSender ?'white': 'unset',
            gap: '1rem',
            position: 'relative',
            cursor: 'pointer',
            // textDecoration: 'none',

        }}>
            {/* Avatar card */}
            <AvatarCard avatar={avatar} index={index} name={name} />

            <Stack>
                <Typography>{name}</Typography>
                {
                    newMessageAlert &&(
                        <Typography >{newMessageAlert.count} New Message</Typography>
                    )
                }
            </Stack>

            {
                isOnline && <Box sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'green',
                    position: 'absolute',
                    top: '50%',
                    right: '1rem',
                    transform: 'translateY(-50%)'

                }}></Box>
            }
        </motion.div>   
    </Link>
  )
}

export default memo(ChatItem);