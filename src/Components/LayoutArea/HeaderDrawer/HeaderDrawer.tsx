import * as React from 'react';
import "./HeaderDrawer.css";
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Remove, KeyboardArrowDown, Menu as MenuIcon, Edit } from '@mui/icons-material';
import { Slide } from 'react-awesome-reveal';


export interface HeaderDrawerChild {
    name: string;
    url: string;
    icon?: JSX.Element;
    children?: HeaderDrawerChild[];
}

interface HeaderDrawerProps {
    pages: HeaderDrawerChild[];
    isAdmin?: boolean;
}

export default function HeaderDrawer(props: HeaderDrawerProps) {
    const childRef = React.useRef<HTMLSpanElement>(null);
    const iconSpanRef = React.useRef<HTMLSpanElement>(null);
    const [state, setState] = React.useState(false);

    const handleChild = (e: React.MouseEvent) => {
        if (childRef.current) {
            if (childRef.current.style.display === "" || childRef.current.style.display === "none") {
                childRef.current.style.display = "block";
                if (iconSpanRef.current) {
                    iconSpanRef.current.style.transform = "rotate(0.5turn)"
                }
                return;
            }
            if (iconSpanRef.current) {
                iconSpanRef.current.style.transform = ""
            }
            childRef.current.style.display = "none";
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
                {props.isAdmin && <ListItem
                    disablePadding
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}>
                    <Link to="/manage/admin">
                        <ListItemButton>
                            <ListItemIcon>
                                <Edit />
                            </ListItemIcon>
                            <ListItemText primary="עריכה" />
                        </ListItemButton>
                    </Link>
                </ListItem>}
                {props.pages.map((p, i) => {
                    if (p.children) {
                        return <span key={p.url + i}>
                            <Divider />
                            <List>
                                <ListItem disablePadding
                                    onClick={handleChild}
                                >
                                    <ListItemButton >
                                        <ListItemIcon >
                                            <span style={{ transition: "all 500ms ease" }} ref={iconSpanRef}><KeyboardArrowDown /></span>
                                        </ListItemIcon>
                                        <ListItemText primary={p.name} />
                                    </ListItemButton>
                                </ListItem>
                                <span className={"childrenDiv" + p.url.split("/")[p.url.split("/").length - 1]} ref={childRef}>
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