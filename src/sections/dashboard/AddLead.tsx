import { request } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiParams } from "@/constants";
import { useStoreLead, useStorePL } from "@/state/store";
import type { RequestAddLead, RequestAddLeadToProperty } from "@/types/request";
import type { ErrorResponse, ResponseAddLead, ResponseAddLeadToProperty } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import { CircleCheckBig, ClockFading, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const AddLead = ({ p_id }: { p_id: string }) => {
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
        requestAddLead({ apiParam: apiParams.ADD_LEAD, body: { phone, details: { name } } });
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
        requestAddLeadToProperty({ apiParam: apiParams.ADD_LEAD_TO_PROPERTY, body: { l_id, p_id } });
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