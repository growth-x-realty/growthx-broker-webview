import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStoreProperty } from "@/state/store";
import { ChevronDown, ChevronUp, FileText, MessageSquareShare, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { AddInterested } from "./AddInterested";
import { AddLead } from "./AddLead";
import { LeadTableOfProperty } from "./LeadTable";

export const PropertyCard = ({ p_id }: { p_id: string }) => {
    const [hidden, setHidden] = useState(true);
    const property = useStoreProperty((s) => s.data.get(p_id));

    if (!property) {
        return (<></>)
    }
    let img = property.p_details?.img?.length ? property.p_details.img[0] : "https://placehold.co/600x400?text=No+Image+Avilable"
    const styles = {
        tabStyle: 'text-slate-500 data-[state=active]:bg-primary/50 data-[state=active]:text-slate-800 text-xs'
    }

    const message = `
🏡 New Property Alert!
https://growthx-broker-webview.vercel.app
    
Name: Aditri Everest
Address: Ameenpur, Near Chandannagar , West  Bengal
Status: Open for sale
`;

    const handleShare = () => {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    return (<>
        <div className='p-3 border shadow-sm bg-slate-50/50'>
            <div className='flex gap-3'>
                <img src={img} className='border rounded-md w-[9rem] object-cover' />
                <div>
                    <p className='font-semibold'>{property.p_details?.name || "Name Unknown"}</p>
                    <p className='text-muted-foreground italic text-sm'>{property.p_details?.addr || "Address Unknown"}</p>
                    <p className='text-green-500 text-sm font-semibold'>OPEN for sale</p>
                </div>
            </div>
            <p> <span className='text-sm  text-muted-foreground pl-1'>Expected Amount</span> <span className="italic text-sm font-semibold text-slate-600">65,00,000</span></p>
            <div className="flex justify-between">
                <div className='py-1.5 pl-1'>
                    <p className='text-xs'><span className='font-semibold text-red-900'>15 Agents</span> shown interest</p>
                    <p className='text-xs'><span className='font-semibold text-blue-950'>2 Active</span> Leads</p>
                </div>
                <AddInterested p_id={p_id} />
            </div>

            {/* buttons */}
            <div className='flex justify-around'>
                <Button variant={"outline"} onClick={() => setHidden(!hidden)}>
                    {hidden ?
                        <><ChevronDown />Show More</> :
                        <><ChevronUp /> Show Less</>
                    }
                </Button>
                <Button variant={"outline"} onClick={handleShare}><MessageSquareShare />Share on Whatsapp</Button>
            </div>

            {/* Hidden */}
            {
                !hidden && (
                    <Tabs defaultValue='leads' className='pt-3'>
                        <TabsList className='w-full border shadow-sm'>
                            <TabsTrigger className={styles.tabStyle} value='leads'><Users />My Leads</TabsTrigger>
                            <TabsTrigger className={styles.tabStyle} value='details'><FileText />Details</TabsTrigger>
                        </TabsList>

                        {/* My Leads */}
                        <TabsContent value='leads'>
                            <LeadTableOfProperty p_id={p_id} />
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button className='mt-2'><UserPlus />Add New Lead</Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <AddLead p_id={p_id} />
                                </DrawerContent>
                            </Drawer>
                        </TabsContent>
                    </Tabs>
                )
            }
        </div>
    </>)
}