import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'

function AvatarCard({avatar = [], max = 4}) {
  return <Stack direction={'row'} spacing={0.5}>
    <AvatarGroup max={max}>
        <Box width={'5rem'} height={'3rem'} >
            {avatar.map((src, index) => (
                <Avatar
                    key={Math.random() * 100}
                    src={src}
                    alt={`Avatar ${index}`}
                    sx={{
                        width: '3rem',
                        height: '3rem',
                        position: 'absolute',
                        left:{
                            xs: `${0.5 + index}rem`,
                            sm: `${index}rem`,
                            
                        },
                        zIndex: avatar.length - index,
                    }}
                />
            ))}
        </Box>
    </AvatarGroup>
  </Stack>
}

export default AvatarCard