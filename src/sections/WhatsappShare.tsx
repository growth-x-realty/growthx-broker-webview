import { useState } from "react";
import { Share, Copy, Check } from "lucide-react";
import type { Property, PropertyDetails } from "@/types/types";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


interface WhatsAppShareDialogProps {
    property: Property;
}

export function WhatsAppShareDialog({ property }: WhatsAppShareDialogProps) {
    const [copied, setCopied] = useState(false);

    if (!property) return null;

    const details = property.p_details as PropertyDetails;

    const formatPrice = (price: number) => {
        if (price >= 10000000) {
            return `₹${(price / 10000000).toFixed(1)}Cr`;
        } else if (price >= 100000) {
            return `₹${(price / 100000).toFixed(1)}L`;
        }
        return `₹${price.toLocaleString()}`;
    };

    const generateWhatsAppMessage = () => {
        let message = `🏠 *${details.propertyType?.toUpperCase()} FOR SALE*\n\n`;

        // Builder and property name
        if (details.builderName)
            message += `🏢 *Builder:* ${details.builderName}\n`;
        if (property.name)
            message += `🏗️ *Project:* ${property.name}\n`;

        message += `\n`;

        // Key details
        if (details.bhk || details.builtUpAreaSqFt || details.carpetAreaSqFt || details.landSizeSqYard || details.villaType || details.facing || details.carParking)
            message += `📋 *KEY DETAILS:*\n`;
        if (details.bhk)
            message += `• ${details.bhk} BHK ${details.propertyType}\n`;
        if (details.builtUpAreaSqFt)
            message += `• ${details.builtUpAreaSqFt} sq ft Built-up Area\n`;
        if (details.carpetAreaSqFt)
            message += `• ${details.carpetAreaSqFt} sq ft Carpet Area\n`;
        if (details.landSizeSqYard)
            message += `• ${details.landSizeSqYard} sq yard Land Size\n`;
        if (details.villaType)
            message += `• ${details.villaType} Villa\n`;
        if (details.facing)
            message += `• ${details.facing} Facing\n`;
        if (details.carParking)
            message += `• ${details.carParking} Car Parking\n`;
        message += `\n`;

        // Property specific details
        if (details.propertyType === "Flat") {
            if (details.floorNumber || details.totalFloors || details.totalFlats || details.communityType)
                message += `🏢 *FLAT DETAILS:*\n`;
            if (details.floorNumber)
                message += `• Floor: ${details.floorNumber}\n`;
            if (details.totalFloors)
                message += `• Total Floors: ${details.totalFloors}\n`;
            if (details.totalFlats)
                message += `• Total Flats: ${details.totalFlats}\n`;
            if (details.communityType)
                message += `• Community: ${details.communityType}\n`;
        } else {
            if (details.totalFloors || details.totalVillas)
                message += `🏘️ *VILLA DETAILS:*\n`;
            if (details.totalFloors)
                message += `• ${details.totalFloors} Floors\n`;
            if (details.totalVillas) {
                message += `• Total Villas: ${details.totalVillas}\n`;
            }
            if (details.gatedCommunity) {
                message += `• Gated Community\n`;
            }
        }
        message += `\n`;

        // Pricing
        if (details.priceAvailable && details.totalPrice) {
            message += `💰 *PRICE:*\n`;
            message += `• Total Price: ${formatPrice(details.totalPrice)}\n`;
            if (details.perSqFtRate) {
                message += `• Rate: ₹${details.perSqFtRate}/sq ft\n`;
            }
            message += `\n`;
        }

        // Status and possess
        if (details.ageOfProperty || details.possessionStatus || details.handoverDate)
            message += `📅 *STATUS:*\n`;
        if (details.ageOfProperty)
            message += `• Age: ${details.ageOfProperty}\n`;
        if (details.possessionStatus)
            message += `• Status: ${details.possessionStatus}\n`;
        if (details.handoverDate) {
            message += `• Handover: ${new Date(details.handoverDate).toLocaleDateString()}\n`;
        }
        message += `\n`;

        // Amenities
        if (details.amenities && details.amenities.length > 0) {
            message += `✨ *AMENITIES:*\n`;
            details.amenities.slice(0, 5).forEach(amenity => {
                message += `• ${amenity}\n`;
            });
            if (details.amenities.length > 5) {
                message += `• And ${details.amenities.length - 5} more...\n`;
            }
            message += `\n`;
        }

        // Location
        if (property.addr) {
            message += `📍 *LOCATION:*\n`;
            message += `${property.addr}\n\n`;
        }
        if (details.googleMapLocation) {
            message += `📍 *GOOGLE MAP LINK:*\n`;
            message += `${details.googleMapLocation}\n\n`;
        }

        // Contact
        if (details.contactNo) {
            message += `📞 *CONTACT:*\n`;
            message += `${details.contactNo}\n\n`;
        }

        message += `💬 Interested? Let's discuss!`;

        return message;
    };

    const whatsappMessage = generateWhatsAppMessage();

    const handleWhatsAppShare = () => {
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleCopyMessage = async () => {
        try {
            await navigator.clipboard.writeText(whatsappMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = whatsappMessage;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Share className="w-4 h-4 text-white" />
                    </div>
                    Share on WhatsApp
                </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">

                <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Message Preview:
                    </label>
                    <Textarea
                        value={whatsappMessage}
                        readOnly
                        className="max-h-[55vh] text-sm font-mono resize-none"
                    />
                </div>
            </div>
            <DialogFooter className="gap-2">
                <Button
                    variant="outline"
                    onClick={handleCopyMessage}
                    className="flex items-center gap-2"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            Copy Text
                        </>
                    )}
                </Button>
                <Button
                    onClick={handleWhatsAppShare}
                    className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                >
                    <Share className="w-4 h-4" />
                    Share on WhatsApp
                </Button>
            </DialogFooter>

        </DialogContent>
    );
}