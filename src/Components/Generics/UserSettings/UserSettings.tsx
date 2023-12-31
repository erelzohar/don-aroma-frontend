import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";
import UserModel from "../../../Models/UserModel";
import { Link } from "react-router-dom";

function UserSettings(props: UserModel): JSX.Element {

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0.5rem 0 2rem 0" }}>
            <Tooltip title="הגדרות">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src="avatar" alt={props.firstName} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >

                <MenuItem onClick={handleCloseUserMenu}>
                    <Link to="/auth/logout"><Typography textAlign="right" display="flex"> <LogoutIcon /><span style={{ marginLeft: "0.5rem" }}>התנתק</span></Typography></Link>
                </MenuItem>

            </Menu>
            <span style={{ color: "goldenrod" }}>{props.firstName + " " + props.lastName}</span>
        </Box>
    );
}

export default UserSettings;
