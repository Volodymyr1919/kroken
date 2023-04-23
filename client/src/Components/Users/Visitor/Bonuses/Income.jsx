import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../../Stores/MainStore";
import InfoAlert from "../../../Partial/InfoAlert";
// eslint-disable-next-line
import bonus from "./bonus.scss";

const Income = observer(() => {

    const { RequestStore, ConfigStore } = useStores();

    const [lng, setLng] = useState(ConfigStore.lang);

    useEffect(() => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            return RequestStore.doPost(ConfigStore._url + "/getbonus", {
                id : localStorage.getItem("myAppId")
            })
        })
        .then((res) => {
            if (res.acknowledged && (res.matchedCount === 1)) {
                ConfigStore.setSeverity("success");
                ConfigStore.setTextAlert(lng === "de" ? "Herzlichen Glückwunsch, Sie haben Punkte gesammelt" : "Congrats you've got point plus");
                ConfigStore.setIsInfoAlertShow(true);
            } else {
                ConfigStore.setSeverity("error");
                ConfigStore.setTextAlert(lng === "de" ? "Sie haben den Punkt bereits erhalten" : "You already got the point");
                ConfigStore.setIsInfoAlertShow(true);
            }
        })
    },[RequestStore, ConfigStore]);

    useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return(
        <div className="personalPage__bonus">
            <div className="personalPage__bg"></div>
            <InfoAlert />
        </div>
    );
});

export default Income;