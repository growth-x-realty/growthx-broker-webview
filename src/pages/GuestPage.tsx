import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import type { ResponseGetAllProperties } from '@/types/response'
import { request } from '@/apis/api'
import { Button } from '@/components/ui/button'
import { apiParams, nav } from '@/constants'
import { useStoreProperty } from '@/state/store'

import PropertyFilter from "@/sections/dashboard/PropertyFilter";
import DashboardFetching from '@/sections/Fallback/DashboardFetching';
import DashboardFetchingError from '@/sections/Fallback/DashboardFetchingError';
import PropertyCard from '@/sections/dashboard/PropertyCard';
import { useNavigate } from 'react-router';

const GuestPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const setProperties = useStoreProperty((s) => s.setProperties);

    const { data: res, error, isError, isPending } = useQuery({
        queryKey: ["get-all-properties"],
        queryFn: async () => await request<any, ResponseGetAllProperties>({ apiParam: apiParams.GET_ALL_PROPERTIES, body: {} })
    })

    if (isPending) {
        return <DashboardFetching />
    }

    if (isError) {
        return <DashboardFetchingError error={error as any} />
    }

    if (res) {
        setProperties(res.properties);
    }

    return (
        <>
            {/* Custom Simple Navbar for Guest */}
            <nav className='bg-primary/5 flex justify-between items-center p-4 border-b border-slate-100'>
                <p className="text-lg text-slate-900"><span className='font-bold'>Growthx</span> | Broker</p>
                <Button
                    onClick={() => navigate(nav.login)}
                    variant="default"
                    className="h-10 px-6 font-bold rounded-xl shadow-sm"
                >
                    Login
                </Button>
            </nav>

            <div className='py-6 px-4 max-w-sm mx-auto'>
                <h1 className='text-2xl font-extrabold tracking-tight'>Guest View</h1>
                <h1 className='text-slate-700 text-sm'>Discover Lucrative Investor’s Property</h1>

                <PropertyFilter search={search} setSearch={setSearch} />

                <div className='flex flex-col gap-4 mt-6'>
                    {
                        res?.properties.filter((prop) => {
                            if (search === "") return true;
                            const searchContent = `${prop.name} ${prop.addr} ${prop.p_details.propertyType} ${prop.p_details.builderName}`;
                            return searchContent.toLowerCase().includes(search.toLowerCase());
                        }).map(({ _id }) => (
                            <React.Fragment key={_id}>
                                <PropertyCard p_id={_id} isGuest={true} />
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default GuestPage