import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import { language } from "../../lang";

const Offers = observer((props) => {

    const { RequestStore, ConfigStore } = useStores();

    const { myData } = props;

    const [posts, setPosts] = useState("");
    const [lng, setLng] = useState(ConfigStore.lang);

    useEffect(() => {
        if(myData) {
            new Promise((resolve, reject) => {
                resolve();
            })
            .then(() => {
                return RequestStore.doGet(ConfigStore._url + "/posts/" + myData.business_name)
            })
            .then((res) => {
                setPosts(res);
            })
        } else {
            return;
        }
    }, [myData, RequestStore, ConfigStore, posts]);

    useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return(
        <div className="about__offers">
            {posts ? 
                posts.slice().reverse().map(post => 
                    <div className="offers__one" key={post._id}>
                        <p>{lng === "de" ? language.cond.de : language.cond.en}: {post.condition}</p>
                        <p>{lng === "de" ? language.required_bon.de : language.required_bon.en}: {myData.bonus}/{post.required_bonuses}</p>
                        <p>{lng === "de" ? language.gift.de : language.gift.en}: {post.gift}</p>
                    </div>
                )
                :
                <div className="loader">Loading...</div>
            }
        </div>
    );
});
export default Offers;