import { request } from "@/apis/api"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import type { ErrorResponse, ResponseLoginWithOtp, ResponseOtpWhatsapp } from "@/types/response"
import { useMutation } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { apiParams, enums, msgs, nav } from '@/constants'
import { toast } from "sonner"
import type { RequestLoginWithOtp, RequestOtpWhatsapp } from "@/types/request"
import { InputField } from "@/sections/Input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const investorUrl = "https://growthxrealty.com/redirect?from=broker&&token="

const LoginPage = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [tab, setTab] = useState("broker");
    useEffect(() => {
        const params = Object.fromEntries(
            new URLSearchParams(location.search)
        );
        if (params.event == "logout") {
            window.localStorage.clear();
            return;
        }
        if (window.localStorage.getItem(enums.loginAs) == "investor") {
            if (window.localStorage.getItem(enums.investor_token)) {
                window.location.href = investorUrl + window.localStorage.getItem(enums.investor_token);
            }
        }
        else {
            if (window.localStorage.getItem(enums.token)) {
                navigate(nav.dashboard);
            }
        }
    }, [])
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
                    <Tabs value={tab} onValueChange={setTab}>
                        <TabsList className="w-full mb-3">
                            <TabsTrigger value="broker">Sell Partner</TabsTrigger>
                            <TabsTrigger value="investor">Investor</TabsTrigger>
                        </TabsList>
                        <TabsContent value="broker">
                            <div className="text-center">
                                <p className="text-xl text-yellow-600"><span className="font-semibold">Growthx </span> | Sell Partner</p>
                                <p className="text-sm text-slate-600">Sign in to your account</p>
                            </div>
                            {
                                count == 1 ? <StepPhone {...{ next, prev }} /> : <StepOtp {...{ next, prev }} />
                            }
                        </TabsContent>
                        <TabsContent value="investor">
                            <div className="text-center">
                                <p className="text-xl text-sky-700"><span className="font-semibold">Growthx </span> | Investor</p>
                                <p className="text-sm text-slate-600">Sign in to your account</p>
                            </div>
                            {
                                count == 1 ? <InvestorStepEmail {...{ next, prev }} /> : <InvestorStepOtp {...{ next, prev }} />
                            }
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

const StepPhone = ({ next }: { next: () => void; prev: () => void; }) => {
    // const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<Record<string, string>>({});

    const navigate = useNavigate();
    const { mutate: requestOtpWhatsapp, isPending } = useMutation({
        mutationFn: request<RequestOtpWhatsapp, ResponseOtpWhatsapp>,
        onError: (error: ErrorResponse) => {
            toast.error(error.message);
        },
        onSuccess: (data: ResponseOtpWhatsapp) => {
            window.localStorage.setItem('login', JSON.stringify({ phone: data.phone, hash: data.hash }));
            window.localStorage.setItem(enums.phone, data.phone);
            toast.success(`otp sent on ${email}`);
            next();
        }
    })
    const mutateHandler = () => {
        if (!email) {
            setError({ phone: "Email is required" })
            return;
        }

        requestOtpWhatsapp({ apiParam: apiParams.REQ_WH_OTP, body: { email } });
    }

    return (<>
        <div className="pt-10 pb-3">
            <InputField
                label="Enter your registered email"
                name="phone"
                onChange={val => setEmail(val)}
                value={email}
                type="email"
                placeholder="you@example.com"
                error={error}
            />
        </div>

        <div className="flex flex-col gap-2">
            <Button disabled={isPending} onClick={mutateHandler}>
                {
                    !isPending ?
                        <>Next</>
                        : "Sending OTP ..."
                }
            </Button>
            <div className="text-center text-slate-400">
                ---- or ----
            </div>
            <Button variant={"secondary"} onClick={() => navigate(nav.register)}>Register as partner</Button>
        </div >
    </>)
}

const InvestorStepEmail = ({ next }: { next: () => void; prev: () => void; }) => {
    // const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<Record<string, string>>({});

    const { mutate: requestOtpWhatsapp, isPending } = useMutation({
        mutationFn: async () => request<any, any>({
            apiParam: {
                url: "https://api.aditya-nr.in/send-otp",
                method: "POST"
            },
            body: {
                user: email
            }
        }),
        onError: (error: ErrorResponse) => {
            toast.error(error.message);
        },
        onSuccess: (data: any) => {
            window.localStorage.setItem(enums.investor_login, JSON.stringify({ hash: data.hash }));
            window.localStorage.setItem(enums.investor_email, email);
            toast.success(`otp sent on ${email}`);
            next();
        }
    })
    const mutateHandler = () => {
        if (!email) {
            setError({ phone: "Email is required" })
            return;
        }

        requestOtpWhatsapp();
    }

    return (<>
        <div className="pt-6 pb-3">
            <InputField
                label="Enter your registered email"
                name="phone"
                onChange={val => setEmail(val)}
                value={email}
                type="email"
                placeholder="you@example.com"
                error={error}
            />
        </div>

        <div className="flex flex-col gap-2">
            <Button disabled={isPending} onClick={mutateHandler}>
                {
                    !isPending ?
                        <>Next</>
                        : "Sending OTP ..."
                }
            </Button>
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
            toast.success(`${msgs.login} ${data.name || "User"}!`);
            window.localStorage.setItem(enums.token, data.token);
            window.localStorage.setItem(enums.name, data.name || "User");
            window.localStorage.setItem(enums.loginAs, "broker");
            navigate(nav.dashboard);
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
const InvestorStepOtp = ({ prev }: { next: () => void; prev: () => void; }) => {
    const [otp, setOtp] = useState<any>();
    const apiErrorHandler = (error: any): boolean => {
        if (error.status == "ERROR") {
            toast.error(error.errstr);
            return false;
        }
        return true;
    }
    const { mutate: requestLogin, isPending } = useMutation({
        mutationFn: async () => request<any, any>({
            apiParam: {
                url: "https://api.aditya-nr.in/login",
                method: "POST"
            },
            body: {
                hash: JSON.parse(window.localStorage.getItem(enums.investor_login) || "").hash,
                otp,
                user: window.localStorage.getItem(enums.investor_email) || ""
            }
        }),
        onError: (error: ErrorResponse) => {
            apiErrorHandler(error);
        },
        onSuccess: (data) => {
            if (!apiErrorHandler(data)) return;
            toast.success("Login Success");
            window.localStorage.setItem(enums.investor_token, data.token);
            window.localStorage.setItem(enums.loginAs, "investor");
            window.location.href = investorUrl + data.token;
        }
    })

    const mutateHandler = () => {
        if (!otp) return;
        requestLogin();
    }



    return (<>
        <div className="pt-10 pb-6">
            <Label htmlFor="otp" className="pl-1 text-gray-800 pb-1 text-xs font-semibold">Enter OTP</Label>
            <InputOTP id="otp" maxLength={6} value={otp} onChange={otp => setOtp(otp)} >
                <InputOTPSlot index={0} className="border-2 rounded-sm" />
                <InputOTPSlot index={1} className="border-2 rounded-sm" />
                <InputOTPSlot index={2} className="border-2 rounded-sm" />
                <InputOTPSlot index={3} className="border-2 rounded-sm" />
            </InputOTP>
        </div>

        <div className="flex flex-col gap-3">
            <Button disabled={isPending} onClick={mutateHandler}>Login</Button>
            <Button variant={"secondary"} onClick={prev}><ChevronLeft /> Edit email</Button>
        </div>
    </>)
}

export default LoginPage