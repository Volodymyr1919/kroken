import React, { useState, useEffect } from "react";
import Offers from "./Offers";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import Feedback from "../../Partial/Feedback/Feedback";
import { language } from "../../lang";
import Snack from "../../Partial/Snack";
// eslint-disable-next-line no-unused-vars
import visitor from "./visitor.scss";

const Visitor = observer(() => {

    const { RequestStore, ConfigStore } = useStores();

    const [myData, setMyData] = useState("");
    const [lng, setLng] = useState(ConfigStore.lang);

    useEffect(() => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            return RequestStore.doGet(ConfigStore._url + "/me/" + localStorage.getItem("myAppId"))
        })
        .then((res) => {
            setMyData(res);
        })
    }, [RequestStore, ConfigStore]);

    useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return(
        <>
            <div className="page__visitor">
                <div className="visitor__about">
                    <div className="about__info">
                        <p>{lng === "de" ? language.username.de : language.username.en}: {myData.name ? ((myData.name).replace(/_/g," ")) : myData.name}</p>
                        <p>
                            <span className="info__type_business">
                                {myData.type_business ? ((myData.type_business).replace(/_/g," ")) : myData.type_business}
                            </span>: {myData.business_name ? ((myData.business_name).replace(/_/g," ")) : myData.business_name}
                        </p>
                        <p>Bonus: {myData.bonus}</p>
                    </div>
                    <Offers myData={myData} />
                </div>
                <div className="page__bg"></div>
                <Feedback />
            </div>
            <Snack />
        </>
    );
});

export default Visitor;