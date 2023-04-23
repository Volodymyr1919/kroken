import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import { useStores } from '../../Stores/MainStore';
import { NavLink } from 'react-router-dom';
import { language } from '../../lang';

const AboutApp = observer(() => {

    const { ConfigStore } = useStores();

    const handleClose = () => {
        ConfigStore.setIsAboutShow(false);
    };

    const [lng, setLng] = React.useState(ConfigStore.lang);

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
    if (ConfigStore.isAboutShow) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
        descriptionElement.focus();
        }
    }
    }, [ConfigStore]);

    React.useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return (
        <Dialog
            open={ConfigStore.isAboutShow}
            onClose={handleClose}
            scroll={ConfigStore.scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            className='homeAbout'
        >
        <DialogTitle id="scroll-dialog-title">
            {lng === "de" ? language.aboutApp.de : language.aboutApp.en}
        </DialogTitle>
        <DialogContent dividers={ConfigStore.scroll === 'paper'}>
            <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
            >
                {lng === "de" ? language.about_f.de.hello : language.about_f.en.hello}
                <br /><br />
                {lng === "de" ? language.about_f.de.ask : language.about_f.en.ask}
                <br /><br />
                {lng === "de" ? language.about_f.de.users.usMain : language.about_f.en.users.usMain}
                <br />
                {lng === "de" ? language.about_f.de.users.usVis : language.about_f.en.users.usVis}<br />
                {lng === "de" ? language.about_f.de.users.usOwn : language.about_f.en.users.usOwn}<br />
                <br /><br />
                {lng === "de" ? language.about_f.de.forVis.for : language.about_f.en.forVis.for}
                <br />
                {lng === "de" ? language.about_f.de.forVis.about : language.about_f.en.forVis.about}
                <br /><br />
                {lng === "de" ? language.about_f.de.forOwn.for : language.about_f.en.forOwn.for}
                <br />
                {lng === "de" ? language.about_f.de.forOwn.about : language.about_f.en.forOwn.about}
                <br />
                {lng === "de" ? language.about_f.de.forOwn.qr_codes : language.about_f.en.forOwn.qr_codes}
                <br />
                {lng === "de" ? language.about_f.de.forOwn.one : language.about_f.en.forOwn.one}<br />
                {lng === "de" ? language.about_f.de.forOwn.two : language.about_f.en.forOwn.two}<br />
                {lng === "de" ? language.about_f.de.forOwn.three : language.about_f.en.forOwn.three}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>
                {lng === "de" ? language.gotIt.de : language.gotIt.en}
            </Button>
            <Button component={NavLink} to="/signup">
                {lng === "de" ? language.getStarted.de : language.getStarted.en}
            </Button>
        </DialogActions>
        </Dialog>
    );
});

export default AboutApp;