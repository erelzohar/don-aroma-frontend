import "./Loader.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loader(): JSX.Element {
    return (
        <Box sx={{ display: 'flex',justifyContent:"center",padding:"3rem",margin:"3rem" }}>
        <CircularProgress size="70px"/>
      </Box>
    );
}

export default Loader;
