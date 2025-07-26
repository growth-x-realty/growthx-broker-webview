import { request } from "@/apis/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import type { ErrorResponse, ResponseLoginWithOtp, ResponseOtpWhatsapp } from "@/types/response"
import { useMutation } from "@tanstack/react-query"
import { ChevronLeft, MessageCircleCode } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { apiParams, msgs } from '@/constants'
import { toast } from "sonner"
import type { RequestLoginWithOtp, RequestOtpWhatsapp } from "@/types/request"

const LoginPage = () => {
    const [count, setCount] = useState(1);
    const next = () => {
        if (count == 2) return;
        setCount(count + 1);
    }
    const prev = () => {
        if (count == 1) return;
        setCount(count - 1);
    }
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center bg-linear-to-b from-primary via-slate-50 to-white">
                <div className="bg-white rounded-lg border shadow-sm p-4">
                    <div className="text-center">
                        <p className="text-xl"><span className="font-semibold">Growthx </span> | Broker</p>
                        <p className="text-sm text-slate-600">Sign in to your account</p>
                    </div>
                    {
                        count == 1 ? <StepPhone {...{ next, prev }} /> : <StepOtp {...{ next, prev }} />
                    }
                </div>
            </div>
        </>
    )
}

const StepPhone = ({ next }: { next: () => void; prev: () => void; }) => {
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    const { mutate: requestOtpWhatsapp, isPending } = useMutation({
        mutationFn: request<RequestOtpWhatsapp, ResponseOtpWhatsapp>,
        onError: (error: ErrorResponse) => {
            toast.error(error.message);
        },
        onSuccess: (data: ResponseOtpWhatsapp) => {
            window.localStorage.setItem('login', JSON.stringify({ phone, hash: data.hash }));
            toast.success(`${msgs.req_otp_success} ${phone}`);
            next();
        }
    })
    const mutateHandler = () => {
        requestOtpWhatsapp({ apiParam: apiParams.REQ_WH_OTP, body: { phone } });
    }

    return (<>
        <div className="pt-10 pb-6">
            <Label htmlFor="ph" className="pl-1 text-gray-800 pb-1 text-xs font-semibold">Enter your registered phone</Label>
            <Input value={phone} onChange={e => setPhone(e.target.value)} id="ph" type="tel" placeholder="Whatsapp Number" />
        </div>

        <div className="flex flex-col gap-3">
            <Button disabled={isPending} onClick={mutateHandler}>
                {
                    !isPending ?
                        <><MessageCircleCode />Get OTP on whatsapp</>
                        : "Sending OTP ..."
                }
            </Button>
            <Button variant={"secondary"} onClick={() => navigate("/register")}>Register as an Agent</Button>
        </div >
    </>)
}

const StepOtp = ({ prev }: { next: () => void; prev: () => void; }) => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState<any>();
    const { mutate: requestLogin, isPending } = useMutation({
        mutationFn: request<RequestLoginWithOtp, ResponseLoginWithOtp>,
        onError: (error: ErrorResponse) => {
            setOtp("");
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(`${msgs.login} ${data.b_details.name || "User"}!`);
            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('name', data.b_details.name || "User");
            navigate("/home");
        }
    })

    const mutateHandler = () => {
        if (!otp) return;
        const { hash, phone } = JSON.parse(window.localStorage.getItem('login') || "")
        requestLogin({ apiParam: apiParams.LOGIN, body: { hash, phone, otp } });
    }



    return (<>
        <div className="pt-10 pb-6">
            <Label htmlFor="otp" className="pl-1 text-gray-800 pb-1 text-xs font-semibold">Enter OTP</Label>
            <InputOTP id="otp" maxLength={6} value={otp} onChange={otp => setOtp(otp)} >
                <InputOTPSlot index={0} className="border-2 rounded-sm" />
                <InputOTPSlot index={1} className="border-2 rounded-sm" />
                <InputOTPSlot index={2} className="border-2 rounded-sm" />
                <InputOTPSlot index={3} className="border-2 rounded-sm" />
                <InputOTPSlot index={4} className="border-2 rounded-sm" />
                <InputOTPSlot index={5} className="border-2 rounded-sm" />
            </InputOTP>
        </div>

        <div className="flex flex-col gap-3">
            <Button disabled={isPending} onClick={mutateHandler}>Login</Button>
            <Button variant={"secondary"} onClick={prev}><ChevronLeft /> Edit Phone Number</Button>
        </div>
    </>)
}

export default LoginPage