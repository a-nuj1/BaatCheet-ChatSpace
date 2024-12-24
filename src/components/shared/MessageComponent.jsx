import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { ligtBlue } from "../../constants/colors";
import moment from "moment";
import { fileFormate } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import {motion} from 'framer-motion'

function MessageComponent({ message, user }) {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0 , x: '-100%'}}
      whileInView={{ opacity: 1, x: 0}}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        padding: "0.5rem",
        borderRadius: "5px",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={ligtBlue} fontWeight={"600"} variant="caption">
          {" "}
          {sender.name}{" "}
        </Typography>
      )}
      {content && <Typography> {content} </Typography>}
      {attachments.length > 0 &&
        attachments.map((attachment, i) => {
          const url = attachment.url;
          const file = fileFormate(url);
          return (
            <Box key={i}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                  // textDecoration: 'none',
                  // display: 'flex',
                  // alignItems: 'center',
                }}
              >
                {RenderAttachment({ file, url })}
              </a>
            </Box>
          );
        })}
      <Typography variant="caption" color="text.secondary">
        {timeAgo}
      </Typography>
    </motion.div>
  );
}

export default memo(MessageComponent);
