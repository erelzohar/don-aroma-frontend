import "./Header.css";
import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from "../../../Assets/Images/logo-donaroma.jpg";
import HeaderDrawer, { HeaderDrawerChild } from '../HeaderDrawer/HeaderDrawer';
import { BsFacebook, BsFillTelephoneFill, BsShieldFillExclamation } from 'react-icons/bs';
import { AiFillInstagram, AiFillHome, AiFillGift, AiOutlineWechat } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";
import { FaAirFreshener, FaBusinessTime, FaQuestion, FaShoppingBag } from "react-icons/fa";
import DropDownMenu, { dropDownProps } from '../../Generics/DropDownMenu/DropDownMenu';
import { useEffect, useState } from "react";
import productsService from "../../../Services/Products";
import { useAppSelector } from "../../../Redux/Store";
import UserSettings from "../../Generics/UserSettings/UserSettings";



const droprops: dropDownProps = {
    name: "ניחוחות",
    children: [
        {
            name: "כל הניחוחות",
            url: "/products/650acfabc4c0c3b0a4da8ad3"
        }
    ]
}
const adminDroprops: dropDownProps = {
    name: "עריכה",
    children: [
        {
            name: "עריכת מוצרים",
            url: "/manage/admin"
        }, {
            name: "עריכת מבצעים",
            url: "/manage/admin/sales"
        }
    ]
}

const pages = [
    {
        name: "מפיצי ריח דיגיטליים",
        url: "/products/650acf8fc4c0c3b0a4da8ad2"
    },
    {
        name: "חבילות/מארזים",
        url: "/products/650adc37c4c0c3b0a4da8aec"
    },
    {
        name: "אביזרים נלווים",
        url: "/products/650ad02dc4c0c3b0a4da8ad4"
    },
    {
        name: "שירות חודשי לעסקים",
        url: "/business"
    },
    {
        name: "שאלות נפוצות",
        url: "/faq"
    }];

const drawerPages: HeaderDrawerChild[] = [
    {
        name: "מפיצי ריח דיגיטליים",
        url: "/products/650acf8fc4c0c3b0a4da8ad2",
        icon: <FaAirFreshener />
    },
    {
        name: "חבילות/מארזים",
        url: "/products/650adc37c4c0c3b0a4da8aec",
        icon: <AiFillGift />
    },
    {
        name: "אביזרים נלווים",
        url: "/products/650ad02dc4c0c3b0a4da8ad4",
        icon: <FaShoppingBag />
    },
    {
        name: "שירות חודשי לעסקים",
        url: "/business",
        icon: <FaBusinessTime />
    },
    {
        name: "ניחוחות",
        url: "",
        children: [{ name: 'כל הניחוחות', url: "/products/650acfabc4c0c3b0a4da8ad3" }]
    },
    {
        name: "דף הבית",
        url: "/",
        icon: <AiFillHome />
    },
    {
        name: "שאלות נפוצות",
        url: "/faq",
        icon: <FaQuestion />
    },
    {
        name: "אודותינו",
        url: "/about-us",
        icon: <AiOutlineWechat />
    },
    {
        name: "תקנון",
        url: "/policy",
        icon: <BsShieldFillExclamation />
    },
    {
        name: "צור קשר",
        url: "/contact-us",
        icon: <BsFillTelephoneFill />
    }
]

function Header(): JSX.Element {

    const user = useAppSelector(state => state.authState.user);
    const [isHiding, setIsHiding] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const scrollHandler = () => {
        setScrollY(prevState => {
            const diff = window.scrollY - prevState;
            if ((diff >= 4) || (diff <= -4)) {
                if (window.scrollY > prevState && !isHiding) {
                    setIsHiding(true);
                }
                else if (window.scrollY < prevState) {
                    setIsHiding(false);
                }
            }
            return window.scrollY;
        });
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, { passive: true });
        let index = drawerPages.findIndex(p => p.children);
        productsService.getScentCategories()
            .then(res => {
                res.forEach(c => {
                    let obj = { name: c.name, url: "/products/scents/" + c._id };
                    droprops.children.push(obj);
                    drawerPages[index].children.push(obj);
                })
            })
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        }
    }, [])

    return (
        <AppBar color='inherit' enableColorOnDark >
            <Container maxWidth="xl" disableGutters >
                <Toolbar className='toolbar-flex' disableGutters >
                    <Box
                        sx={{
                            maxHeight: (isHiding ? '0px' : '500vh'),
                            display: { xs: 'none', md: 'block' },
                            position: "absolute",
                            right: '0',
                            top: '1vh',
                            marginRight: '1vw',
                            fontSize: 'medium',
                            fontFamily: 'sans-serif',
                            transition: 'all 200ms',
                            transform: (isHiding ? "translateY(-30vh)" : "translateY(0)")
                        }}
                    >
                        <div className="header-side-div" dir="rtl">
                            {!user && <><Link to="/auth/register">הירשם</Link>
                                <span> | </span>
                                <Link to="/auth/login">התחבר</Link>
                                <span> | </span></>}
                            <Link to="/about-us">אודותינו</Link>
                            <span> | </span>
                            <Link to="/policy">תקנון</Link>
                            <span> | </span>
                            <Link to="/contact-us">צור קשר</Link>
                            {user && <div ><UserSettings {...user} /></div>}
                        </div>
                    </Box>
                    <Box
                        component="a"
                        href="/"
                        sx={{
                            maxHeight: (isHiding ? '0px' : '500vh'),
                            height: '15vh',
                            display: { xs: 'none', md: 'flex' },
                            margin: "0 0 1rem 0",
                            padding: 0,
                            width: '20vw',
                            backgroundImage: `url(${logo})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            transition: 'all 400ms',
                        }}
                    >
                    </Box>
                    <Box
                        sx={{
                            maxHeight: (isHiding ? '0px' : '500vh'),
                            display: { xs: 'none', md: 'flex' },
                            position: "absolute",
                            flexDirection: 'row',
                            left: '0',
                            top: '1vh',
                            fontSize: '30px',
                            transition: 'all 200ms',
                            transform: (isHiding ? "translateY(-30vh)" : "translateY(0)")
                        }}
                    >
                        <a target="blank" className='social-links' href="https://wa.me/972503713852"><RiWhatsappFill /></a>
                        <a target="blank" className='social-links' href="https://www.facebook.com/profile.php?id=61550822289202&mibextid=LQQJ4d"><BsFacebook size="25" /></a>
                        <a target="blank" className='social-links' href="tel:0503713852"><BsFillTelephoneFill size="25" /></a>
                        <a target="blank" className='social-links' href="https://www.instagram.com/don_aromaisr/"><AiFillInstagram /></a>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            width: "80%",
                            textAlign: "center",
                            justifyContent: "space-around",
                            margin: "0 1rem 1rem 1rem",
                            borderTop: "1px solid black",
                            paddingTop: "1rem",
                            direction: "rtl",
                            transition: 'all 300ms',
                        }}>
                        <DropDownMenu {...droprops} />
                        {pages.map((p, i) => <Link key={i} className='header-links' to={p.url}>{p.name}</Link>)}
                        {user?.isAdmin && <DropDownMenu {...adminDroprops} />}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <HeaderDrawer pages={drawerPages} user={user} />
                    </Box>
                    <Typography
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1.5
                        }}
                    >
                        <img className='logo' src={logo} alt="LOGO" />
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
