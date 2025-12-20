import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useStoreProperty } from "@/state/store";
import type { PropertyDetails } from "@/types/types";
import { ArrowUpRight, Building, Calendar, Car, ChevronDown, ChevronUp, Dumbbell, Home, MapPin, Ratio, Shield, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { WhatsAppShareDialog } from "../WhatsappShare";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { LeadTableOfProperty } from "./LeadTable";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AddLead } from "./AddLead";
import { AddInterested } from "./AddInterested";

const getStatusBadgeColor = (status: string) => {
    switch (status) {
        case "Ready to Move": return "bg-green-500";
        case "Under Construction": return "bg-yellow-500";
        case "Pre launch": return "bg-red-300";
        default: return "bg-gray-500";
    }
};

const formatPrice = (price: number) => {
    if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
        return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
};

const PropertyCard = ({ p_id }: { p_id: string }) => {
    const [isExpanded, setIsExpanded] = useState<"LEAD" | "DETAILS" | "NONE">("NONE");

    const property = useStoreProperty(s => s.data.get(p_id));
    if (!property) return <></>;



    const details = property.p_details as PropertyDetails;
    // to maintain backward compatiblity with string type.
    let _units = details.avilableUnits;
    if (_units) {
        if (typeof _units == 'string') {
            _units = [_units]
        }
    }
    return (
        <>
            <Card className="w-full max-w-sm mx-auto overflow-hidden py-0">
                {/* Image Carousel */}
                <div className="relative h-48">
                    {(details.images) ? (
                        <>
                            <img
                                src={details.images}
                                alt={`${details.builderName} property`}
                                className="w-full h-full object-cover"
                            />

                        </>
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Home className="w-12 h-12 text-gray-400" />
                        </div>
                    )}

                    {/* Status Badge */}
                    {
                        (details.possessionStatus) &&
                        <Badge className={`absolute top-2 right-2 ${getStatusBadgeColor(details.possessionStatus)} text-white`}>
                            {details.possessionStatus}
                        </Badge>
                    }
                </div>

                <CardContent className="p-4 space-y-3">
                    {/* Builder and Property Name */}
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lg">{property.name} </h3>
                            <p className="text-sm font-semibold text-gray-600">{details.propertyType}</p>
                        </div>

                        {property.name && (
                            <p className="text-muted-foreground">{details.builderName}</p>
                        )}
                    </div>

                    {/* Key Details */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {details.bhk &&
                                <Badge variant="secondary">{details.bhk} BHK</Badge>
                            }
                            {details.builtUpAreaSqFt &&
                                <span className="flex items-center text-sm text-muted-foreground">
                                    <Ratio className="w-4 h-4 mr-1" />
                                    {details.builtUpAreaSqFt} sq ft
                                </span>
                            }
                            {details.landSizeSqYard &&
                                <span className="flex items-center text-sm text-muted-foreground">
                                    | Land Size {details.landSizeSqYard} sq yd
                                </span>
                            }
                            {details.plotSize &&
                                <span className="flex items-center text-sm text-muted-foreground">
                                    | Plot Size {details.plotSize} sq yd
                                </span>
                            }
                        </div>
                    </div>

                    {/* Price */}
                    {details.priceAvailable && details.totalPrice && (
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex gap-8 items-center">
                                    <p className="text-xl font-semibold text-primary">
                                        {formatPrice(details.totalPrice)}
                                    </p>
                                    {details.paymentType && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Payment Type : <span className="text-slate-600">{details.paymentType}</span></span>
                                        </div>
                                    )}
                                </div>
                                {details.perSqFtRate && (
                                    <p className="text-sm text-muted-foreground">
                                        ₹{details.perSqFtRate}/sq ft
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Location */}
                    <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground line-clamp-2">{property.addr}</p>
                    </div>
                    {details.googleMapLocation &&
                        <a href={details.googleMapLocation} className='text-muted-foreground text-sm border rounded-2xl px-2 flex border-muted-foreground items-center w-fit'>  Google Map <ArrowUpRight size={16} /></a>
                    }

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        {/* ----------- Add Lead */}
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button
                                    className="flex-1"
                                >
                                    <UserPlus />Add Lead
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent aria-describedby="add lead">
                                <AddLead p_id={p_id} exp_price={details.totalPrice || 0} />
                            </DrawerContent>
                        </Drawer>


                        {/* ---------- Whatsapp Share */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button

                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    size="icon"
                                >
                                    <svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.064"></g><g id="SVGRepo_iconCarrier"> <title>whatsapp</title> <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path> </g></svg>
                                </Button>
                            </DialogTrigger>
                            <WhatsAppShareDialog property={property} />
                        </Dialog>

                        {/* ---------- Add Interested */}
                        <AddInterested p_id={property._id} />
                    </div>

                    <Separator />

                    <div className="flex gap-4">
                        <Button
                            onClick={() => setIsExpanded(pre => (pre == "LEAD") ? "NONE" : "LEAD"
                            )}
                            variant={isExpanded == "LEAD" ? "secondary" : "outline"}
                            className="justify-between flex-1">
                            My Leads
                            {isExpanded == "LEAD" ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </Button>
                        <Button onClick={() => setIsExpanded(pre => (pre == "DETAILS") ? "NONE" : "DETAILS"
                        )}
                            variant={isExpanded == "DETAILS" ? "secondary" : "outline"}
                            className="justify-between flex-1">
                            More Details
                            {isExpanded == "DETAILS" ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                    {/* =============== My Lead ================== */}
                    <Collapsible open={isExpanded == "LEAD"} >
                        <CollapsibleContent className="space-y-4 pt-4">
                            <LeadTableOfProperty p_id={property._id} />
                        </CollapsibleContent>
                    </Collapsible>
                    {/* =============== Expandable More Details ======*/}
                    <Collapsible open={isExpanded == "DETAILS"} >
                        <CollapsibleContent className="space-y-4 pt-4">
                            {/* Property Specifications */}
                            <div>
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium mb-2">Property Details</h4>
                                    {details.viewBrochure &&
                                        <a target="_blank" href={details.viewBrochure} className='text-muted-foreground text-xs border rounded-2xl px-2 py-1 flex border-muted-foreground items-center w-fit'> View Brochure <ArrowUpRight size={13} /></a>
                                    }
                                </div>
                                <div className="grid grid-cols-1 gap-2 text-sm">
                                    {details.facing &&
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Facing:</span>
                                            <span>{details.facing}</span>
                                        </div>
                                    }
                                    {details.ageOfProperty &&
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Age:</span>
                                            <span>{details.ageOfProperty}</span>
                                        </div>
                                    }
                                    {details.possessionStatus &&
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Status:</span>
                                            <span>{details.possessionStatus}</span>
                                        </div>
                                    }
                                    {details.carParking &&
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Parking:</span>
                                            <span>{details.carParking}</span>
                                        </div>
                                    }

                                    {/* Flat specific details */}
                                    {(details.propertyType == "Flat") && (
                                        <>
                                            {
                                                details.floorNumber &&
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Floor:</span>
                                                    <span>{details.floorNumber}{details.totalFloors && <>/{details.totalFloors}</>}</span>
                                                </div>
                                            }
                                            {details.totalFlats &&
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Total Flats:</span>
                                                    <span>{details.totalFlats}</span>
                                                </div>
                                            }
                                            {details.carpetAreaSqFt && (
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Carpet Area:</span>
                                                    <span>{details.carpetAreaSqFt} sq ft</span>
                                                </div>
                                            )}
                                            {details.communityType &&
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Community:</span>
                                                    <span>{details.communityType}</span>
                                                </div>
                                            }
                                        </>
                                    )}

                                    {/* Villa specific details */}
                                    {!(details.propertyType == "Flat") && (
                                        <>
                                            {details.villaType &&
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Villa Type:</span>
                                                    <span>{details.villaType}</span>
                                                </div>
                                            }
                                            {details.landSizeSqYard &&
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Land Size:</span>
                                                    <span>{details.landSizeSqYard} sq yd</span>
                                                </div>
                                            }
                                            {details.totalFloors &&
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Floors:</span>
                                                    <span>{details.totalFloors}</span>
                                                </div>
                                            }
                                            {details.totalVillas && (
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Total Villas:</span>
                                                    <span>{details.totalVillas}</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Pricing Details */}
                            {details.priceAvailable && (
                                <div>
                                    <h4 className="font-medium mb-2">Pricing Details</h4>
                                    <div className="space-y-1 text-sm">
                                        {details.totalPrice && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Total Price:</span>
                                                <span>₹{details.totalPrice.toLocaleString()}</span>
                                            </div>
                                        )}
                                        {details.perSqFtRate && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">per sqft rate:</span>
                                                <span>₹{details.perSqFtRate.toLocaleString()}</span>
                                            </div>
                                        )}
                                        {details.floorRiseCharges && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Floor Rise Charges:</span>
                                                <span>₹{details.floorRiseCharges.toLocaleString()}</span>
                                            </div>
                                        )}
                                        {details.corpus && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Corpus:</span>
                                                <span>₹{details.corpus.toLocaleString()}</span>
                                            </div>
                                        )}
                                        {details.paymentType && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Payment Type:</span>
                                                <span>{details.paymentType}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Amenities */}
                            {details.amenities && details.amenities.length > 0 && (
                                <div>
                                    <h4 className="font-medium mb-2">Amenities</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {details.amenities.map((amenity, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {amenity}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Society Amenities */}
                            <div>
                                <h4 className="font-medium mb-2">Society Features</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {details.powerBackup && (
                                        <div className="flex items-center space-x-2">
                                            <Shield className="w-4 h-4 text-green-600" />
                                            <span>Power Backup</span>
                                        </div>
                                    )}
                                    {details.lifts && (
                                        <div className="flex items-center space-x-2">
                                            <Building className="w-4 h-4 text-green-600" />
                                            <span>Lifts</span>
                                        </div>
                                    )}
                                    {details.securityCCTV && (
                                        <div className="flex items-center space-x-2">
                                            <Shield className="w-4 h-4 text-green-600" />
                                            <span>Security CCTV</span>
                                        </div>
                                    )}
                                    {details.clubhouseGymPool && (
                                        <div className="flex items-center space-x-2">
                                            <Dumbbell className="w-4 h-4 text-green-600" />
                                            <span>Club/Gym/Pool</span>
                                        </div>
                                    )}
                                    {details.childrensPlayArea && (
                                        <div className="flex items-center space-x-2">
                                            <Users className="w-4 h-4 text-green-600" />
                                            <span>Play Area</span>
                                        </div>
                                    )}
                                    {details.communityHall && (
                                        <div className="flex items-center space-x-2">
                                            <Building className="w-4 h-4 text-green-600" />
                                            <span>Community Hall</span>
                                        </div>
                                    )}
                                    {details.carParkingCovered && (
                                        <div className="flex items-center space-x-2">
                                            <Car className="w-4 h-4 text-green-600" />
                                            <span>Covered Parking</span>
                                        </div>
                                    )}
                                    {details.guestCarParking && (
                                        <div className="flex items-center space-x-2">
                                            <Car className="w-4 h-4 text-green-600" />
                                            <span>Guest Parking</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Handover Date */}
                            {details.handoverDate && (
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        Expected Handover: {new Date(details.handoverDate).toLocaleDateString()}
                                    </span>
                                </div>
                            )}

                            {/* available units */}
                            {_units && _units.length > 0 && (
                                <div>
                                    <h4 className="font-medium mb-2">Available Units: {_units.length}</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {_units.map((units, index) => (
                                            <p key={index} className="text-sm border rounded-md p-1.5 w-full">
                                                {units}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CollapsibleContent>
                    </Collapsible>
                </CardContent>
            </Card >
        </>
    )
}

export default PropertyCard