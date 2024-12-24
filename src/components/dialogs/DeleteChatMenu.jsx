import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/extra";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import { useDeleteChatMutation, useLeaveGroupMutation } from "../../redux/api/api";

function DeleteChatMenu({ dispatch, deleteMenuAnchor }) {
    const navigate = useNavigate();

    const { isDeleteMenu, selectedDelChats } = useSelector(
    (state) => state.extra
  );

//   console.log(selectedDelChats);

  const [deleteChat, _ , deleteChatData] = useAsyncMutation(useDeleteChatMutation)

  const [leaveGroup, __ , leaveGroupData] = useAsyncMutation(useLeaveGroupMutation)

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor = null;
  };

  const leaveGroupHandler = () => {
    closeHandler();
    leaveGroup("Leaving Group...", selectedDelChats.chatId);
  };
  const deleteChatHandler = () => {
    closeHandler();
    deleteChat("Deleting Chat...", selectedDelChats.chatId);
  };

  useEffect(()=>{
    if(deleteChatData || leaveGroupData){
        navigate("/");
    }
  },[deleteChatData, leaveGroupData])


  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={selectedDelChats.groupChat ? leaveGroupHandler : deleteChatHandler}
      >
        {selectedDelChats.groupChat ? (
          <>
            {" "}
            <ExitToAppIcon /> <Typography>Leave Group</Typography>{" "}
          </>
        ) : (
          <>
            {" "}
            <DeleteIcon /> <Typography>Delete Chat</Typography>{" "}
          </>
        )}
      </Stack>
    </Menu>
  );
}

export default DeleteChatMenu;
