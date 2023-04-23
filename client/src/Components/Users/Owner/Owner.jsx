import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AllUsers from "./AllUsers";
import AllOffers from "./AllOffers";
import OfferHistory from "./OfferHistory";
import AliceCarousel from "react-alice-carousel";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import { TextField, Button } from "@mui/material";
import Snack from "../../Partial/Snack";
import Feedback from "../../Partial/Feedback/Feedback";
import { language } from "../../lang";
import "react-alice-carousel/lib/alice-carousel.css";
// eslint-disable-next-line no-unused-vars
import owner from "./owner.scss";

const Owner = observer(() => {

    const { RequestStore, ConfigStore } = useStores();

    const [myData, setMyData] = useState("");
    const [condition, setCondition] = useState("");
    const [requiredBonuses, setRequiredBonuses] = useState("");
    const [gift, setGift] = useState("");
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
            ConfigStore.setBusinessName(res.business_name);
        })
    }, [RequestStore, ConfigStore])

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
            return RequestStore.doPost(ConfigStore._url + "/offer", {
                business_name       : myData.business_name,
                condition           : data.condition,
                required_bonuses    : data.requiredBonuses,
                gift                : data.gift
            })
        })
        .then((res) => {
            if(res.acknowledged) {
                resetField("condition");
                resetField("requiredBonuses");
                resetField("gift");
                ConfigStore.setSeverity("success");
                ConfigStore.setTextAlert(lng === "de" ? "Erfolg!" : "Success!");
                RequestStore.doGet(ConfigStore._url + "/posts/" + ConfigStore.businessName)
                .then((res) => {
                    ConfigStore.setPosts(res);
                });
                ConfigStore.setIsSnackShow(true);
            } else {
                ConfigStore.setSeverity("error");
                ConfigStore.setTextAlert(lng === "de" ? "Angebot bereits vorhanden!" : "Offer already existing!");
                ConfigStore.setIsSnackShow(true);
            }
        })
    };

    useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);
      
    return(
        <>
            <div className="page__owner">
                <div className="owner__about">
                    <AliceCarousel disableButtonsControls='true' touchTracking='true' touchMoveDefaultEvents='false'>
                        <div className="about__newOffer">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="newOffer__form">
                                    <span className="form__title">{lng === "de" ? language.sendNewOffer.de : language.sendNewOffer.en}:</span>
                                    <TextField
                                        id="standard-basic"
                                        label={lng === "de" ? language.cond.de : language.cond.en}
                                        variant="standard" 
                                        type="text"
                                        fullWidth
                                        {...register("condition", {
                                            required: `${lng === "de" ? language.required.de : language.required.en}`,
                                            minLength: {
                                                value: 2,
                                                message: `${lng === "de" ? language.min2symb.de : language.min2symb.en}`
                                            },
                                            value: condition,
                                            onChange: (e) => {
                                                setCondition(e.target.value)
                                            }
                                        })}
                                    />
                                    <p className="errorMessage">{errors.condition && errors.condition.message}</p>
                                    <TextField
                                        id="standard-basic"
                                        label={lng === "de" ? language.required_bon.de : language.required_bon.en}
                                        variant="standard"
                                        type="number"
                                        fullWidth
                                        {...register("requiredBonuses", {
                                            required: `${lng === "de" ? language.required.de : language.required.en}`,
                                            value: requiredBonuses,
                                            onChange: (e) => {
                                                setRequiredBonuses(e.target.value)
                                            }
                                        })}
                                    />
                                    <p className="errorMessage">{errors.requiredBonuses && errors.requiredBonuses.message}</p>
                                    <TextField
                                        id="standard-basic"
                                        label={lng === "de" ? language.gift.de : language.gift.en}
                                        variant="standard"
                                        type="text"
                                        fullWidth
                                        {...register("gift", {
                                            required: `${lng === "de" ? language.required.de : language.required.en}`,
                                            value: gift,
                                            onChange: (e) => {
                                                setGift(e.target.value)
                                            }
                                        })}
                                    />
                                    <p className="errorMessage">{errors.gift && errors.gift.message}</p>
                                </div>
                                <Button type="submit" variant="outlined">
                                    {lng === "de" ? language.send.de : language.send.en}
                                </Button>
                            </form>
                        </div>
                        <div className="about__info">
                            <p>{lng === "de" ? language.username.de : language.username.en}: {myData.name ? ((myData.name).replace(/_/g," ")) : myData.name}</p>
                            <p>
                                <span className="info__type_business">
                                    {myData.type_business ? ((myData.type_business).replace(/_/g," ")) : myData.type_business}
                                </span>: {myData.business_name ? ((myData.business_name).replace(/_/g," ")) : myData.business_name}
                            </p>
                        </div>
                    </AliceCarousel>
                    <AllOffers myData={myData} />
                    <AllUsers myData={myData} />
                    <OfferHistory myData={myData} />
                    <div className="about__features">
                        <AliceCarousel disableButtonsControls='true'>
                            <AllOffers myData={myData} />
                            <AllUsers myData={myData} />
                            <OfferHistory myData={myData} />
                        </AliceCarousel>
                    </div>
                </div>
                <div className="page__bg"></div>
            </div>
            <Snack />
            <Feedback />
        </>
    );
});

export default Owner;