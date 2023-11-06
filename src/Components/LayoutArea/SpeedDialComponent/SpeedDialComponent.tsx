import {Box,Backdrop,SpeedDial,SpeedDialAction} from '@mui/material'
import { useState } from "react";
import { AddIcCall, Call, Facebook, Instagram, WhatsApp } from "@mui/icons-material";

function SpeedDialComponent(): JSX.Element {
  const actions = [
    { icon: <Call />, name: 'Call' },
    { icon: <WhatsApp />, name: 'WhatsApp' },
    { icon: <Instagram />, name: 'Instagram' },
    { icon: <Facebook />, name: 'Facebook' },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="SpeedDialComponent" component={'span'} sx={{
      height: '60vh',
      transform: 'translateZ(1ch)',
      flexGrow: 1,
      position: 'fixed',
      top: '35vh',
      right:'1vw',
      display: 'flex',
      zIndex:100
    }}>
      <Backdrop sx={{ backgroundColor: 'transparent' }} open={open} />
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'relative', display: 'flex'}}
        icon={<AddIcCall/> }
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              if (action.name === "Call") {
                return window.open('tel:0503713852', '_self');
              }
              else if (action.name === "WhatsApp") {
                return window.open('https://wa.me/972503713852', 'blank');
              }
              else if (action.name === "Instagram") {
                return window.open('https://www.instagram.com/don_aromaisr/', 'blank');
              }
              else if (action.name === "Facebook") {
                return window.open('https://www.facebook.com/profile.php?id=61550822289202&mibextid=LQQJ4d', 'blank');
              }
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default SpeedDialComponent;




