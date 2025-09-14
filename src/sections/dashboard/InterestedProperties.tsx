import { useStoreInterested } from "@/state/store";
import React from "react";
import PropertyCard from "./PropertyCard";

export const InterestedProperties = () => {
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