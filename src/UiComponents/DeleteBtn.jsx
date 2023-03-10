import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import GlobalContext from "../GlobalContextProvider";
import { deleteCall } from "../Api/helpers";
import { DELETE_DATA } from "../Api/apiPath";


export default function ResponsiveDialog({ cellValues}) {
  const {setIsTableUpdate } = React.useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    let { isApiConnectionSucceess, data, e } = await deleteCall({
      path: `${DELETE_DATA}`,
      dataObj: cellValues.id,
    });
    console.log(data);
    setOpen(false);
    setIsTableUpdate(true)
  };

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button
          className="delete_stock_btn"
          variant="outlined"
          color="error"
          onClick={handleClickOpen}
          startIcon={<DeleteIcon />}
        >
          DELETE
        </Button>
      </Stack>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete this?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you delete this, this will be delete permanentaly
            from the databse.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ marginTop: "10px"} } color="error" variant="contained">
            No
          </Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: "10px" }} >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
