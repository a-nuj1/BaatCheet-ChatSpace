import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/colors";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/Styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEFT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/extra";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loaders";
import { useNavigate } from "react-router-dom";

// const user = {
//   _id: 'abc',
//   name: 'chaman'
// }

function Chat({ chatId, user }) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAncor, setFileMenuAncor] = useState(null);

  const [ImTyping, setImTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  // console.log(oldMessagesChunk.data?.totalPages);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  // console.log("OldMessages",oldMessages);

  const members = chatDetails?.data?.chat?.members;

  const messageChnageHandler = (e) => {
    setMessage(e.target.value);
    if (!ImTyping) {
      socket.emit(START_TYPING, { chatId, members });
      setImTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { chatId, members });
      setImTyping(false);
    }, [2000]);

    //emitting typing event
    // socket.emit(START_TYPING, { chatId, members });
  };

  const handleFileOpen = (e) => {
    // e.preventDefault();
    dispatch(setIsFileMenu(true));
    setFileMenuAncor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (message.trim().length === 0) return;

    //emitting message for server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, {userId: user._id, members});

    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setOldMessages([]);
      setMessages([]);
      setPage(1);
      socket.emit(CHAT_LEFT, {userId: user._id, members});
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   if(!chatDetails.data?.chat)return navigate("/")
  // },[chatDetails.data]);

  useEffect(()=>{
    if(chatDetails.isError)return navigate("/")
  },[chatDetails.isError])
 
  

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const messageListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const alertListner = useCallback(
    (data) => {
      if(data.chatId !== chatId) return;
      const messaegForAlert = {
        content:data.message,
        sender: {
          _id: "abfdgdsdfds",
          name: "admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messaegForAlert]);
    },
    [chatId]
  );

  const eventHandlers = {
    [ALERT]: alertListner,
    [NEW_MESSAGE]: messageListner,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandlers);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton></Skeleton>
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i, index) => (
          <MessageComponent
            key={i._id || `message-${index}`}
            message={i}
            user={user}
          />
        ))}

        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "10deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type your message..."
            value={message}
            onChange={messageChnageHandler}
          />

          <IconButton
            type="submit"
            sx={{
              bgcolor: orange,
              color: "black",
              marginLeft: "1rem",
              // rotate: '-30deg',
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "#085e2f",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAncor} chatId={chatId} />
    </>
  );
}

export default AppLayout()(Chat);
