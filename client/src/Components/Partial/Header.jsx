import * as React from 'react';
import { AppBar, Box, Menu, MenuItem, IconButton, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from '../Stores/MainStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { language } from '../lang';

const Header = observer(() => {

    const navigate = useNavigate();

    const { ConfigStore } = useStores();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElGlobe, setAnchorElGlobe] = React.useState(null);
    const [lng, setLng] = React.useState(ConfigStore.lang);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenGlobeMenu = (event) => {
        setAnchorElGlobe(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseGlobeMenu = () => {
        setAnchorElGlobe(null);
    };

    const openFeed = () => {
        handleCloseNavMenu();
        ConfigStore.setIsFeedbackShow(true);
    };

    const changeLang = (e) => {
        handleCloseGlobeMenu();
        ConfigStore.setLang(e.target.id);
    };

    React.useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return(
        <AppBar component="nav" style={{background: "#4C0013"}}>
            <Toolbar>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: "block", md: "none" },
                    }}
                    >
                    <MenuItem
                        onClick={handleCloseNavMenu}
                        component={NavLink}
                        to="/signin"
                    >
                        <Typography textAlign="center">{lng === "de" ? language.signin.de : language.signin.en}</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={handleCloseNavMenu}
                        component={NavLink}
                        to="/signup"
                    >
                        <Typography textAlign="center">{lng === "de" ? language.signup.de : language.signup.en}</Typography>
                    </MenuItem>
                    <MenuItem onClick={openFeed}>
                        <Typography textAlign="center">{lng === "de" ? language.feedback.de : language.feedback.en}</Typography>
                    </MenuItem>
                </Menu>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElGlobe}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    open={Boolean(anchorElGlobe)}
                    onClose={handleCloseGlobeMenu}
                    >
                    <MenuItem onClick={changeLang}>
                        <Typography textAlign="center" id="en">EN</Typography>
                    </MenuItem>
                    <MenuItem  onClick={changeLang}>
                        <Typography textAlign="center" id="de">DE</Typography>
                    </MenuItem>
                </Menu>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    <span
                        className='mouseOver'
                        onClick={() => navigate("/")}
                    >KROKEN</span>
                </Typography>
                <Button sx={{ color: '#fff' }} onClick={handleOpenGlobeMenu}><FontAwesomeIcon icon={faGlobe}/></Button>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button component={NavLink} to="/signin" sx={{ color: '#fff' }}>{lng === "de" ? language.signin.de : language.signin.en}</Button>
                    <Button component={NavLink} to="/signup" sx={{ color: '#fff' }}>{lng === "de" ? language.signup.de : language.signup.en}</Button>
                </Box>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    onClick={handleOpenNavMenu}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
});

export default Header;