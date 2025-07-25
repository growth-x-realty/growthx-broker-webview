import { BrokerDetails, ErrorType, Lead, Property, PropertyLead } from './types'

export type SuccessResponse = {
    status: "success";
}


/**
 * Success Response for public requests
 */

export interface ResponseGetAllProperties extends SuccessResponse {
    //TODO
}

export interface ResponseBeBroker extends SuccessResponse {
    stage: "APPLIED" | "ALREADY_APPLIED" | "DONE";
}

export interface ResponseOtpWhatsapp extends SuccessResponse {
    hash: string;
}

export interface ResponseLoginWithOtp extends SuccessResponse {
    token: string;
    b_details: BrokerDetails
}

export interface ResponseLoginLinkWhatsapp extends SuccessResponse {

}

export interface ResponseAdminLoginWithOtp extends SuccessResponse {
    token: string;
}

/**
 * Success Response for "Broker" Request
 */

export interface ResponseGetMyProperties extends SuccessResponse {
    properties: Property[]; // all the properties
    leads: Lead[]; // all the lead of "b_id"
    propertyLead: PropertyLead[]; // all the PropertyLead where l_id is in leads of "b_id"
    intersted: string[]; // array of p_id from BrokerProperty where 'b_id'
}

export interface ResponseAddInteresed extends SuccessResponse {

}

export interface ResponseAddLead extends SuccessResponse {
    l_id: string;
}

export interface ResponseAddLeadToProperty extends SuccessResponse {

}

/**
 * Success Response for "Admin" Request
 */

export interface ResponseAddBroker extends SuccessResponse {
    b_id: string;
}

export interface ResponseAddProperty extends SuccessResponse {
    p_id: string
}

export interface ResponseUpdateProperty extends SuccessResponse {

}

export interface ResponseGetAllData extends SuccessResponse {
    //TODO
}

/**
 * Error Response
 */

export interface ErrorResponse {
    status: "error";
    error: ErrorType;
    message: string;
}