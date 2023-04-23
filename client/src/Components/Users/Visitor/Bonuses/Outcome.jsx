import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { observer } from "mobx-react";
import { useStores } from "../../../Stores/MainStore";
import InfoAlert from "../../../Partial/InfoAlert";
import { language } from "../../../lang";

const Outcome = observer(() => {

  const { RequestStore, ConfigStore } = useStores();

  const [bonus, setBonus] = useState("");
  const [lng, setLng] = useState(ConfigStore.lang);

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
          return RequestStore.doPost(ConfigStore._url + "/spendbonus", {
            id : localStorage.getItem("myAppId"),
            bonus : data.bonus
          })
        })
        .then((res) => {
          if (res.status === 400) {
            ConfigStore.setSeverity("error");
            ConfigStore.setTextAlert(lng === "de" ? "Nicht genügend Boni" : "Not enough bonuses");
            ConfigStore.setIsInfoAlertShow(true);
          } else {
            ConfigStore.setSeverity("success");
            ConfigStore.setTextAlert(lng === "de" ? "Erfolgreich" : "Successfully");
            ConfigStore.setIsInfoAlertShow(true);
          }
        })
      };

      useEffect(() => {
        setLng(ConfigStore.lang);
      }, [ConfigStore.lang]);

    return(
      <div className="personalPage__bonus">
          <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                  id="standard-basic"
                  label={lng === "de" ? language.prise.de : language.prise.en}
                  variant="standard"
                  type="number"
                  className="bonus__withdrow"
                  {...register("bonus", {
                      required: `${lng === "de" ? language.required.de : language.required.en}`,
                      value: bonus,
                      onChange: (e) => {
                          setBonus(e.target.value)
                      }
                  })}
              />
              <p className="errorMessage">{errors.bonus && errors.bonus.message}</p>
              <Button variant="outlined" type="submit">
                {lng === "de" ? language.conf.de : language.conf.en}
              </Button>
          </form>
          <div className="personalPage__bg"></div>
          <InfoAlert />
      </div>
    );
});

export default Outcome;