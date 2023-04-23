import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import Confirmation from "../../Partial/Confirmation/Confirmation";
import { language } from "../../lang";

const AllOffers = observer((props) => {

    const { RequestStore, ConfigStore } = useStores();

    const myBusinessN = props.myData.business_name;

    const [lng, setLng] = useState(ConfigStore.lang);

    useEffect(() => {
        if(myBusinessN) {
            new Promise((resolve, reject) => {
                resolve();
            })
            .then(() => {
                return RequestStore.doGet(ConfigStore._url + "/posts/" + myBusinessN)
            })
            .then((res) => {
                ConfigStore.setPosts(res);
            })
        } else {
            return;
        }
    },[myBusinessN, RequestStore, ConfigStore]);

    const deletePost = (e) => {
        new Promise((resolve, reject) => {
            resolve();
        })
        .then(() => {
            ConfigStore.setPostId(e.target.id);
        })
        .then(() => {
            ConfigStore.setStateConfirmation("delete");
        })
        .then(() => {
            ConfigStore.setHeaderConfirmation(lng === "de" ? "Möchten Sie dieses Angebot löschen?" : "Do you want to delete this offer?");
        })
        .then(() => {
            ConfigStore.setTextConfirmation(lng === "de" ? "Sie können es jederzeit zurückgeben!" : "You can return it at any time!");
        })
        .then(() => {
            ConfigStore.setIsConfirmShow(true);
        })
    };

    useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return(
        <div className="features__offers">
            <p className="offers__title">{lng === "de" ? language.allOffers.de : language.allOffers.en}</p>
            {ConfigStore.posts ? (ConfigStore.posts.slice().reverse().map(post => 
                <div className="offers__card" key={post._id}>
                    <p>{lng === "de" ? language.cond.de : language.cond.en}: {post.condition}</p>
                    <p>{lng === "de" ? language.required_bon.de : language.required_bon.en}: {post.required_bonuses}</p>
                    <p>{lng === "de" ? language.gift.de : language.gift.en}: {post.gift}</p>
                    <Button
                        onClick={deletePost}
                        id={post._id}
                        variant="outlined"
                        color="error"
                    >
                        {lng === "de" ? language.delete.de : language.delete.en}
                    </Button>
                </div>))
            :
                <p>{lng === "de" ? language.anyOffers.de : language.anyOffers.en}</p>
            }
            <Confirmation />
        </div>
    );
});

export default AllOffers;