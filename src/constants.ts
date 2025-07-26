import type { ApiParams } from '../types'

export const nav = {

};

export const query_key = {
    ALL_PROPERTIES: "ALL_PROPERTIES",
    ALL_USERS: "ALL_USERS",
    ALL_TRANS: "ALL_TRANS",
    INBOX: "INBOX"
};

// export const BASE_URL = "http://localhost:7071/api/";
export const BASE_URL = "https://growthx-broker-backend-fvcrfvdaggd6f8dk.centralindia-01.azurewebsites.net/api/"




export const apiParams = {
    REQ_BROKER: {
        url: BASE_URL + 'req-broker',
        method: "POST"
    } as ApiParams,
    REQ_WH_OTP: {
        url: BASE_URL + 'req-wh-otp',
        method: "POST",
    } as ApiParams,
    LOGIN: {
        url: BASE_URL + 'login',
        method: "POST"
    } as ApiParams,
    ADD_LEAD: {
        url: BASE_URL + 'add-lead',
        method: "POST",
        auth: true
    } as ApiParams,
    ADD_INTERESTED: {
        url: BASE_URL + 'add-interested',
        method: "POST",
        auth: true
    } as ApiParams,
    ADD_LEAD_TO_PROPERTY: {
        url: BASE_URL + 'add-lead-to-property',
        method: "POST",
        auth: true
    } as ApiParams,
    GET_DATA: {
        url: BASE_URL + 'get-data',
        method: "GET",
        auth: true
    } as ApiParams,
}

export const msgs = {
    req_otp_success: "OTP sent on whatsapp number",
    login: "Welcome ",
    be_broker: "Thank you for Regestering. Our team will contact you very soon",
    be_broker_exists: "Your request is already registered.",
    be_broker_done: "Your account is activated. Please login with registered whatsapp number"
}