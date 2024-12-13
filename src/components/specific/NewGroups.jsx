import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGrp } from "../../redux/reducers/extra";
import toast from "react-hot-toast";

function NewGroups() {
  const dispatch = useDispatch();

  const {isNewGrp} = useSelector((state) => state.extra);

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup, newGroupLoading] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");
  // const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);


  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  const selectMemberHandler = (id) => {
    // setMembers(prev =>prev.map(user=>user._id === _id ?{...user, isAdded: !user.isAdded}: user));

    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if(!groupName.value){
      return toast.error("Group Name is required");
    }
    if(selectedMembers.length < 2)return toast.error("Select atleast 2 members");


    // console.log(groupName.value, selectedMembers);

    newGroup( "Creating New Group..." ,{name: groupName.value, members: selectedMembers});



    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGrp(false))
  };

  return (
    <Dialog open = {isNewGrp} onClose={closeHandler}>
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
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.allFriends?.map((u) => (
              <UserItem
                user={u}
                key={u._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(u._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"center"} spacing={"1rem"}>
          <Button variant={"outlined"} size="large"     color="error"
            onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant={"outlined"} size="large" onClick={submitHandler} disabled = {newGroupLoading} >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default NewGroups;
