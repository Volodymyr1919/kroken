import * as React from "react";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { language } from "../../lang";
// eslint-disable-next-line
import feedback from "./feedback.scss";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Feedback = observer(() => {

    const { RequestStore, ConfigStore } = useStores();
    const [connection, setConnection] = React.useState("");
    const [topic, setTopic] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [lng, setLng] = React.useState(ConfigStore.lang);

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const onSubmit = (data) => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            return RequestStore.doPost(
            `https://api.telegram.org/bot5608047519:AAHRTO7QJAhPiuBYie51fBY_xK0aTagXkVY/sendMessage?chat_id=-896958424&text=${JSON.stringify(data)}`)
        })
        .then((res) => {
            if (res.ok) {
                resetField("connection");
                resetField("topic");
                resetField("message");
                ConfigStore.setIsFeedbackShow(false);
                ConfigStore.setSeverity("success");
                ConfigStore.setTextAlert(lng === "de" ? "Erfolg!" : "Success!");
                ConfigStore.setIsSnackShow(true);
            } else {
                ConfigStore.setIsFeedbackShow(false);
                ConfigStore.setSeverity("error");
                ConfigStore.setTextAlert(lng === "de" ? "Ein Fehler ist aufgetreten :(" : "Some error occured :(");
                ConfigStore.setIsSnackShow(true);
            }
        })
    };

    const handleClose = () => {
        ConfigStore.setIsFeedbackShow(false);
    };

    React.useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return(
        <Modal
            open={ConfigStore.isFeedbackShow}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {lng === "de" ? language.fillUpForm.de : language.fillUpForm.en}
                </Typography>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="feedback__form">
                            <TextField
                                id="standard-basic"
                                label={lng === "de" ? language.connect.de : language.connect.en}
                                variant="standard" 
                                type="text"
                                fullWidth
                                {...register("connection", {
                                    required: `${lng === "de" ? language.required.de : language.required.en}`,
                                    minLength: {
                                        value: 2,
                                        message: `${lng === "de" ? language.min2symb.de : language.min2symb.en}`
                                    },
                                    value: connection,
                                    onChange: (e) => {
                                        setConnection(e.target.value)
                                    }
                                })}
                            />
                            <p className="errorMessage">{errors.connection && errors.connection.message}</p>
                            <TextField
                                id="standard-basic"
                                label={lng === "de" ? language.topic.de : language.topic.en}
                                variant="standard"
                                type="text"
                                fullWidth
                                {...register("topic", {
                                    required: `${lng === "de" ? language.required.de : language.required.en}`,
                                    minLength: {
                                        value: 2,
                                        message: `${lng === "de" ? language.min2symb.de : language.min2symb.en}`
                                    },
                                    value: topic,
                                    onChange: (e) => {
                                        setTopic(e.target.value)
                                    }
                                })}
                            />
                            <p className="errorMessage">{errors.topic && errors.topic.message}</p>
                            <TextField
                                id="standard-basic"
                                label={lng === "de" ? language.message.de : language.message.en}
                                variant="standard"
                                type="text"
                                fullWidth
                                {...register("message", {
                                    required: `${lng === "de" ? language.required.de : language.required.en}`,
                                    minLength: {
                                        value: 2,
                                        message: `${lng === "de" ? language.min2symb.de : language.min2symb.en}`
                                    },
                                    value: message,
                                    onChange: (e) => {
                                        setMessage(e.target.value)
                                    }
                                })}
                            />
                            <p className="errorMessage">{errors.message && errors.message.message}</p>
                        </div>
                        <Button type="submit" variant="outlined">
                            {lng === "de" ? language.send.de : language.send.en}
                        </Button>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
});

export default Feedback;