import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { GET_PATIENT, GET_CONTACTINFO, GET_NEXTTOKIN } from "../Api/apiPath";
import { getCall } from "../Api/helpers";
import AddBtn from "../UiComponents/AddBtn"
import EditBtn from "../UiComponents/EditBtn"
import DeleteBtn from "../UiComponents/DeleteBtn"
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Table() {

  const [patients, setpatients] = useState([]);

  const patient = [
    {
      field: "reg_no",
      headerName: "REGISTRATION",
      flex: 1,
    },
    { field: "p_name", headerName: "patient name", flex: 1 },
    { field: "p_Age", headerName: "patient Age", flex: 1 },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      flex: 1,
      marginLeft: "10px",
      disableColumnMenu: true,
      headerClassName: "table_actions_column",
      align: "center",
      renderCell: (cellValues) => (
        <Button
          startIcon={<VisibilityIcon />}
          onClick={() => {
            // setregNo(cellValues.row.reg_no)
            // setpatientname(cellValues.row.p_name)
            // setpAge(cellValues.row.p_Age)
          }}
        />
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
        <EditBtn cellValues={cellValues}>Edit</EditBtn>
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
        <DeleteBtn cellValues={cellValues}>Delete</DeleteBtn>
      ),
    },
  ];

  const getApiData = async () => {
    let { isApiConnectionSucceess, data } = await getCall({
      path: `${GET_PATIENT}`,
    });
    setpatients(data["data"]);
  };

  // const getContactApiData = async () => {
  //   let { isApiConnectionSucceess, data } = await getCall({
  //     path: `${GET_CONTACTINFO}`,
  //   });
  //   console.log(regNo)
  //   let ContactDetailsArray = data.data.find(item => item.patientId === regNo)
  //   setphoneNo(ContactDetailsArray?.Phone_no);
  //   setEmail(ContactDetailsArray?.email);
  // };

  // const getKinApiData = async () => {
  //   let { isApiConnectionSucceess, data } = await getCall({
  //     path: `${GET_NEXTTOKIN}`,
  //   });

  //   let KinDetailsArray = data.data.filter(item => item.reg_no_fk === regNo)
  //   setKinName(KinDetailsArray[0]?.name);
  //   setKinrel(KinDetailsArray[0]?.relationship);
  //   setKintel(KinDetailsArray[0]?.Tel_no);
  //   setKinName2(KinDetailsArray[1]?.name);
  //   setKinrel2(KinDetailsArray[1]?.relationship);
  //   setKintel2(KinDetailsArray[1]?.Tel_no);
  // };


  useEffect(() => {
    getApiData();
    // getContactApiData();
    // getKinApiData();
  }, []);

  return (
    <>
      <Box sx={{ margin: "auto", width: "300px", paddingTop: "30px" }}>
        <AddBtn />
      </Box>
      <Box sx={{ height: "70vh", maxWidth: "90vw", margin: "auto", paddingTop: "50px" }}>
        <h2 >PATIENTS DETAILS</h2>
        <DataGrid
          style={{ margin: "0px 10px" }}
          rows={patients}
          columns={patient}
          pageSize={12}
          disableSelectionOnClick={true}
          getRowId={(row) => row?.reg_no}
        />
      </Box>

      {/* <Box sx={{ height: "60vh", maxWidth: "90vw", margin: "auto", paddingTop: "80px" }}>
      <h4>Patient Reg No: {regNo}</h4>
        <h4>Patient Name: {patientname}</h4>
        <h4>Patient Age: {pAge}</h4>
        <h4>Patient phoneNo: {phoneNo}</h4>
        <h4>Patient email: {email}</h4>
        <h4>Next to Kin: {kinName}</h4>
        <h4>Next to kin Relation: {kinrel}</h4>
        <h4>Next to kin Contact: {kintel}</h4>
        <h4>2nd Next to kin Relation: {kinName2}</h4>
        <h4>2nd Next to kin Relation: {kinrel2}</h4>
        <h4>2nd Next to kin Relation: {kintel2}</h4>
      </Box> */}
    </>
  );
}
