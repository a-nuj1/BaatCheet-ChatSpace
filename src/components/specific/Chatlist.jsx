/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Stack } from '@mui/material';
import React from 'react'
import ChatItem from '../shared/ChatItem';

function Chatlist({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [
      {
        chatId: "",
        count: 1,
      },
    ], handleDeleteChat,
  }) {
    return <Stack width={w} direction={'column'} overflow={'auto'} height={'100%'}>
      {
          chats?.map((data,index) =>{
            const {avatar, _id, name, groupChat,members } = data;
            const newMessageAlert = newMessagesAlert.find((alert) => alert.chatId === _id);

            const isOnline = members?.some((member) => onlineUsers.includes(member));

            return <ChatItem 
            index={index}
            newMessageAlert={newMessageAlert} 
            isOnline={isOnline}
            avatar={avatar}
            _id={_id}
            name={name}
            groupChat={groupChat}
            key={_id}
            sameSender={chatId === _id}
            handleDeletedChat={handleDeleteChat}
            
            />
          })
      }
  
    </Stack>;
  }

export default Chatlist