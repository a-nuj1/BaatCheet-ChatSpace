import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/extra";
import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";

import toast from "react-hot-toast"
import { useSendAttachmentsMutation } from "../../redux/api/api";

function FileMenu({ anchorE1 ,chatId}) {
  const dispatch = useDispatch();

  const { isFileMenu } = useSelector((state) => state.extra);
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const closeFileMenue = () => dispatch(setIsFileMenu(false));

  const selectImage = ()=>imageRef.current?.click();
  const selectAudio = ()=>audioRef.current?.click();
  const selectVideo = ()=>videoRef.current?.click();
  const selectFile  = ()=>fileRef.current?.click();

  const fileChangeHandler = async(e, key) => {
    const files = Array.from(e.target.files);

    if(files.length <= 0)return;

    if(files.length > 5)return toast.error(`You can only upload 5 ${key} at a time`);

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenue();

    try {
      const myForm = new FormData();
      myForm.append('chatId', chatId);
      files.forEach((file)=>myForm.append("files", file))


      //we will do fetching here
      const res = await sendAttachments(myForm);

      if(res.data)toast.success(`${key} sent successfully`, { id: toastId });
      
      else toast.error(`Failed to send ${key}`, { id: toastId });

    } catch (error) {
      toast.error(error, { id: toastId });
    }finally{
      dispatch(setUploadingLoader(false));
      // closeFileMenue();
    }
  };

  return (
    <Menu open={isFileMenu} anchorEl={anchorE1} onClose={closeFileMenue}>
      <div
        style={{
          width: "10rem",
        }}
      >
        <MenuList>
          <MenuItem onClick={selectImage}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>

          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg, audio/wav, audio/ogg, audio/*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>

          <MenuItem onClick={selectVideo}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg, video/*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>

          <MenuItem onClick={selectFile}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="file/*, file/pdf, file/doc, file/docx, file/xls, file/xlsx, file/ppt, file/pptx"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
}

export default FileMenu;
