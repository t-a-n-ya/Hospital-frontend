import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { Button, } from "@mui/material";
import { postCall } from "../Api/helpers";
import { CREATE_DATA } from "../Api/apiPath";
import { useState } from "react";

export default function BasicTextFields({ handleClose, setShouldTableUpdate }) {
  const [regNo, setregNo] = useState("");
  const [pName, setpName] = useState("");
  const [pAge, setpAge] = useState("");
  const [phoneNo, setphoneNo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [kinName, setKinName] = React.useState("");
  const [kinrel, setKinrel] = React.useState("");
  const [kintel, setKintel] = React.useState("");
  const [kinName2, setKinName2] = React.useState("");
  const [kinrel2, setKinrel2] = React.useState("");
  const [kintel2, setKintel2] = React.useState("");


  const formHandler = async (event) => {
    event.preventDefault();
    let dataobj = {
      reg_no: regNo,
      p_name: pName,
      p_Age: pAge,
      Phone_no: phoneNo,
      email: email,
      name: kinName,
      relationship: kinrel,
      Tel_no: kintel,
      name2:kinName2,
      relationship2: kinrel2,
      Tel_no2: kintel2,
    };
    let { isApiConnectionSucceess, data, e } = await postCall({
      path: `${CREATE_DATA}`,
      Data: dataobj,
    });
    if (!isApiConnectionSucceess) {
      console.log(data.message)
    }
    handleClose();
    setShouldTableUpdate(true);

  };

  return (
    <>
      <Stack >
        <form onSubmit={formHandler}>
          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            required
            id="outlined-basic"
            label="Registration no"
            variant="outlined"
            type="number"
            onChange={(e) => setregNo(e.target.value)}
          />

          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            required
            id="outlined-basic"
            label="patient name"
            variant="outlined"
            type="text"
            onChange={(e) => setpName(e.target.value)}
          />

          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            required
            id="outlined-basic"
            label="patient Age"
            variant="outlined"
            type="number"
            onChange={(e) => setpAge(e.target.value)}
          />
          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            required
            id="outlined-basic"
            label="Phone no"
            variant="outlined"
            type="number"
            onChange={(e) => setphoneNo(e.target.value)}
          />

          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            required
            id="outlined-basic"
            label="email"
            variant="outlined"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            required
            id="outlined-basic"
            label="Next to Kin name "
            variant="outlined"
            type="text"
            onChange={(e) => setKinName(e.target.value)}
          />

          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            required
            id="outlined-basic"
            label="Next to Kin relation"
            variant="outlined"
            type="text"
            onChange={(e) => setKinrel(e.target.value)}
          />

          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            required
            id="outlined-basic"
            label="Next to Kin phone no"
            variant="outlined"
            type="number"
            onChange={(e) => setKintel(e.target.value)}
          />

          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            required
            id="outlined-basic"
            label="2nd Next to Kin name "
            variant="outlined"
            type="text"
            onChange={(e) => setKinName2(e.target.value)}
          />

          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            required
            id="outlined-basic"
            label="2nd Next to Kin relation"
            variant="outlined"
            type="text"
            onChange={(e) => setKinrel2(e.target.value)}
          />

          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            required
            id="outlined-basic"
            label="2nd Next to Kin phone no"
            variant="outlined"
            type="number"
            onChange={(e) => setKintel2(e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{ marginTop: "10px" }}
              variant="contained"
              color="error"
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              sx={{ marginTop: "10px" }}
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Stack>
    </>
  );
}
