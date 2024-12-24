import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { fileFormate, transformUrl } from "../../lib/features";
import moment from "moment";
import RenderAttachment from "../../components/shared/RenderAttachment";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    headerClassName: "table-header",
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments.length > 0
        ? attachments.map((i, index) => {
            const url = i.url;
            const file = fileFormate(url);

            return (
              <Box key={index}>
                <a
                  href={url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },

  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },

  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar src={params.row.sender.avatar} alt={params.row.sender.name} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Created Time",
    headerClassName: "table-header",
    width: 250,
  },
];

function MessageManagement() {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/messages`,
    "dashboard-messages"
  );



  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  // TODO: Data not coming from the server problem in either useFetchData or cleint side
  // console.log(data);
  // console.log(error);
  // on login error this error is coming
  //  [Cannot read properties of null (reading '_id')]


  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.messages.map((i) => ({
          ...i,
          id: i._id,
          sender: {
            name: i.sender.name,
            avatar: transformUrl(i.sender.avatar, 50),
          },
          createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={'100vh'} />
      ) : (
        <Table
          heading={"All Messages"}
          rows={rows}
          columns={columns}
          rowHeight={200}
        />
      )}

    </AdminLayout>
  );
}

export default MessageManagement;
