import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/MainStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorModal from "../../Partial/ErrorModal";
import Feedback from "../../Partial/Feedback/Feedback";
import { language } from "../../lang";
// eslint-disable-next-line no-unused-vars
import signIn from "./signIn.scss";
import { faChevronRight, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const SignIn = observer(() => {

  const { RequestStore, ConfigStore } = useStores();

  const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [lng, setLng] = useState(ConfigStore.lang);
    let usNF = `${lng === "de" ? "Benutzer nicht gefunden" : "User not found"}`
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onChange",
      });
      const onSubmit = (data) => {
        new Promise((resolve, reject) => {
          resolve();
        })
        .then(() => {
          return RequestStore.doPost(ConfigStore._url + "/signin", {
            username : (data.username).replace(/ /g,"_"),
            password : data.password
          })
        })
        .then((res) => {
          if (res._id) {
            localStorage.setItem('myAppId', res._id);
            switch (res.who) {
              case "visitor":
                navigate("/user");
                break;
                
              case "owner":
                navigate("/owner");
                break;

              default:
                break;
            }
          } else {
            res.status === 404 ? ConfigStore.setErr(usNF) : ConfigStore.setErr(res.statusText);
            ConfigStore.setIsShow(true);
          }
        })
      };

      useEffect(() => {
        setLng(ConfigStore.lang);
      }, [ConfigStore.lang]);

    return(
      <div className="signin">
        <ErrorModal />
        <Feedback />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="screen">
              <div className="screen__content">
                <div className="login">
                    <div className="login__field">
                        <FontAwesomeIcon icon={faUser} className="login__icon"></FontAwesomeIcon>
                        <input
                            type="text"
                            className="login__input"
                            placeholder={lng === "de" ? language.logname.de : language.logname.en}
                            {...register("username", {
                                required: `${lng === "de" ? language.required.de : language.required.en}`,
                                minLength: {
                                    value: 4,
                                    message: `${lng === "de" ? language.min4symb.de : language.min4symb.en}`
                                },
                                value: username,
                                onChange: (e) => {
                                  setUsername(e.target.value);
                                }
                            })}
                        />
                        <p className="errorMessage">{errors.username && errors.username.message}</p>
                    </div>
                    <div className="login__field">
                        <FontAwesomeIcon icon={faLock} className="login__icon"></FontAwesomeIcon>
                        <input
                            type="password"
                            className="login__input"
                            placeholder={lng === "de" ? language.password.de : language.password.en}
                            {...register("password", {
                                required: `${lng === "de" ? language.required.de : language.required.en}`,
                                minLength: {
                                    value: 6,
                                    message: `${lng === "de" ? language.min6symb.de : language.min6symb.en}`
                                },
                                value: password,
                                onChange: (e) => {
                                  setPassword(e.target.value);
                                }
                            })}
                        />
                        <p className="errorMessage">{errors.password && errors.password.message}</p>
                    </div>
                    <button type="submit" className="button login__submit">
                        <span className="button__text">
                          {lng === "de" ? language.signin.de : language.signin.en}
                        </span>
                        <FontAwesomeIcon icon={faChevronRight} className="button__icon"></FontAwesomeIcon>
                    </button>				
                </div>
              </div>
              <div className="screen__background"></div>		
            </div>
          </div>
        </form>
        <div className="signin__bg"></div>
      </div>
    );
});

export default SignIn;