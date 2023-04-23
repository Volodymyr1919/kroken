import * as React from "react";
import { Modal } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { observer } from "mobx-react";
import { useStores } from "../Stores/MainStore";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    }
);

const InfoAlert = observer(() => {

    const navigate = useNavigate();

    const { ConfigStore } = useStores();

    const handleClose = (reason) => {
        if (reason === "clickaway") {
            return;
        };
        ConfigStore.setIsInfoAlertShow(false);
        navigate("/user");
    }

    return(
        <Modal open={ConfigStore.isInfoAlertShow}>
            <Alert onClose={handleClose} severity={ConfigStore.severity} sx={{ width: '100%' }}>
                {ConfigStore.textAlert}
            </Alert>
        </Modal>
    );
});

export default InfoAlert;