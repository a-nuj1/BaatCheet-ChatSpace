import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Skeleton } from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { transformUrl } from "../../lib/features";
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
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar src={params.row.avatar} alt={params.row.name} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "frdCnt",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "grpCnt",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 150,
  },
];

function UserManagement() {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/users`,
    "dashboard-users"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  // console.log(data);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(data){
      setRows(
        data.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformUrl(i.avatar, 50),
        }))
      );
    }
  }, [data]);
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={'100vh'} />
      ) : (
        <Table rows={rows} columns={columns} heading={"All Users"} />
      )}
    </AdminLayout>
  );
}

export default UserManagement;
