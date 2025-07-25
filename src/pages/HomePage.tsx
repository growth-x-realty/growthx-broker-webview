import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Building2, ChevronDown, ChevronUp, CircleCheckBig, ClockFading, FileText, Menu, MessageSquareShare, NotebookTabs, Search, UserPlus, Users, X } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query'
import type { RequestAddInteresed, RequestAddLead, RequestAddLeadToProperty, RequestGetMyProperties } from '@/types/request'
import type { ErrorResponse, ResponseAddInteresed, ResponseAddLead, ResponseAddLeadToProperty, ResponseGetMyProperties } from '@/types/response'
import { request } from '@/apis/api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { apis } from '@/constants'
import { useStoreInterested, useStoreProperty, useStoreLead, useStorePL } from '@/state/store'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
const styleActiveTab = "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground p-4 text-slate-500";
const styleActiveSubTab = "data-[state=active]:bg-transparent data-[state=active]:text-primary text-slate-500 text-xs";

const HomePage = () => {
    const navigate = useNavigate();
    const setProperties = useStoreProperty((s) => s.setProperties);
    const setIntersted = useStoreInterested((s) => s.setIntersted);
    const setLeads = useStoreLead((s) => s.setLeads);
    const setPl = useStorePL((s) => s.setPl);
    const { data: res, error, isError, isPending } = useQuery({
        queryKey: ["get-data"],
        queryFn: async () => await request<RequestGetMyProperties, ResponseGetMyProperties>({ apiParam: apis.GET_DATA, body: {} })
    })

    if (isPending) {
        return <>Loading...</>
    }
    if (isError) {
        let tmp = error as unknown;
        let err = tmp as ErrorResponse;
        toast.error(err.message);
        if (err.error == "UNAUTHORIZED") {
            navigate("/login");
        }
        return <>{err.message}</>
    }

    if (res) {
        console.log(res);
        setProperties(res.properties);
        setIntersted(res.intersted);
        setLeads(res.leads);
        setPl(res.propertyLead);
    }
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
                            <a>Logout</a>
                        </div>
                    </DrawerContent>
                </Drawer>
            </nav>
            <div className='py-4 px-3'>
                {/* title */}
                <h1 className='text-2xl font-extrabold tracking-tight'>{window.localStorage.getItem('name')}</h1>
                <h1 className='text-slate-700 text-sm'>Discover Lucrative Property</h1>

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
                        {
                            res.properties.map(({ _id }) => (
                                <React.Fragment key={_id}>
                                    <PropertyCard p_id={_id} />
                                </React.Fragment>
                            ))
                        }

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

                            {/* List of Interested properties */}
                            <TabsContent value="interested" className='flex flex-col gap-4'>
                                <InterestedProperties />
                            </TabsContent>

                            {/* List of IN PROGRESS properties */}
                            <TabsContent value="progress" className='flex flex-col gap-4'>
                                {/* <PropertyCard /> */}
                            </TabsContent>

                            {/* List of SOLD properties */}
                            <TabsContent value="sold" className='flex flex-col gap-4'>
                                {/* <PropertyCard /> */}
                            </TabsContent>

                            {/* table of leads */}
                            <TabsContent value="leads">
                                <LeadTableOfBroker />
                            </TabsContent>

                        </Tabs>
                    </TabsContent>

                </Tabs>
            </div>
        </>
    )
}


const InterestedProperties = () => {
    const set = useStoreInterested((s) => s.set);
    const list: string[] = [];
    set.forEach((p_id) => {
        list.push(p_id);
    })

    return (<>
        {
            list.map((p_id) => (
                <React.Fragment key={p_id}>
                    <PropertyCard p_id={p_id} />
                </React.Fragment>
            ))
        }
    </>)
}
const PropertyCard = ({ p_id }: { p_id: string }) => {
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

const AddInterested = ({ p_id }: { p_id: string }) => {
    const addInterested = useStoreInterested((s) => s.addInterested);
    const isInterested = useStoreInterested((s) => s.set.has(p_id));

    const { mutate: requestAddInterested, isPending } = useMutation({
        mutationFn: request<RequestAddInteresed, ResponseAddInteresed>,
        onError: (error: ErrorResponse) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            addInterested(p_id);
        }
    })

    const mutateHandler = () => {
        requestAddInterested({ apiParam: apis.ADD_INTERESTED, body: { p_id } });
    }

    return (<>
        {
            !isInterested &&
            <Button disabled={isPending} onClick={mutateHandler} variant={"outline"} className="text-slate-900 rounded-full text-xs">show interest</Button>
        }
    </>)
}
const AddLead = ({ p_id }: { p_id: string }) => {
    const [step, setStep] = useState<"CHOOSE" | "EXISTING" | "NEW" | "FINAL">("NEW");
    const [l_id, setL_id] = useState("");

    const nextFinal = (l_id: string) => {
        setL_id(l_id);
        setStep("FINAL");
    }

    switch (step) {
        case "NEW":
            return <StepNew next={nextFinal} />

        case "FINAL":
            return <StepFinal p_id={p_id} l_id={l_id} />
    }
}

