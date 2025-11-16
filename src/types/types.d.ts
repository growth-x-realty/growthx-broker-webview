import { _Area } from "./constant";

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

export type InboxTypes = "REQ_BROKER" | "CONTACT_US";

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
    _id?: string;
    type: InboxTypes;
    name: string;
    phone: string;
    email: string;
    remarks?: string;
};

//================= Property ===================

export type PropertyDetails = {
    // Property Details
    propertyType?: "Flat" | "Villa";
    builderName?: string;
    contactNo?: string;
    builtUpAreaSqFt?: number;
    bhk?: number;
    facing?: string;
    possessionStatus?: string;
    ageOfProperty?: string;
    carParking?: number;
    handoverDate?: Date;
    images?: string;
    googleMapLocation?: string;

    // Flat Details
    communityType?: string;
    totalFlats?: number;
    carpetAreaSqFt?: number;
    floorNumber?: number;
    totalFloors?: number;

    // Villa Details
    villaType?: string;
    landSizeSqYard?: number;
    totalVillas?: number;
    villaTotalFloors?: number;
    gatedCommunity?: boolean;
    homeTheater?: boolean;
    liftProvision?: boolean;

    // Pricing Details
    priceAvailable?: boolean;
    totalPrice?: number;
    perSqFtRate?: number;
    floorRiseCharges?: number;
    corpus?: number;

    // Amenities Details
    amenities?: string[];
    powerBackup?: boolean;
    lifts?: boolean;
    carParkingCovered?: boolean;
    guestCarParking?: boolean;
    securityCCTV?: boolean;
    clubhouseGymPool?: boolean;
    childrensPlayArea?: boolean;
    communityHall?: boolean;

    // misc 
    avilableUnits?: string;
}

export type Property = {
    _id: string;
    name: string;
    addr: string;
    p_details: Record<string, any>;
    p_status: "UNPUBLISHED" | "OPEN" | "PROGRESS" | "SOLD";
    area: keyof typeof _Area;
}

//================= Property End ===================