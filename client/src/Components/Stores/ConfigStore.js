import { makeAutoObservable } from "mobx";

export default class ConfigStore {
    // _url = "https://023d-2001-a61-2a87-5f01-42ec-7c5e-852f-dee9.ngrok-free.app";
    _url = "http://localhost:3001";
    isShow = false;
    isInfoAlertShow = false;
    isConfirmShow = false;
    isSnackShow = false;
    isAboutShow = false;
    isFeedbackShow = false;
    lang = window.navigator.language.slice(0, 2);
    scroll = "paper";
    businessName = "";
    hederConfirmation = "";
    textConfirmation = "";
    stateConfirmation = "";
    posts = [];
    postsHistory = [];
    postId = "";
    textAlert = "";
    severity = "";
    err = "";

    constructor(MainStore) {
        this.MainStore = MainStore;
        makeAutoObservable(this);
    };

    setLang(lang) {
        this.lang = lang;
    };

    setIsShow(show) {
        this.isShow = show;
    };

    setIsInfoAlertShow(infoAlert) {
        this.isInfoAlertShow = infoAlert;
    };

    setTextAlert(textAlert) {
        this.textAlert = textAlert;
    };

    setSeverity(sev) {
        this.severity = sev;
    };

    setIsConfirmShow(confirm) {
        this.isConfirmShow = confirm;
    };

    setHeaderConfirmation(header) {
        this.hederConfirmation = header;
    };

    setTextConfirmation(text) {
        this.textConfirmation = text;
    };

    setStateConfirmation(state) {
        this.stateConfirmation = state;
    };

    setPosts(posts) {
        this.posts = posts;
    };

    setPostsHistory(posts) {
        this.postsHistory = posts;
    };

    setPostId(id) {
        this.postId = id;
    };

    setIsSnackShow(snack) {
        this.isSnackShow = snack;
    };

    setBusinessName(businessName) {
        this.businessName = businessName;
    };

    setIsAboutShow(about) {
        this.isAboutShow = about;
    };

    setScroll(scroll) {
        this.scroll = scroll;
    };

    setIsFeedbackShow(feedback) {
        this.isFeedbackShow = feedback;
    };

    setErr(err) {
        this.err = err;
    };
}