const StepNew = ({ next }: { next: (l_id: string) => void }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [offer, setOffer] = useState("");
    const addLead = useStoreLead((s) => s.addLead);

    const { mutate: requestAddLead, isPending: pendingAddLead } = useMutation({
        mutationFn: request<RequestAddLead, ResponseAddLead>,
        onError: (error: ErrorResponse) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            addLead({ _id: data.l_id, l_phone: phone, l_details: { name } });
            next(data.l_id);
        }
    })

    const mutateHandler = () => {
        requestAddLead({ apiParam: apis.ADD_LEAD, body: { phone, details: { name } } });
    }

    return (<>
        <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
                <DrawerTitle><UserPlus className='text-center w-full' /></DrawerTitle>
                <DrawerTitle>Add New Lead</DrawerTitle>
                <DrawerDescription>Enter Lead Details</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 flex flex-col gap-4">
                <div>
                    <Label htmlFor="name" className='text-slate-600 text-sm pb-1'>Enter Client Name</Label>
                    <Input value={name} onChange={e => setName(e.target.value)} id='name' placeholder='Name' />
                </div>
                <div>
                    <Label htmlFor="phone" className='text-slate-600 text-sm pb-1'>Enter Phone no.</Label>
                    <Input value={phone} onChange={e => setPhone(e.target.value)} id='phone' placeholder="Whatsapp Number" />
                </div>
                <div>
                    <Label htmlFor="offer" className='text-slate-600 text-sm pb-1'>Enter Offered Price</Label>
                    <Input value={offer} onChange={e => setOffer(e.target.value)} id='offer' placeholder='Rs.' type="number" />
                </div>
            </div>
            <DrawerFooter>
                <Button onClick={mutateHandler} disabled={pendingAddLead}>
                    {pendingAddLead ? "Creating Lead ..." : "Submit"}
                </Button>
                <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
        </div>
    </>)

}
const StepFinal = ({ l_id, p_id }: { p_id: string, l_id: string }) => {
    const addPl = useStorePL((s) => s.addPL);

    const { mutate: requestAddLeadToProperty, isPending } = useMutation({
        mutationFn: request<RequestAddLeadToProperty, ResponseAddLeadToProperty>,
        onError: (error: ErrorResponse) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            addPl(p_id, l_id);
        }
    })

    const mutateHandler = () => {
        requestAddLeadToProperty({ apiParam: apis.ADD_LEAD_TO_PROPERTY, body: { l_id, p_id } });
    }

    useEffect(() => {
        mutateHandler();
    }, [])

    return (<>
        <div className="mx-auto w-full max-w-sm">

            <div className="p-4 flex flex-col gap-4 text-center">
                {
                    isPending ? (<>
                        <ClockFading className="m-auto animate-pulse text-slate-900" size={30} />
                        <p className="text-slate-700">Adding Lead to this property...</p>
                    </>) : (<>
                        <CircleCheckBig className="m-auto" size={30} />
                        <p>Lead added to this property</p>
                    </>)
                }
            </div>
            <DrawerFooter>
                <DrawerClose asChild>
                    {!isPending && <Button >Done</Button>}
                </DrawerClose>
            </DrawerFooter>
        </div>
    </>)
}

const LeadTableOfBroker = () => {
    const leads = useStoreLead((s) => s.keys);
    if (!leads?.length) {
        return <p className="italic text-slate-700 text-center">No Lead</p>
    }
    return (<>
        <Table>
            <TableHeader>
                <TableRow className="border-primary">
                    <TableHead className=' text-primary-foreground italic'>Name</TableHead>
                    <TableHead className=' text-primary-foreground italic'>Phone No</TableHead>
                    <TableHead className=' text-primary-foreground italic'>Offered Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leads.map((l_id) => (
                    <React.Fragment key={l_id}>
                        <LeadTableRow l_id={l_id} />
                    </React.Fragment>
                ))}
            </TableBody>
        </Table>
    </>)
}

const LeadTableOfProperty = ({ p_id }: { p_id: string }) => {
    const leads = useStorePL((s) => s.p_l.get(p_id));
    if (!leads?.length) {
        return <p className="italic text-slate-700 text-center">No Lead</p>
    }
    return (<>
        <Table>
            <TableHeader>
                <TableRow className="border-primary">
                    <TableHead className=' text-primary-foreground italic'>Name</TableHead>
                    <TableHead className=' text-primary-foreground italic'>Phone No</TableHead>
                    <TableHead className=' text-primary-foreground italic'>Offered Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leads.map((l_id) => (
                    <React.Fragment key={l_id}>
                        <LeadTableRow l_id={l_id} />
                    </React.Fragment>
                ))}
            </TableBody>
        </Table>
    </>)
}

const LeadTableRow = ({ l_id }: { l_id: string }) => {
    const lead = useStoreLead((s) => s.data.get(l_id));
    if (!lead) {
        console.log({ component: "LeadTableRow", l_id })
        return <></>
    }
    return (<>
        <TableRow>
            <TableCell className="font-medium">{lead.l_details?.name || "N/A"}</TableCell>
            <TableCell>{lead.l_phone || "N/A"}</TableCell>
            <TableCell>{"00000"}</TableCell>
        </TableRow>
    </>)
}
export default HomePage