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
    | "WHATSAPP_ERROR"
    | "EMAIL_ERROR"

export type PropertyZones =
    | "ZONE_1"
    | "ZONE_2"


export type PropertyStatus = "UNPUBLISHED" | "OPEN" | "PROGRESS" | "SOLD";

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
    exp_price: number;
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

export type Broker = {
    _id: string;
    b_phone: string;
    b_email: string;
    name: string;
    addr?: string;
};

export type Inbox = {
    type: InboxTypes;
    name: string;
    phone: string;
};