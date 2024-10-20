import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

function AddMemberDialog({ addMember, isLoadingMember, chatId }) {

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (userId) => {
        setSelectedMembers((prev) => prev.includes(userId) ? prev.filter((i) => i !== userId) : [...prev, userId]);
    }

    const addMemberHandler = () => {
        closeHandler();
    }
    const closeHandler = () => {
        setMembers([]);
        setSelectedMembers([]);
    }
  return (
    <Dialog open onClose={closeHandler}>
      <Stack spacing={"2rem"} width={"20rem"} p={"2rem"}>
        <DialogTitle> Add Member </DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((i) => (
              <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded = {
                selectedMembers.includes(i._id)
              } />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends </Typography>
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button disabled = {isLoadingMember} onClick={addMemberHandler} variant="outlined" color={"primary"}>
            Add
          </Button>
          <Button onClick={closeHandler} variant="outlined" color={"secondary"}>
            
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default AddMemberDialog;
