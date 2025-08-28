import { PropertyDetails, PropertyStatus, PropertyZones } from "./types";

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
    p_id: string;
    name: string;
    price: number;
}

export interface RequestLogout {
    all?: boolean;
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
    name: string;
    addr?: string;
}

export interface RequestAddProperty {
    p_status: PropertyStatus;
    p_zone: PropertyZones;
    p_details: PropertyDetails;
    exp_price: number;
}

export interface RequestUpdateProperty {
    p_id: string; // "Property" _id
    p_status?: PropertyStatus; // notification trigger
    p_zone?: PropertyZones;
    p_details?: PropertyDetails;
    exp_price?: number;
}

export interface RequestDeleteProperty {
    p_id: string; // "Property" _id
}

export interface RequestGetAllData { }