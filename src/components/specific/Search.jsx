import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchUserQuery, useSenFriendRequestMutation } from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/extra";
import UserItem from "../shared/UserItem";

import { useAsyncMutation } from "../../hooks/hook";



function Search() {

  const {isSearch} = useSelector(state => state.extra);
  
  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendReqest, addFriendIsLoading] = useAsyncMutation(useSenFriendRequestMutation);
  
  const dispatch = useDispatch();


  const search = useInputValidation("");


  const [user, setUser] = useState([]);

  // sending friend request handler
  const addFriendHanlder = async(id) => {
    await sendFriendReqest("Sending friend request...", {userId: id});
    
  };

  const searchCloseHandler = ()=>dispatch(setIsSearch(false));

  useEffect(()=>{

    const timeOut = setTimeout(()=>{
      searchUser(search.value)
      .then(({data})=>setUser(data.users))
      .catch((error)=>console.log(error));
    }
    , 1000);

   return ()=>{
      clearTimeout(timeOut);
   }

  }, [search.value])

  return (
    <Dialog open = {isSearch} onClose={searchCloseHandler}>
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
