import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStoreLead, useStorePL } from "@/state/store";
import React from "react";

export const LeadTableOfProperty = ({ p_id }: { p_id: string }) => {
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

export const LeadTableOfBroker = () => {
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