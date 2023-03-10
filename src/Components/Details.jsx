import { Button, Box, Modal } from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Details({ cellValues, patients, contact, kindetails }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleChange = () => setOpen(true);

  let patientArray = patients?.find(item => item.reg_no === cellValues.id)
  let contactArray = contact?.find(item => item.patientId === cellValues.id)
  let KinDetailsArray = kindetails?.filter(item => item.reg_no_fk === cellValues.id)

  return (
    <>
      <Button startIcon={<VisibilityIcon />} onClick={handleChange} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p><strong>Registration no :- </strong>{cellValues.id}</p>
          <p><strong>Patient name :- </strong>{patientArray?.p_name}</p>
          <p><strong>Patient Age :- </strong>{patientArray?.p_Age}</p>
          <p style={{marginTop:"20px"}}><strong>Contact No :- </strong>{contactArray?.Phone_no}</p>
          <p><strong>Email Id :- </strong>{contactArray?.email}</p>
          <p style={{marginTop:"20px"}}><strong>Next to kin name :- </strong>{KinDetailsArray[0]?.name}</p>
          <p><strong>Next to kin relationship :- </strong>{KinDetailsArray[0]?.relationship}</p>
          <p><strong>Next to kin Contact :- </strong>{KinDetailsArray[0]?.Tel_no}</p>
          <p><strong>2nd Next to kin name :- </strong>{KinDetailsArray[1]?.name}</p>
          <p><strong>2nd Next to kin relationship :- </strong>{KinDetailsArray[1]?.relationship}</p>
          <p><strong>2nd Next to kin Contact :- </strong>{KinDetailsArray[1]?.Tel_no}</p>

        </Box>
      </Modal>
    </>
  )
}

