import React from "react";
import { useStores } from "../Stores/MainStore";
import { observer } from "mobx-react";
import { Modal, Button } from "react-bootstrap";

const ErrorModal = observer(() => {

    const { ConfigStore } = useStores();

    function handleClose() {
        ConfigStore.setIsShow(false);
    }

    return(
        <Modal
            show={ConfigStore.isShow}
            onHide={handleClose}
            style={{
                marginTop: "60px"
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>{ConfigStore.lang === "de" ? "Fehler" : "Error"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {ConfigStore.err}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ErrorModal;