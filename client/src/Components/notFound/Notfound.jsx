import React from "react";
import notFound from "./notFound.scss";

export default function Notfound() {
    return(
        <div className="NFPage">
            <div className="NFPage__text">
                <p>Error <span className="text__number">404</span></p>
                <p>Sorry, page not found</p>
            </div>
            <div className="NFPage__bg"></div>
        </div>
    );
}