import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import {
  useAddGrpMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/extra";

function AddMemberDialog({ chatId }) {
  const dispatch = useDispatch();
  const { isAddmemb } = useSelector((state) => state.extra);

  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGrpMembersMutation
  );

  // const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((i) => i !== userId)
        : [...prev, userId]
    );
  };

  const addMemberHandler = () => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  // console.log(data.allFriends);

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddmemb} onClose={closeHandler}>
      <Stack spacing={"2rem"} width={"20rem"} p={"2rem"}>
        <DialogTitle> Add Member </DialogTitle>

        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.allFriends?.length > 0 ? (
            data?.allFriends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends </Typography>
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>

        <Button onClick={closeHandler} variant="outlined" color={"secondary"}>
            Cancel
          </Button>

          <Button
            disabled={isLoadingAddMembers}
            onClick={addMemberHandler}
            variant="outlined"
            color={"primary"}
          >
            Add
          </Button>

        </Stack>
      </Stack>
    </Dialog>
  );
}

export default AddMemberDialog;
