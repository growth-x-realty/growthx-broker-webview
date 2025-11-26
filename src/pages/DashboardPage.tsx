import React, { useState } from 'react';
import { Building2, NotebookTabs } from 'lucide-react';
import { useQuery } from '@tanstack/react-query'
import type { RequestGetMyProperties } from '@/types/request'
import type { ErrorResponse, ResponseGetMyProperties } from '@/types/response'
import { request } from '@/apis/api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { apiParams, nav } from '@/constants'
import { useStoreInterested, useStoreProperty, useStoreLead } from '@/state/store'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

import { InterestedProperties } from "@/sections/dashboard/InterestedProperties";
import PropertyFilter from "@/sections/dashboard/PropertyFilter";
import Navbar from "@/sections/Navbar";
import DashboardFetching from '@/sections/Fallback/DashboardFetching';
import DashboardFetchingError from '@/sections/Fallback/DashboardFetchingError';
import PropertyCard from '@/sections/dashboard/PropertyCard';

const styleActiveTab = "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground p-4 text-slate-500";
const styleActiveSubTab = "data-[state=active]:bg-transparent data-[state=active]:text-primary text-slate-500 text-xs";

const DashboardPage = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const setProperties = useStoreProperty((s) => s.setProperties);
    const setIntersted = useStoreInterested((s) => s.setIntersted);
    const setLeads = useStoreLead((s) => s.setLeads);
    const { data: res, error, isError, isPending } = useQuery({
        queryKey: ["get-data"],
        queryFn: async () => await request<RequestGetMyProperties, ResponseGetMyProperties>({ apiParam: apiParams.GET_DATA, body: {} })
    })

    if (isPending) {
        return <DashboardFetching />
    }

    if (isError) {
        let tmp = error as unknown;
        let err = tmp as ErrorResponse;
        toast.error(err.message);
        if (err.error == "UNAUTHORIZED") {
            window.localStorage.clear();
            navigate(nav.root);
        }
        return <DashboardFetchingError error={err} />
    }

    if (res) {
        console.log(res);
        setProperties(res.properties);
        setIntersted(res.intersted);
        setLeads(res.leads);
    }

    return (
        <>
            {/* Navbar */}
            <Navbar />
            <div className='py-4 px-3'>
                {/* title */}
                <h1 className='text-2xl font-extrabold tracking-tight'>{window.localStorage.getItem('name')}</h1>
                <h1 className='text-slate-700 text-sm'>Discover Lucrative Investor’s Property</h1>

                {/* search */}
                <PropertyFilter search={search} setSearch={setSearch} />

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
                            res.properties.filter((prop) => {
                                if (search == "") return true;

                                if ((prop.name + ' ' + prop.addr + ' ').toLowerCase().includes(search.toLowerCase())) {
                                    return true;
                                }
                                return false;
                            }).map(({ _id }) => (
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

                        </Tabs>
                    </TabsContent>

                </Tabs>
            </div>
        </>
    )
}

export default DashboardPage