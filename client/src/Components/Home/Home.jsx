import * as React from 'react';
import Footer from './Footer/Footer';
import { Button } from '@mui/material';
import { observer } from "mobx-react";
import { useStores } from '../Stores/MainStore';
import { NavLink } from 'react-router-dom';
import Snack from '../Partial/Snack';
import { language } from '../lang';
// eslint-disable-next-line no-unused-vars
import homeStyle from "./home.scss";

const Home = observer(() => {

    const { ConfigStore } = useStores();

    const [lng, setLng] = React.useState(ConfigStore.lang);

    const handleClickOpen = (scrollType) => () => {
        ConfigStore.setIsAboutShow(true);
        ConfigStore.setScroll(scrollType);
    };

    React.useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return(
        <>
            <div className='home'>
                <div className='home__about'>
                    <p className='about__title'>{lng === "de" ? language.tagline.de : language.tagline.en}</p>
                    <p className='about__users'>
                        {lng === "de" ? language.about_s__cust.de.for : language.about_s__cust.en.for}
                        <br />
                        {lng === "de" ? language.about_s__cust.de.about : language.about_s__cust.en.about}
                    </p>
                    <p className='about__users'>
                        {lng === "de" ? language.about_s__own.de.for : language.about_s__own.en.for}
                        <br />
                        {lng === "de" ? language.about_s__own.de.about : language.about_s__own.en.about}
                    </p>
                    <div className='about__buttons'>
                        <Button onClick={handleClickOpen('paper')} className='buttons__button'>
                            {lng === "de" ? language.learnMore.de : language.learnMore.en}
                        </Button>
                        <Button component={NavLink} to="/signup" className='buttons__button'>
                            {lng === "de" ? language.getStarted.de : language.getStarted.en}
                        </Button>
                    </div>
                </div>
                <div className="home__bg"></div>
            </div>
            <Footer />
            <Snack />
        </>
    );
});

export default Home;