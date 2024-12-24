/* eslint-disable react/display-name */
import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constants/events";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveFromLocalStorage } from "../../lib/features";
import { useMyChatsQuery } from "../../redux/api/api";
import {
  incrementNotificationCnt,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import {
  setIsDeleteMenu,
  setIsMobileMenu,
  setSelectedDelChats,
} from "../../redux/reducers/extra";
import { getSocket } from "../../socket";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import Title from "../shared/Title";
import Chatlist from "../specific/Chatlist";
import Profile from "../specific/Profile";
import Header from "./Header";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const delteMenuAnchor = useRef(null);


    const [onlineUsers, setOnlineUsers] = useState([]);





    const socket = getSocket();
    // console.log(socket.id);



    const { isMobileMenu } = useSelector((state) => state.extra);
    const { user } = useSelector((state) => state.auth);

    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery();

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromLocalStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);

    const handleMobileMenuClose = () => {
      dispatch(setIsMobileMenu(false));
    };

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDelChats({ chatId, groupChat }));
      delteMenuAnchor.current = e.currentTarget;

      // console.log("Deleted Chat", _id, groupChat);
    };

    const newMessageAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotificationCnt());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUserListner = useCallback((data) => {
      setOnlineUsers(data);



    }, []);

    const eventHanlders = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUserListner,
    };
    useSocketEvents(socket, eventHanlders);

    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={delteMenuAnchor.current}
        />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileMenuClose}>
            <Chatlist
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"} spacing={0}>
          {/* First Section */}
          <Grid
            item
            xs={0}
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height="100%"
            overflow="hidden"
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <Chatlist
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>

          {/* Second Section (Main Content) */}
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={6}
            height="100%"
            overflow="hidden"
          >
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>

          {/* Third Section */}
          <Grid
            item
            xs={0}
            md={3}
            lg={3}
            height="100%"
            sx={{
              display: { xs: "none", md: "block" },
              padding: "1rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
            overflow="hidden"
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
