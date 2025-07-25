import { BrokerDetails, LeadDetails, PropertyDetails, PropertyStatus, PropertyZones } from "./types";

export interface Request { }
/**
 * General Request : no authentication required
 */

export interface RequestGetAllProperties extends Request { }

export interface RequestBeBroker extends Request {
    name: string;
    phone: string;
}

export interface RequestOtpWhatsapp extends Request {
    phone: string;
}

export interface RequestLoginWithOtp extends Request {
    otp: number;
    hash: string;
    phone: string;
}

export interface RequestLoginLinkWhatsapp extends Request {
    number: string;
}

export interface RequestAdminLoginWithOtp extends Request {
    otp: number;
    hash: string;
    phone: string;
}

//=====================================================================
export interface BrokerRequest extends Request {
    b_id: string; // "Broker" _id
}

/**
 * Broker Request : auth level "Broker"
 */
export interface RequestGetMyProperties { }

export interface RequestAddInteresed {
    p_id: string; // "Property" _id
}

export interface RequestAddLead {
    phone: string;
    details: LeadDetails;
}

export interface RequestAddLeadToProperty {
    l_id: string; // "Lead" _id
    p_id: string; // "Property" _id
}

//=====================================================================

export interface AdminRequest extends Request {
    token: string;
}

/**
 * Admin Request : auth level "Admin"
 */

export interface RequestAddBroker {
    b_phone: string;
    b_email: string;
    b_details: BrokerDetails;
}

export interface RequestAddProperty {
    p_status: PropertyStatus;
    p_zone: PropertyZones;
    p_details: PropertyDetails;
}

export interface RequestUpdateProperty {
    p_id: string; // "Property" _id
    p_status?: PropertyStatus; // notification trigger
    p_zone?: PropertyZones;
    p_details?: PropertyDetails;
}

export interface RequestGetAllData { }