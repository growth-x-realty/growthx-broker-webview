export type ErrorType =
    | "UNAUTHORIZED"
    | "OTP_TIMEOUT"
    | "OTP_INVALID"
    | "MISSING_FIELD"
    | "ALREADY_EXIST"
    | "INVALID_FIELD_TYPE"
    | "PROPERTY_NOT_EXIST"
    | "LEAD_NOT_EXIST"
    | "BROKER_NOT_EXIST"
    | "INTERNAL_ERROR"

export type PropertyZones =
    | "ZONE_1"
    | "ZONE_2"


export type PropertyStatus = "UNPUBLISHED" | "PUBLISHED";

export type InboxTypes = "REQ_BROKER" | "CONTACT_US";

export type PropertyDetails = {
    name?: string;
    img?: string[];
    addr?: string;
};


export type Property = {
    _id: string;
    p_details: PropertyDetails;
    p_status: PropertyStatus;
    p_zone: PropertyZones;
}

export type Lead = {
    _id: string;
    p_id: string; // foregin key "Property"
    b_id: string; // foregin key "Broker"
    name: string;
    status: "WAITING" | "PROGRESS" | "SOLD";
    price: number;
};

export type PropertyLead = {
    p_id: string; // foregin key "Property"
    l_id: string; // foregin key "Lead"
    status: "SOLD" | "WAITING";
};