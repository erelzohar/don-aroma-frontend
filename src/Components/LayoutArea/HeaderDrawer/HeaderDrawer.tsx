import * as React from 'react';
import "./HeaderDrawer.css";
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Remove, KeyboardArrowDown, Menu as MenuIcon } from '@mui/icons-material';
import { Slide } from 'react-awesome-reveal';
import { BiLogOut, BiLogIn, BiEditAlt } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs"
import UserModel from '../../../Models/UserModel';


export interface HeaderDrawerChild {
    name: string;
    url: string;
    icon?: JSX.Element;
    children?: HeaderDrawerChild[];
}

interface HeaderDrawerProps {
    pages: HeaderDrawerChild[];
    user?: UserModel;
}

export default function HeaderDrawer(props: HeaderDrawerProps) {
    const childRef = React.useRef<HTMLSpanElement>(null);
    const loggedinUserRef = React.useRef<HTMLSpanElement>(null);
    const adminRef = React.useRef<HTMLSpanElement>(null);
    const userIconRef = React.useRef<HTMLSpanElement>(null);
    const adminIconRef = React.useRef<HTMLSpanElement>(null);
    const iconSpanRef = React.useRef<HTMLSpanElement>(null);
    const [state, setState] = React.useState(false);

    const handleChild = (e: React.MouseEvent, ref: React.MutableRefObject<HTMLSpanElement>, iconRef: React.MutableRefObject<HTMLSpanElement>) => {
        if (ref.current) {
            if (ref.current.style.display === "" || ref.current.style.display === "none") {
                ref.current.style.display = "block";
                if (iconRef.current) {
                    iconRef.current.style.transform = "rotate(0.5turn)"
                }
                return;
            }
            if (iconRef.current) {
                iconRef.current.style.transform = ""
            }
            ref.current.style.display = "none";
        }
    }

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event && event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(open);
            };

    const list = () => (
        <Box
            sx={{ width: 'auto' }}
            role="presentation"
        >
            <List>
                {
                    props.user && <>
                        <Divider />
                        <List>
                            <ListItem disablePadding
                                onClick={(e) => handleChild(e, loggedinUserRef, userIconRef)}
                            >
                                <ListItemButton >
                                    <ListItemIcon >
                                        <span style={{ transition: "all 500ms ease" }} ref={userIconRef}><KeyboardArrowDown /></span>
                                    </ListItemIcon>
                                    <ListItemText primary={props.user.firstName + " " + props.user.lastName} />
                                </ListItemButton>
                            </ListItem>
                            <span className="loggedinChildrenDiv" ref={loggedinUserRef}>
                                <Slide direction='down' cascade duration={150}>
                                    <ListItem
                                        disableGutters
                                        onClick={toggleDrawer(false)}
                                        onKeyDown={toggleDrawer(false)}>
                                        <Link to="/auth/logout">
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <BiLogOut />
                                                </ListItemIcon>
                                                <ListItemText primary="התנתק" />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                </Slide>
                            </span>
                        </List>
                        <Divider />
                    </>
                }
                {props.user?.isAdmin &&
                    <span >
                        <Divider />
                        <List>
                            <ListItem disablePadding
                                onClick={(e) => handleChild(e, adminRef, adminIconRef)}
                            >
                                <ListItemButton >
                                    <ListItemIcon >
                                        <span style={{ transition: "all 500ms ease" }} ref={adminIconRef}><KeyboardArrowDown /></span>
                                    </ListItemIcon>
                                    <ListItemText primary="עריכה" />
                                </ListItemButton>
                            </ListItem>
                            <span className={"childrenDiv"} ref={adminRef}>
                                <Slide direction='down' cascade duration={150}>
                                    <ListItem
                                        disableGutters
                                        onClick={toggleDrawer(false)}
                                        onKeyDown={toggleDrawer(false)}>
                                        <Link to={"/manage/admin"}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <BiEditAlt />
                                                </ListItemIcon>
                                                <ListItemText primary={"עריכת מוצרים"} />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <ListItem
                                        disableGutters
                                        onClick={toggleDrawer(false)}
                                        onKeyDown={toggleDrawer(false)}>
                                        <Link to={"/manage/admin/sales"}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <BiEditAlt />
                                                </ListItemIcon>
                                                <ListItemText primary={"עריכת מבצעים"} />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <ListItem
                                        disableGutters
                                        onClick={toggleDrawer(false)}
                                        onKeyDown={toggleDrawer(false)}>
                                        <Link to={"/manage/admin/orders"}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <BiEditAlt />
                                                </ListItemIcon>
                                                <ListItemText primary={"עריכת הזמנות"} />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                </Slide>
                            </span>
                        </List>
                        <Divider />
                    </span>
                }
                {!props.user && <><ListItem
                    disablePadding
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}>
                    <Link to="/auth/register">
                        <ListItemButton>
                            <ListItemIcon>
                                <BsFillPersonPlusFill />
                            </ListItemIcon>
                            <ListItemText primary="הרשמה" />
                        </ListItemButton>
                    </Link>
                </ListItem><ListItem
                    disablePadding
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}>
                        <Link to="/auth/login">
                            <ListItemButton>
                                <ListItemIcon>
                                    <BiLogIn />
                                </ListItemIcon>
                                <ListItemText primary="התחברות" />
                            </ListItemButton>
                        </Link>
                    </ListItem></>}

                {props.pages.map((p, i) => {
                    if (p.children) {
                        return <span key={p.url + i}>
                            <Divider />
                            <List>
                                <ListItem disablePadding
                                    onClick={(e) => handleChild(e, childRef, iconSpanRef)}
                                >
                                    <ListItemButton >
                                        <ListItemIcon >
                                            <span style={{ transition: "all 500ms ease" }} ref={iconSpanRef}><KeyboardArrowDown /></span>
                                        </ListItemIcon>
                                        <ListItemText primary={p.name} />
                                    </ListItemButton>
                                </ListItem>
                                <span className={"childrenDiv"} ref={childRef}>
                                    <Slide direction='down' cascade duration={150}>
                                        {p.children.map((c, i) => <ListItem
                                            disableGutters
                                            key={c.url + i}
                                            onClick={toggleDrawer(false)}
                                            onKeyDown={toggleDrawer(false)}>
                                            <Link to={c.url}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <Remove />
                                                    </ListItemIcon>
                                                    <ListItemText primary={c.name} />
                                                </ListItemButton>
                                            </Link>
                                        </ListItem>
                                        )}
                                    </Slide>
                                </span>
                            </List>
                            <Divider />
                        </span>
                    }
                    return <ListItem
                        disablePadding
                        key={p.url + i}
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <Link to={p.url} >
                            <ListItemButton >
                                <ListItemIcon >
                                    {p.icon}
                                </ListItemIcon>
                                <ListItemText primary={p.name} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                })}
            </List>
        </Box>
    );

    return (
        <div className='HeaderDrawer'>
            <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor='right'
                open={state}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
}