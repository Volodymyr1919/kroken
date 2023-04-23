import React from "react";
import { Outlet } from "react-router-dom";
import PrivateHeader from "../Partial/PrivateHeader";

export default function PrivateLayout() {
    return(
        <>
            <PrivateHeader />
            <Outlet />
        </>
    );
}