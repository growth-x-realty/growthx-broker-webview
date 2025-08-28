import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStoreProperty } from "@/state/store";
import { ChevronDown, ChevronUp, FileText, MessageSquareShare, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { AddInterested } from "./AddInterested";
import { AddLead } from "./AddLead";
import { LeadTableOfProperty } from "./LeadTable";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

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
    🏡 *New Property Alert!*
        
    *Name:* Aditri Everest
    *Address:* Ameenpur, Near Chandannagar , West  Bengal
    *Status:* _Open for sale_
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
                    <p> <span className='text-sm  text-muted-foreground'>Status : </span> <span className="text-sm font-semibold text-slate-600">{property.p_status}</span></p>
                </div>
            </div>
            <p> <span className='text-sm  text-muted-foreground pl-1'>Expected Amount</span> <span className="italic text-sm font-semibold text-slate-600">{property.exp_price}</span></p>
            <div className="flex justify-between pb-2">
                <div className='py-1.5 pl-1'>
                    {/* <p className='text-xs'><span className='font-semibold text-red-900'>15 Agents</span> shown interest</p> */}
                    {/* <p className='text-xs'><span className='font-semibold text-blue-950'>2 Active</span> Leads</p> */}
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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"outline"}><MessageSquareShare />Share on Whatsapp</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-slate-500">Whatsapp Message Preview</DialogTitle>
                        </DialogHeader>

                        <div className="p-4 border rounded-md bg-slate-100">
                            <p>🏡 New Property Alert!</p>
                            <br />
                            <p>Name : {property.p_details.name} </p>
                            <p>Address : {property.p_details.addr} </p>
                            <p>Status: Open for sale</p>
                        </div>

                        <DialogFooter>
                            <Button onClick={handleShare}><MessageSquareShare />Send</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
                                <DrawerContent aria-describedby="add lead">
                                    <AddLead p_id={p_id} exp_price={100} />
                                </DrawerContent>
                            </Drawer>
                        </TabsContent>
                    </Tabs>
                )
            }
        </div>
    </>)
}