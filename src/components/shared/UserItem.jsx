import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

function UserItem({ user, handler, handlerIsLoading, isAdded = false}) {
  const { name, email, _id } = user;
  return (
    <ListItem >
      <Stack
        direction={"row"}
        alignItems={"center"}
        width={"100%"}
        spacing={"1rem"}
      >
        <Avatar />
        <Typography
          variant={"body1"}
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: '100%',
          }}
        >
          {name}
        </Typography>
        <IconButton 
          size="small"
          sx={{
            bgcolor: isAdded?"error.main": "primary.main",
            color: "white",
            "&:hover": { bgcolor:isAdded?"error.dark": "primary.dark" },
          }}
        
          onClick={() => handler(_id)} disabled={handlerIsLoading}>
            {
              isAdded ? <RemoveIcon />: <AddIcon />
            }
          {/* <AddIcon /> */}
        </IconButton>
      </Stack>
    </ListItem>
  );
}

export default memo(UserItem);