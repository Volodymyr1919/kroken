import * as React from "react";
import AboutApp from "./AboutApp";
import { Button } from '@mui/material';
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import Feedback from "../../Partial/Feedback/Feedback";
import { language } from "../../lang";

const Footer = observer(() => {

    const { ConfigStore } = useStores();

    const year = new Date().getFullYear();

    const [lng, setLng] = React.useState(ConfigStore.lang);

    const handleClickOpen = (scrollType) => () => {
        ConfigStore.setIsAboutShow(true);
        ConfigStore.setScroll(scrollType);
    };

    const openFeed = () => {
        ConfigStore.setIsFeedbackShow(true);
    };

    React.useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return(
        <footer>
            <Button onClick={handleClickOpen('paper')} className='footer__button'>
                {lng === "de" ? language.aboutApp.de : language.aboutApp.en}
            </Button>
            <p className="footer__me">powered by @ViValdy</p>
            <p>All rights reserved © {year}</p>
            <AboutApp />
            <Feedback />
            <Button onClick={openFeed} className='footer__button'>
                {lng === "de" ? language.feedback.de : language.feedback.en}
            </Button>
        </footer>
    );
});

export default Footer;