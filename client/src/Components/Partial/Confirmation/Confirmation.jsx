import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from '@mui/material';
import { observer } from 'mobx-react';
import { useStores } from '../../Stores/MainStore';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import confirmation from "./confirmation.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Confirmation = observer(() => {

    const { RequestStore, ConfigStore } = useStores();

    const navigate = useNavigate();

    const handleClose = () => {
        ConfigStore.setIsConfirmShow(false);
    };

    const doThis = () => {
        switch (ConfigStore.stateConfirmation) {
            case "logout":
                localStorage.clear();
                ConfigStore.setIsConfirmShow(false);
                navigate("/signin");
                break;
            case "delete":
                new Promise((resolve, reject) => {
                    resolve();
                })
                .then(() => {
                    return RequestStore.doDelete(ConfigStore._url + "/posts", {
                        id: ConfigStore.postId
                    })
                })
                .then((res) => {
                    if(res.acknowledged && (res.matchedCount === 1)) {
                        ConfigStore.setIsConfirmShow(false);
                        ConfigStore.setPosts(ConfigStore.posts.filter((post) => post._id !== ConfigStore.postId));
                        // ConfigStore.setPostsHistory(ConfigStore.postsHistory.push((post) => post._id !== ConfigStore.postId));
                        RequestStore.doGet(ConfigStore._url + "/oldPosts/" + ConfigStore.businessName)
                        .then((res) => {
                            ConfigStore.setPostsHistory(res);
                        });
                        ConfigStore.setSeverity("success");
                        ConfigStore.setTextAlert(ConfigStore.lang === "de" ? "Erfolg!" : "Success!");
                        ConfigStore.setIsSnackShow(true);
                    } else {
                        ConfigStore.setIsConfirmShow(false);
                        ConfigStore.setSeverity("error");
                        ConfigStore.setTextAlert(ConfigStore.lang === "de" ? "Ein Fehler ist aufgetreten :(" : "Some error occured :(");
                        ConfigStore.setIsSnackShow(true);
                    }
                })
                break;
            case "restore":
                new Promise((resolve, reject) => {
                    resolve();
                })
                .then(() => {
                    return RequestStore.doPost(ConfigStore._url + "/returnPost", {
                        id: ConfigStore.postId
                    })
                })
                .then((res) => {
                    if(res.acknowledged && (res.matchedCount === 1)) {
                        ConfigStore.setIsConfirmShow(false);
                        ConfigStore.setPostsHistory(ConfigStore.postsHistory.filter((post) => post._id !== ConfigStore.postId));
                        RequestStore.doGet(ConfigStore._url + "/posts/" + ConfigStore.businessName)
                        .then((res) => {
                            ConfigStore.setPosts(res);
                        });
                        ConfigStore.setSeverity("success");
                        ConfigStore.setTextAlert(ConfigStore.lang === "de" ? "Erfolg!" : "Success!");
                        ConfigStore.setIsSnackShow(true);
                    } else {
                        ConfigStore.setIsConfirmShow(false);
                        ConfigStore.setSeverity("error");
                        ConfigStore.setTextAlert(ConfigStore.lang === "de" ? "Ein Fehler ist aufgetreten :(" : "Some error occured :(");
                        ConfigStore.setIsSnackShow(true);
                    }
                })
                break;
            case "forever":
                new Promise((resolve, reject) => {
                    resolve();
                })
                .then(() => {
                    return RequestStore.doDelete(ConfigStore._url + "/forever", {
                        id: ConfigStore.postId
                    })
                })
                .then((res) => {
                    if(res.acknowledged && (res.matchedCount === 1)) {
                        ConfigStore.setIsConfirmShow(false);
                        ConfigStore.setPostsHistory(ConfigStore.postsHistory.filter((post) => post._id !== ConfigStore.postId));
                        ConfigStore.setSeverity("success");
                        ConfigStore.setTextAlert(ConfigStore.lang === "de" ? "Erfolg!" : "Success!");
                        ConfigStore.setIsSnackShow(true);
                    } else {
                        ConfigStore.setIsConfirmShow(false);
                        ConfigStore.setSeverity("error");
                        ConfigStore.setTextAlert(ConfigStore.lang === "de" ? "Ein Fehler ist aufgetreten :(" : "Some error occured :(");
                        ConfigStore.setIsSnackShow(true);
                    }
                })
                break;
            default:
                break;
        }
    };

    return (
        <Dialog
            open={ConfigStore.isConfirmShow}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                {ConfigStore.hederConfirmation}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   {ConfigStore.textConfirmation} 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{ConfigStore.lang === "de" ? "Nein" : "No"}</Button>
                <Button onClick={doThis}>{ConfigStore.lang === "de" ? "Ja" : "Yes"}</Button>
            </DialogActions>
        </Dialog>
    );
});

export default Confirmation;