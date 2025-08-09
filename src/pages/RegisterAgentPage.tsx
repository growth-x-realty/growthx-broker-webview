import { request } from "@/apis/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiParams, msgs, nav } from "@/constants"
import type { RequestBeBroker } from "@/types/request"
import type { ErrorResponse, ResponseBeBroker } from "@/types/response"
import { useMutation } from "@tanstack/react-query"
import { LucideGitPullRequest } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const RegisterAgent = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();
    const { mutate: requestBeBroker, isPending } = useMutation({
        mutationFn: request<RequestBeBroker, ResponseBeBroker>,
        onError: (error: ErrorResponse) => {
            toast.error(error.message);
        },
        onSuccess: ({ stage }) => {
            switch (stage) {
                case "APPLIED":
                    toast.success(msgs.be_broker);
                    break;
                case "ALREADY_APPLIED":
                    toast.success(msgs.be_broker_exists);
                    break;
                case "DONE":
                    toast.success(msgs.be_broker_done);
                    break;
            }
            navigate(nav.login);
        }
    })

    const mutateHandler = () => {
        if (!name || !phone) return;
        requestBeBroker({ apiParam: apiParams.REQ_BROKER, body: { name, phone } });
    }
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center bg-linear-to-b from-primary via-slate-50 to-white">
                <div className="bg-white rounded-lg border shadow-sm p-4">
                    <div className="text-center">
                        <p className="text-xl"><span className="font-semibold">Growthx </span> | Broker</p>
                        <p className="text-sm text-slate-600">Register as an Agent</p>
                    </div>

                    <div className="pt-10 pb-6 flex flex-col gap-4">
                        <div>
                            <Label htmlFor="name" className="pl-1 text-gray-800 pb-1 text-xs font-semibold">Enter your name</Label>
                            <Input value={name} onChange={e => setName(e.target.value)} id="name" type="text" placeholder="Name" />
                        </div>
                        <div>
                            <Label htmlFor="ph" className="pl-1 text-gray-800 pb-1 text-xs font-semibold">Enter your whatsapp number</Label>
                            <Input value={phone} onChange={e => setPhone(e.target.value)} id="ph" type="tel" placeholder="Whatsapp Number" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button disabled={isPending} onClick={mutateHandler}>Send Request<LucideGitPullRequest /></Button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default RegisterAgent