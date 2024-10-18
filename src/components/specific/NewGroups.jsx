import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

function NewGroups() {
  const groupName = useInputValidation("");
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    // setMembers(prev =>prev.map(user=>user._id === _id ?{...user, isAdded: !user.isAdded}: user));

    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((currElement)=> currElement !== id) : [...prev, id]));
  };

  const submitHandler = () => {
    console.log(groupName.value);
  };

  const closeHandler = () => {}

  return (
    <Dialog open onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "3rem" }}
        direction={"column"}
        width={"25rem"}
        spacing={"2rem"}
      >
        <DialogTitle textAlign={"center"} variant="h5">
          New Group
        </DialogTitle>
        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label="Group Name"
        ></TextField>
        <Typography textAlign={"center"} variant="body1">
          Select Members
        </Typography>
        <Stack>
          {members.map((u) => (
            <UserItem user={u} key={u._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(u._id)} />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} spacing={"1rem"}>
          <Button variant={"outlined"} size="large" onClick={submitHandler}>
            Create
          </Button>
          <Button variant={"outlined"} size="large" color="error">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default NewGroups;
