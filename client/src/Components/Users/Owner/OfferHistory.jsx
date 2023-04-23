import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import { Button, Box } from "@mui/material";
import Confirmation from "../../Partial/Confirmation/Confirmation";
import { language } from "../../lang";

const OfferHistory = observer((props) => {

    const { RequestStore, ConfigStore } = useStores();

    const myBusinessN = props.myData.business_name;

    const [lng, setLng] = useState(ConfigStore.lang);

    useEffect(() => {
        if(myBusinessN) {
            new Promise((resolve, reject) => {
                resolve();
            })
            .then(() => {
                return RequestStore.doGet(ConfigStore._url + "/oldPosts/" + myBusinessN)
            })
            .then((res) => {
                ConfigStore.setPostsHistory(res);
            })
        } else {
            return;
        }
    },[myBusinessN, RequestStore, ConfigStore]);

    const returnPost = (e) => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            ConfigStore.setPostId(e.target.id);
        })
        .then(() => {
            ConfigStore.setStateConfirmation("restore");
        })
        .then(() => {
            ConfigStore.setHeaderConfirmation(lng === "de" ? "Möchten Sie dieses Angebot zurückgeben?" : "Do you want to return this offer?");
        })
        .then(() => {
            ConfigStore.setTextConfirmation(lng === "de" ? "Sie können es jederzeit löschen!" : "You can delete it at any time!");
        })
        .then(() => {
            ConfigStore.setIsConfirmShow(true);
        })
    };

    const deleteForever = (e) => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            ConfigStore.setPostId(e.target.id);
        })
        .then(() => {
            ConfigStore.setStateConfirmation("forever");
        })
        .then(() => {
            ConfigStore.setHeaderConfirmation(lng === "de" ? "Möchten Sie dieses Angebot endgültig löschen?" : "Do you want to delete forever this offer?");
        })
        .then(() => {
            ConfigStore.setTextConfirmation(lng === "de" ? "Danach können Sie es nicht zurückgeben!" : "After that you can't return it!");
        })
        .then(() => {
            ConfigStore.setIsConfirmShow(true);
        })
    }

    useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return(
        <div className="features__history">
            <p className="offers__title">{lng === "de" ? language.historyOffer.de : language.historyOffer.en}</p>
            {ConfigStore.postsHistory ? 
                ConfigStore.postsHistory.slice().reverse().map(post => 
                <div className="offers__card" key={post._id}>
                    <p>{lng === "de" ? language.cond.de : language.cond.en}: {post.condition}</p>
                    <p>{lng === "de" ? language.required_bon.de : language.required_bon.en}: {post.required_bonuses}</p>
                    <p>{lng === "de" ? language.gift.de : language.gift.en}: {post.gift}</p>
                    <Box>
                        <Button
                            onClick={returnPost}
                            id={post._id}
                            variant="outlined"
                            color="success"
                            style={{
                                marginRight: "5px"
                            }}
                        >
                            {lng === "de" ? language.return.de : language.return.en}
                        </Button>
                        <Button
                            onClick={deleteForever}
                            id={post._id}
                            variant="outlined"
                            color="error"
                        >
                            {lng === "de" ? language.delete.de : language.delete.en}
                        </Button>
                    </Box>
                </div>)
            :
                <p>{lng === "de" ? language.anyHistory.de : language.anyHistory.en}</p>
            }
            <Confirmation />
        </div>
    );
});

export default OfferHistory;