import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useStoreProperty } from "@/state/store";
import type { PropertyDetails } from "@/types/types";
import { ArrowUpRight, Building, Calendar, Car, ChevronDown, ChevronUp, Dumbbell, Home, MapPin, Proportions, Ratio, Share, Shield, UserPlus, Users } from "lucide-react";
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
        case "OPEN": return "bg-green-500";
        case "PROGRESS": return "bg-yellow-500";
        case "SOLD": return "bg-red-500";
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
                    <Badge className={`absolute top-2 right-2 ${getStatusBadgeColor(property.p_status)} text-white`}>
                        {property.p_status}
                    </Badge>
                </div>

                <CardContent className="p-4 space-y-3">
                    {/* Builder and Property Name */}
                    <div>
                        <h3 className="font-medium text-lg">{property.name}</h3>
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
                                    <Proportions className="w-4 h-4 mr-1" />Land Size {details.landSizeSqYard} sq yd
                                </span>
                            }
                        </div>
                    </div>

                    {/* Price */}
                    {details.priceAvailable && details.totalPrice && (
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xl font-semibold text-primary">
                                    {formatPrice(details.totalPrice)}
                                </p>
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
                                    <Share />
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
                                <h4 className="font-medium mb-2">Property Details</h4>
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
                            {/* Handover Date */}
                            {details.avilableUnits &&
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Available Units:</span>
                                    <span>{details.avilableUnits}</span>
                                </div>
                            }
                        </CollapsibleContent>
                    </Collapsible>
                </CardContent>
            </Card >
        </>
    )
}

export default PropertyCard