import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { ChevronLeft, MessageCircleCode } from "lucide-react"
import { useState } from "react"

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
                <div className="bg-white rounded-md border shadow-sm p-4">
                    <div className="text-center">
                        <p className="text-xl"><span className="font-semibold">Growthx </span> | Broker</p>
                        <p className="text-sm text-slate-600">Sign in to your account</p>
                    </div>
                    {
                        count == 1 ? <StepLogin {...{ next, prev }} /> : <StepOtp {...{ next, prev }} />
                    }
                </div>
            </div>
        </>
    )
}

const StepLogin = ({ next }: { next: () => void; prev: () => void; }) => {
    return (<>
        <div className="pt-10 pb-6">
            <Label htmlFor="ph" className="pl-1 text-gray-800 pb-1 text-xs font-semibold">Enter your registered phone</Label>
            <Input id="ph" type="tel" placeholder="Whatsapp Number" />
        </div>

        <div className="flex flex-col gap-3">
            <Button onClick={next}><MessageCircleCode />Get OTP on whatsapp</Button>
            <Button variant={"secondary"}>Register as an Agent</Button>
        </div>
    </>)
}
const StepOtp = ({ prev }: { next: () => void; prev: () => void; }) => {
    return (<>
        <div className="pt-10 pb-6">
            <Label htmlFor="otp" className="pl-1 text-gray-800 pb-1 text-xs font-semibold">Enter OTP</Label>
            <InputOTP id="otp" maxLength={6}>
                <InputOTPSlot index={0} className="border-2 rounded-sm" />
                <InputOTPSlot index={1} className="border-2 rounded-sm" />
                <InputOTPSlot index={2} className="border-2 rounded-sm" />
                <InputOTPSlot index={3} className="border-2 rounded-sm" />
                <InputOTPSlot index={4} className="border-2 rounded-sm" />
                <InputOTPSlot index={5} className="border-2 rounded-sm" />
            </InputOTP>
        </div>

        <div className="flex flex-col gap-3">
            <Button>Login</Button>
            <Button variant={"secondary"} onClick={prev}><ChevronLeft /> Edit Phone Number</Button>
        </div>
    </>)
}

export default LoginPage