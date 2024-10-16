/* eslint-disable react/display-name */
import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import Chatlist from "../specific/Chatlist";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
      const params = useParams();
      const chatId = params.chatId;

      const handleDeleteChat = (e, _id, groupChat) => {
        e.preventDefault();
        console.log("Deleted Chat", _id, groupChat);
      }


    return (
      <>
        <Title />
        <Header />
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
            <Chatlist 
            chats={sampleChats} 
            chatId={chatId}
            handleDeleteChat={handleDeleteChat}
            // newMessagesAlert={[
            //   {
            //     chatId,
            //     count:4
            //   }
            // ]}
            // onlineUsers={['1','2','3']}
            />
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
            <WrappedComponent {...props} />
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
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
