import * as React from "react";
import RequestStore from "./RequestStore";
import ConfigStore from "./ConfigStore";

class MainStore {
    constructor() {
        this.RequestStore = new RequestStore(this);
        this.ConfigStore = new ConfigStore(this);
    }
};

const StoresContext = React.createContext(new MainStore());

export const useStores = () => React.useContext(StoresContext);