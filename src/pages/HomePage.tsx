import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
const styleActiveTab = "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground p-4 text-slate-500";
const styleActiveSubTab = "data-[state=active]:bg-transparent data-[state=active]:text-primary text-slate-500 text-xs";

const HomePage = () => {
    return (
        <>
            {/* Navbar */}
            <nav className='bg-primary/30 flex justify-between p-3'>
                <p ><span className='font-semibold'>Growthx</span> | Broker</p>
                <Drawer direction='top'>
                    <DrawerTrigger asChild>
                        <Menu />
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className='bg-primary/30 flex justify-between p-3'>
                            <p ><span className='font-semibold'>Growthx</span> | Broker</p>
                            <DrawerClose asChild>
                                <X />
                            </DrawerClose>
                        </div>
                        <div className='bg-primary/30 py-7 flex flex-col items-center gap-2 text-lg'>
                            <a>Home</a>
                            <a>About</a>
                            <a>Contact us</a>
                            <a>Login</a>
                        </div>
                    </DrawerContent>
                </Drawer>
            </nav>
            <div className='py-4 px-3'>
                {/* title */}
                <h1 className='text-2xl font-extrabold tracking-tight'>Discover Lucrative Property <br /> Investments</h1>

                {/* search */}
                <div className='flex border shadow-xs rounded-md my-2'>
                    {/* area select */}
                    <Select>
                        <SelectTrigger className="text-sm w-[6rem] border-0 border-r-2 rounded-none shadow-none">
                            <SelectValue placeholder="Zone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>zones</SelectLabel>
                                <SelectItem value="all">All Zone</SelectItem>
                                <SelectItem value="zone_1">zone_1</SelectItem>
                                <SelectItem value="zone_2">zone_2</SelectItem>
                                <SelectItem value="zone_3">zone_3</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* search */}
                    <Input className='border-0 shadow-none text-sm' placeholder='Search Property' />
                    <div className='py-2 pr-2.5'><Search size={18} className='text-primary-foreground' /></div>
                </div>

                {/* tabs */}
                <Tabs defaultValue="properties">
                    <TabsList className='mt-2'>
                        <TabsTrigger value="properties" className={styleActiveTab}><Building2 />Properties</TabsTrigger>
                        <TabsTrigger className={styleActiveTab} value="track"><NotebookTabs />My Track</TabsTrigger>
                    </TabsList>

                    {/* All Properties */}
                    <TabsContent value="properties" className='flex flex-col gap-4'>
                        {/* List of properties */}
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />

                    </TabsContent>

                    {/* My track */}
                    <TabsContent value="track">
                        {/* sub tabs */}
                        <Tabs defaultValue="interested">
                            <TabsList className='h-[4rem] w-full border'>
                                <TabsTrigger className={styleActiveSubTab} value="interested">Interested <br /> Properties</TabsTrigger>
                                <Separator orientation='vertical' />
                                <TabsTrigger className={styleActiveSubTab} value="progress">Sale in <br /> Progress</TabsTrigger>
                                <Separator orientation='vertical' />
                                <TabsTrigger className={styleActiveSubTab} value="sold">Sold Properties</TabsTrigger>
                                <Separator orientation='vertical' />
                                <TabsTrigger className={styleActiveSubTab} value="leads">Active Leads</TabsTrigger>
                            </TabsList>

                            <TabsContent value="interested" className='flex flex-col gap-4'>
                                {/* List of properties */}
                                <PropertyCard />
                                <PropertyCard />
                                <PropertyCard />
                            </TabsContent>

                            <TabsContent value="progress" className='flex flex-col gap-4'>
                                {/* List of properties */}
                                <PropertyCard />
                            </TabsContent>

                            <TabsContent value="sold" className='flex flex-col gap-4'>
                                {/* List of properties */}
                                <PropertyCard />
                            </TabsContent>

                            <TabsContent value="leads">
                                {/* table of leads */}
                                <LeadTable />
                            </TabsContent>

                        </Tabs>
                    </TabsContent>

                </Tabs>
            </div>
        </>
    )
}

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
const PropertyCard = () => {
    const [hidden, setHidden] = useState(true);
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
                <img src="https://placehold.co/600x400" className='border rounded-md w-[9rem] object-cover' />
                <div>
                    <p className='font-semibold'>Aditri Everest</p>
                    <p className='text-muted-foreground italic text-sm'>Ameenpur, Near Chandannagar , West  Bengal</p>
                    <p className='text-green-500 text-sm font-semibold'>OPEN for sale</p>
                </div>
            </div>
            <p> <span className='text-sm  text-muted-foreground pl-1'>Expected Amount</span> 65,00,000</p>
            <div className='py-1.5 pl-1'>
                <p className='text-xs'><span className='font-semibold text-red-900'>15 Agents</span> shown interest</p>
                <p className='text-xs'><span className='font-semibold text-blue-950'>2 Active</span> Leads</p>
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
            {/* My leads table */}
            {
                !hidden && (
                    <Tabs defaultValue='leads' className='pt-3'>
                        <TabsList className='w-full border shadow-sm'>
                            <TabsTrigger className={styles.tabStyle} value='leads'><Users />My Leads</TabsTrigger>
                            <TabsTrigger className={styles.tabStyle} value='details'><FileText />Details</TabsTrigger>
                            <TabsTrigger className={styles.tabStyle} value='graph'><ChartSpline />Price Trend</TabsTrigger>
                        </TabsList>

                        {/* My Leads */}
                        <TabsContent value='leads'>
                            <LeadTable />
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button className='mt-2'><UserPlus />Add New Lead</Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <div className="mx-auto w-full max-w-sm">
                                        <DrawerHeader>
                                            <DrawerTitle><UserPlus className='text-center w-full' /></DrawerTitle>
                                            <DrawerTitle>Add New Lead</DrawerTitle>
                                            <DrawerDescription>Enter Lead Details</DrawerDescription>
                                        </DrawerHeader>
                                        <div className="p-4 flex flex-col gap-4">
                                            <div>
                                                <Label htmlFor="name" className='text-slate-600 text-sm pb-1'>Enter Client Name</Label>
                                                <Input id='name' placeholder='Name' />
                                            </div>
                                            <div>
                                                <Label htmlFor="offer" className='text-slate-600 text-sm pb-1'>Enter Offered Price</Label>
                                                <Input id='offer' placeholder='Rs.' />
                                            </div>
                                        </div>
                                        <DrawerFooter>
                                            <Button>Submit</Button>
                                            <DrawerClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </TabsContent>
                    </Tabs>
                )
            }
        </div>
    </>)
}

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Building2, ChartSpline, ChevronDown, ChevronUp, FileText, Menu, MessageSquareShare, NotebookTabs, PackagePlus, Search, UserPlus, Users, X } from 'lucide-react';

const leads: { l_id: string; name: string; ph: string; offer: number }[] = [
    { l_id: "1", name: "aditya", offer: 20003, ph: "8001677120" },
    { l_id: "2", name: "ankush", offer: 24003, ph: "6204550668" },
    { l_id: "3", name: "riya", offer: 70453, ph: "9875363176" },
    { l_id: "4", name: "mutuk", offer: 20003, ph: "6204550668" }

];
const LeadTable = () => {
    return (<>
        <Table>
            <TableHeader>
                <TableRow >
                    <TableHead className="bg-primary text-slate-100 italic">Name</TableHead>
                    <TableHead className='bg-primary text-slate-100 italic'>Phone No</TableHead>
                    <TableHead className='bg-primary text-slate-100 italic'>Offered Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leads.map(({ l_id, name, offer, ph }) => (
                    <TableRow key={l_id}>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell>{ph}</TableCell>
                        <TableCell>{offer}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>)
}
export default HomePage