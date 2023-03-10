import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, Stack, TextField } from "@mui/material";
import { putCall, getCall } from "../Api/helpers";
import { UPDATE_DATA, GET_CONTACTINFO, GET_NEXTTOKIN } from "../Api/apiPath";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
  height:"100vh",
  overflow:"scroll"
};

export default function TransitionsModal({ cellValues, setShouldTableUpdate }) {

  const [open, setOpen] = React.useState(false);
  const [regNo, setregNo] = React.useState("");
  const [pName, setpName] = React.useState("");
  const [pAge, setpAge] = React.useState("");
  const [phoneNo, setphoneNo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [kinName, setKinName] = React.useState("");
  const [kinrel, setKinrel] = React.useState("");
  const [kintel, setKintel] = React.useState("");
  const [kinName2, setKinName2] = React.useState("");
  const [kinrel2, setKinrel2] = React.useState("");
  const [kintel2, setKintel2] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setOpen(true);
    const getContactApiData = async () => {
      let { isApiConnectionSucceess, data } = await getCall({
        path: `${GET_CONTACTINFO}`,
      });
      let ContactDetailsArray = data.data.find(item => item.patientId === cellValues.id)
      setphoneNo(ContactDetailsArray.Phone_no);
      setEmail(ContactDetailsArray.email);
    };

    const getKinApiData = async () => {
      let { isApiConnectionSucceess, data } = await getCall({
        path: `${GET_NEXTTOKIN}`,
      });

      let KinDetailsArray = data.data.filter(item => item.reg_no_fk === cellValues.id)
      setKinName(KinDetailsArray[0].name);
      setKinrel(KinDetailsArray[0].relationship);
      setKintel(KinDetailsArray[0].Tel_no);
      setKinName2(KinDetailsArray[1].name);
      setKinrel2(KinDetailsArray[1].relationship);
      setKintel2(KinDetailsArray[1].Tel_no);
    };

    getContactApiData();
    getKinApiData();
    setregNo(cellValues.id);
    setpName(cellValues.row.p_name);
    setpAge(cellValues.row.p_Age);


  };

  const handleSubmit = async () => {
    let dataobj = {
      regNo,
      pName,
      pAge,
      phoneNo,
      email,
      kinName,
      kinrel,
      kintel,
      kinName2,
      kinrel2,
      kintel2
    };
    let { isApiConnectionSucceess, data, e } = await putCall({
      path: `${UPDATE_DATA}`,
      updatedData: dataobj,
    });
    setOpen(false);
    setShouldTableUpdate(true)
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        className="edit_stock_btn"
        variant="outlined"
        onClick={handleChange}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              textAlign="center"
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Edit Details
            </Typography>

            <TextField
              style={{ marginBottom: "10px" }}
              fullWidth
              required
              id="outlined-basic"
              label="Registration no"
              variant="outlined"
              type="number"
              value={regNo}
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
              value={pName}
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
              value={pAge}
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
              value={phoneNo}
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
              value={email}
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
              value={kinName}
              onChange={(e) => setKinName(e.target.value)}
            />

            <TextField
              style={{ marginBottom: "10px" }}
              fullWidth
              required
              id="outlined-basic"
              label="Next to Kin relation "
              variant="outlined"
              type="text"
              value={kinrel}
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
              value={kintel}
              onChange={(e) => setKintel(e.target.value)}
            />
            <TextField
              style={{ marginBottom: "10px" }}
              fullWidth
              required
              id="outlined-basic"
              label="Next to Kin name "
              variant="outlined"
              type="text"
              value={kinName2}
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
              value={kinrel2}
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
              value={kintel2}
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
                fullWidth
                onClick={handleSubmit}
                sx={{ marginTop: "10px" }}
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Stack>
  );
}
