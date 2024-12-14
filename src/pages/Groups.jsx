/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { bgColrGrad, metBlack } from "../constants/colors";
import { Link } from "../components/Styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";
import { useAddGrpMembersMutation, useChatDetailsQuery, useMyGroupsQuery, useRemoveGrpMemberMutation, useRenameGrpMutation } from "../redux/api/api";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { LayoutLoader } from "../components/layout/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/extra";
const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

// const isAddMember = false;g

function Groups() {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isAddmemb} = useSelector((state) => state.extra);

  const myGroups = useMyGroupsQuery();

  // console.log(myGroups.data);

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  // console.log(groupDetails?.data?.chat?.members);


  // const members = groupDetails?.data?.chat?.members || [];

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGrpMutation)

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGrpMemberMutation)


  

  const [isMobile, setIsMobile] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [grpName, setGrpName] = useState("");
  const [grpNameUpdate, setGrpNameUpdate] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [members, setMembers] = useState([]);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];
  useErrors(errors);
  useEffect(() => {
    if(groupDetails.data){
      setGrpName(groupDetails.data.chat.name);
      setGrpNameUpdate(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members)
    }

    return ()=>{
      setGrpName("");
      setGrpNameUpdate("");
      setMembers([]);
      setIsEdit(false);
    }

  }, [groupDetails.data]);

  
  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const handleMobileClose = () => {
    setIsMobile(false);
  };

  const updateGrpNameHandler = () => {
    setIsEdit(false);
    updateGroup( "Updating Group Name..." ,{name: grpNameUpdate, chatId})
  };


  const addMemberHandler = () => {
    dispatch(setIsAddMember(true));

  };

  const openConfirmDeleteHandler = () => {
    setConfirmDelete(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDelete(false);
  };
  const deleteHandler = () => {
    // closeConfirmDeleteHandler();
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", {chatId, userId})
    // console.log(id);
  };

  useEffect(() => {
    if (chatId) {
      setGrpName(`Group Name ${chatId}`);
      setGrpNameUpdate(`Group Name ${chatId}`);
    }
    return () => {
      setGrpName("");
      setGrpNameUpdate("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconBtn = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            top: "1rem",
            right: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            "&:hover": {
              bgcolor: metBlack,
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={grpNameUpdate}
            onChange={(e) => setGrpNameUpdate(e.target.value)}
          />
          <IconButton onClick={updateGrpNameHandler}
            disabled={isLoadingGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant={"h4"}>{grpName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}
           disabled={isLoadingGroupName}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Remove Member
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={addMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        // bgcolor={"bisque"}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <GroupsList myGroups={myGroups?.data?.chats} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        // bgcolor={'lightblue'}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem 3rem",
          position: "relative",
          alignItems: "center",
        }}
      >
        {IconBtn}
        {grpName && (
          <>
            {GroupName}
            <Typography variant={"h6"}>Group Members</Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"1rem"}
              // bgcolor={'bisque'} // remove this
              height={"50vh"}
              overflow={"auto"}
            >
              {/* {members} */}
              {members.map((i) => (
                <UserItem
                  user={i}
                  key={i._id}
                  isAdded
                  styling={{
                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>
      {isAddmemb && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId}/>
        </Suspense>
      )}

      {confirmDelete && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDelete}
            handleClose={closeConfirmDeleteHandler}
          />
          deleteHandler={deleteHandler}
        </Suspense>
      )}

      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
        }}
        open={isMobile}
        onClose={handleMobileClose}
      >
        <GroupsList
          w={"50vw"}
          myGroups={myGroups?.data?.chats}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
}

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      sx={{
        backgroundImage: bgColrGrad,
        height: "100vh",
        overflow: "auto",
      }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItems group={group} key={group._id} chatId={chatId} />
        ))
      ) : (
        <Typography
          variant="h6"
          textAlign={"center"}
          padding={"1rem"}
          sx={{ mt: "2rem" }}
        >
          No groups found
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItems = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
