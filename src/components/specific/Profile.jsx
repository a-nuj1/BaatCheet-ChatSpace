import React from "react";
import { Avatar, Icon, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";

import moment from "moment";

function Profile() {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: "10rem",
          height: "10rem",
          objectFit: "contain",
          marginBottom: "1rem",
          border: "2px solid white",
        }}
      />
      <ProfileCard 
        heading={"bio"} 
        text={"sada haq ethe rakh"} 
       />

      <ProfileCard
        heading={"Username"}
        text={"anujgupta"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard
        heading={"Name"}
        text={"Anuj Kumar Gupta"}
        Icon={<FaceIcon />}
      />

      <ProfileCard
        heading={"Joined"}
        text={moment("2024-08-06T18:30:00.000Z").fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
}

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    spacing={"1rem"}
    direction={"row"}
    alignItems={"center"}
    textAlign={"center"}
    color={"white"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color="gray" variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
