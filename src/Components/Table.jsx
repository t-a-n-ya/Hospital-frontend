import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { GET_PATIENT, GET_CONTACTINFO, GET_NEXTTOKIN } from "../Api/apiPath";
import { getCall } from "../Api/helpers";
import AddBtn from "../UiComponents/AddBtn"
import EditBtn from "../UiComponents/EditBtn"
import DeleteBtn from "../UiComponents/DeleteBtn"
import Details from "./Details";

export default function Table() {
  const [patients, setpatients] = useState([]);
  const [contact, setcontact] = React.useState([]);
  const [kindetails, setkindetails] = React.useState([]);
  const [shouldTableUpdate, setShouldTableUpdate] = useState(true);

  const patient = [
    {
      field: "reg_no",
      headerName: "REGISTRATION",
      flex: 1,
    },
    { field: "p_name", headerName: "patient name", flex: 1 },
    { field: "p_Age", headerName: "patient Age", flex: 1 },
    {
      field: "action",
      headerName: "View",
      sortable: false,
      flex: 1,
      marginLeft: "10px",
      disableColumnMenu: true,
      headerClassName: "table_actions_column",
      align: "center",
      renderCell: (cellValues) => (
        <Details cellValues={cellValues} patients={patients} contact={contact} kindetails={kindetails} />
      )
    },
    {
      field: "actions",
      headerName: "Edit",
      sortable: false,
      flex: 1,
      disableColumnMenu: true,
      headerClassName: "table_actions_column",
      align: "center",
      renderCell: (cellValues) => (
        <EditBtn cellValues={cellValues} setShouldTableUpdate={setShouldTableUpdate}>Edit</EditBtn>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      flex: 1,
      marginLeft: "10px",
      disableColumnMenu: true,
      headerClassName: "table_actions_column",
      align: "center",
      renderCell: (cellValues) => (
        <DeleteBtn cellValues={cellValues} setShouldTableUpdate={setShouldTableUpdate}>Delete</DeleteBtn>
      ),
    },
  ];

  const getApiData = async () => {
    if (shouldTableUpdate) {
      let { isApiConnectionSucceess, data } = await getCall({
        path: `${GET_PATIENT}`,
      });
      setpatients(data["data"]);
      setShouldTableUpdate(false)
    }
  };

  const getContactApiData = async () => {
    let { isApiConnectionSucceess, data } = await getCall({
      path: `${GET_CONTACTINFO}`,
    });
    setcontact(data["data"])
  };

  const getKinApiData = async () => {
    let { isApiConnectionSucceess, data } = await getCall({
      path: `${GET_NEXTTOKIN}`,
    });
    setkindetails(data["data"])
  };


  useEffect(() => {
    getApiData();
    getContactApiData();
    getKinApiData();
  }, [shouldTableUpdate]);

  return (
    <>
      <Box sx={{ margin: "auto", width: "300px", paddingTop: "30px" }}>
        <AddBtn setShouldTableUpdate={setShouldTableUpdate} />
      </Box>
      <Box sx={{ height: "70vh", maxWidth: "90vw", margin: "auto", paddingTop: "50px" }}>
        <h2 >PATIENTS DETAILS</h2>
        <DataGrid
          style={{ margin: "0px 10px" }}
          rows={patients}
          columns={patient}
          pageSize={12}
          autoHeight={true}
          disableSelectionOnClick={true}
          getRowId={(row) => row?.reg_no}
        />
      </Box>
    </>
  );
}
