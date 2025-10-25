import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStoreLead } from "@/state/store";
import type { Lead } from "@/types/types";
import React from "react";

export const LeadTableOfProperty = ({ p_id }: { p_id: string }) => {
    const leads = useStoreLead(s => s.data.get(p_id));
    if (!leads?.length) {
        return <p className="italic text-slate-700 text-center">No Lead</p>
    }
    return (<>
        <Table>
            <TableHeader>
                <TableRow className="border-primary">
                    <TableHead className=' text-primary-foreground italic'>Name</TableHead>
                    <TableHead className=' text-primary-foreground italic'>Offered Price</TableHead>
                    <TableHead className=' text-primary-foreground italic'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leads.map((lead) => (
                    <React.Fragment key={lead._id}>
                        <LeadTableRow lead={lead} />
                    </React.Fragment>
                ))}
            </TableBody>
        </Table>
    </>)
}

const LeadTableRow = ({ lead }: { lead: Omit<Lead, "b_id"> }) => {

    return (<>
        <TableRow>
            <TableCell className="font-medium">{lead.name}</TableCell>
            <TableCell>{lead.price}</TableCell>
            <TableCell>{lead.status}</TableCell>
        </TableRow>
    </>)
}