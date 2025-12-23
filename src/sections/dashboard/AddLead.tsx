import { request } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { apiParams } from "@/constants";
import { useStoreLead } from "@/state/store";
import type { RequestAddLead } from "@/types/request";
import type { ErrorResponse, ResponseAddLead } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import { CircleCheckBig, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { InputField } from "../Input";

export const AddLead = ({ p_id, exp_price }: { p_id: string, exp_price: number }) => {
    const [step, setStep] = useState<"NEW" | "FINAL">("NEW");

    const nextFinal = () => {
        setStep("FINAL");
    }

    switch (step) {
        case "NEW":
            return <StepNew next={nextFinal} {...{ p_id, exp_price }} />

        case "FINAL":
            return <StepFinal />
    }
}

const StepNew = ({ next, p_id, exp_price }: { next: () => void, p_id: string, exp_price: number }) => {
    const [name, setName] = useState("");
    const [offer, setOffer] = useState("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState({});
    const addLead = useStoreLead((s) => s.addLead);

    const { mutate: requestAddLead, isPending: pendingAddLead } = useMutation({
        mutationFn: request<RequestAddLead, ResponseAddLead>,
        onError: (error: ErrorResponse) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            addLead({ _id: data.l_id, name, price: Number(offer), p_id, status: "WAITING", comments: comment });
            next();
        }
    })

    const mutateHandler = () => {
        if (!name) {
            setError({ name: "Name is required" });
            return;
        }
        if (!offer) {
            setError({ offer: "Enter Offered Price" });
            return;
        }
        const percent = exp_price * (10 / 100);
        let min = exp_price - percent;
        let max = exp_price + percent;
        if (Number(offer) < min) {
            setError({ offer: `Price can not be less than Rs.${Number(min).toFixed(0)}` })
            return;
        }
        if (Number(offer) > max) {
            setError({ offer: `Price can not be more than Rs.${Number(max).toFixed(0)}` })
            return;
        }

        requestAddLead({ apiParam: apiParams.ADD_LEAD, body: { name, p_id, price: Number(offer), comments: comment } });
    }

    return (<>
        <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
                <DrawerTitle><UserPlus className='text-center w-full' /></DrawerTitle>
                <DrawerTitle>Add New Lead</DrawerTitle>
                <DrawerDescription>Enter Lead Details</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 flex flex-col gap-4">
                <InputField
                    label="Enter Client Name"
                    name="name"
                    value={name}
                    onChange={(val) => setName(val)}
                    error={error}
                    placeholder="Name"
                />
                <InputField
                    label="Enter Offered Price"
                    name="offer"
                    value={offer}
                    onChange={(val) => setOffer(val)}
                    error={error}
                    placeholder="Rs."
                />
                <InputField
                    label="Comment"
                    name="comment"
                    value={comment}
                    onChange={(val) => setComment(val)}
                    error={error}
                />
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
const StepFinal = () => {

    return (<>
        <div className="mx-auto w-full max-w-sm">

            <div className="p-4 flex flex-col gap-4 text-center">

                <CircleCheckBig className="m-auto" size={30} />
                <p>Lead added to this property</p>
            </div>
            <DrawerFooter>
                <DrawerClose asChild>
                    <Button >Done</Button>
                </DrawerClose>
            </DrawerFooter>
        </div>
    </>)
}