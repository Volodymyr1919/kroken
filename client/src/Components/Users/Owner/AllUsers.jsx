import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import { language } from "../../lang";

const AllUsers = observer((props) => {

    const { RequestStore, ConfigStore } = useStores();

    const myBusiness = props.myData.business_name;
    const [allUsers, setAllUsers] = useState([]);
    const [lng, setLng] = useState(ConfigStore.lang);

    useEffect(() => {
        if(myBusiness) {
            new Promise((resolve, reject) => {
                resolve();
            })
            .then(() => {
                return RequestStore.doGet(ConfigStore._url + "/users")
            })
            .then((res) => {
                setAllUsers(res.filter(item => item.business_name === myBusiness));
            })
        } else {
            return;
        }
        
    },[myBusiness, RequestStore, ConfigStore]);

    useEffect(() => {
        setLng(ConfigStore.lang);
    }, [ConfigStore.lang]);

    return(
        <div className="features__allUsers">
            <p className="allUsers__title">{lng === "de" ? language.allVis.de : language.allVis.en}</p>
            {allUsers ? allUsers.slice().reverse().map(user => 
                <p className="allUsers__user" key={user._id}>{lng === "de" ? language.visitor.de : language.visitor.en}: {user.name}; Bonus: {user.bonus}</p>
            )
            :
                <p className="allUsers__alt">{lng === "de" ? language.anyUser.de : language.anyUser.en}</p>
            }
        </div>
    );
});
export default AllUsers;