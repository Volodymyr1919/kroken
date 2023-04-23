import * as React from 'react';
import { AppBar, Box, Menu, MenuItem, IconButton, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Confirmation from './Confirmation/Confirmation';
import { observer } from 'mobx-react';
import { useStores } from '../Stores/MainStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { language } from '../lang';

const PrivateHeader = observer(() => {

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

    const logout = () => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            ConfigStore.setStateConfirmation("logout");
        })
        .then(() => {
            ConfigStore.setHeaderConfirmation(lng === "de" ? "Sind Sie sicher, dass Sie beenden möchten?" : "Are you sure, want to exit?");
        })
        .then(() => {
            ConfigStore.setTextConfirmation(lng === "de" ? "Sie können jederzeit zurückkehren!" : "You can back at any time!");
        })
        .then(() => {
            ConfigStore.setIsConfirmShow(true);
        })
    };

    const changeLang = (e) => {
        handleCloseGlobeMenu();
        ConfigStore.setLang(e.target.id);
    };

    React.useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return(
        <>
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
                        <MenuItem onClick={openFeed} >
                            <Typography textAlign="center">{lng === "de" ? language.feedback.de : language.feedback.en}</Typography>
                        </MenuItem>
                        <MenuItem onClick={logout} >
                            <Typography textAlign="center">{lng === "de" ? language.logout.de : language.logout.en}</Typography>
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
                        <MenuItem onClick={changeLang}>
                            <Typography textAlign="center" id="de">DE</Typography>
                        </MenuItem>
                    </Menu>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <span>KROKEN</span>
                    </Typography>
                    <Button sx={{ color: '#fff' }} onClick={handleOpenGlobeMenu}><FontAwesomeIcon icon={faGlobe}/></Button>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button
                            onClick={openFeed}
                            sx={{ color: '#fff' }}
                        >
                            {lng === "de" ? language.feedback.de : language.feedback.en}
                        </Button>
                        <Button
                            onClick={logout}
                            sx={{ color: '#fff' }}
                        >
                            {lng === "de" ? language.logout.de : language.logout.en}
                        </Button>
                    </Box>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ display: { sm: 'none' } }}
                        onClick={handleOpenNavMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Confirmation /> 
        </>
    );
});

export default PrivateHeader;