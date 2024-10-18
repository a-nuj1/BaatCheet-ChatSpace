import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";

import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";



function Search() {
  const search = useInputValidation("");
  const addFriendIsLoading = false;

  const [user, setUser] = useState(sampleUsers);
  const addFriendHanlder = (id) => {
    console.log(id);
  };

  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {user.map((u) => (
            <UserItem
              user={u}
              key={u._id}
              handler={addFriendHanlder}
              handlerIsLoading={addFriendIsLoading}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
}

export default Search;
