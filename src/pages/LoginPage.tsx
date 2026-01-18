import { request } from "@/apis/api"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import type { ErrorResponse, ResponseLoginWithOtp, ResponseOtpWhatsapp } from "@/types/response"
import { useMutation } from "@tanstack/react-query"
import { ChevronLeft, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { apiParams, enums, msgs, nav } from '@/constants'
import { toast } from "sonner"
import type { RequestLoginWithOtp, RequestOtpWhatsapp } from "@/types/request"
import { InputField } from "@/sections/Input"

const investorUrl = "https://growthxrealty.com/redirect?from=broker&&token="

const LoginPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<"broker" | "investor">("broker");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const params = Object.fromEntries(new URLSearchParams(location.search));
        if (params.event == "logout") {
            window.localStorage.clear();
            return;
        }
        if (window.localStorage.getItem(enums.loginAs) == "investor") {
            if (window.localStorage.getItem(enums.investor_token)) {
                window.location.href = investorUrl + window.localStorage.getItem(enums.investor_token);
            }
        } else {
            if (window.localStorage.getItem(enums.token)) {
                navigate(nav.dashboard);
            }
        }
    }, [])

    const next = () => setStep(step + 1);
    const prev = () => setStep(step - 1);

    return (
        <div className="min-h-screen bg-white flex flex-col pt-12 px-6">
            <div className="w-full max-w-sm mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Login</h1>
                    <p className="text-slate-500 text-lg font-medium">Welcome back to GrowthX</p>
                </div>

                {step === 1 ? (
                    <StepInitial
                        email={email}
                        setEmail={setEmail}
                        role={role}
                        setRole={setRole}
                        next={next}
                    />
                ) : (
                    role === "broker" ?
                        <StepOtp prev={prev} /> :
                        <InvestorStepOtp prev={prev} />
                )}
            </div>
        </div>
    )
}

const StepInitial = ({ email, setEmail, role, setRole, next }: {
    email: string; setEmail: (v: string) => void; role: string; setRole: (r: any) => void; next: () => void;
}) => {
    const navigate = useNavigate();
    const [error, setError] = useState<Record<string, string>>({});

    const { mutate: requestOtpBroker, isPending: isPendingBroker } = useMutation({
        mutationFn: request<RequestOtpWhatsapp, ResponseOtpWhatsapp>,
        onError: (error: ErrorResponse) => toast.error(error.message),
        onSuccess: (data: ResponseOtpWhatsapp) => {
            window.localStorage.setItem('login', JSON.stringify({ phone: data.phone, hash: data.hash }));
            window.localStorage.setItem(enums.phone, data.phone);
            toast.success(`OTP sent to ${email}`);
            next();
        }
    })

    const { mutate: requestOtpInvestor, isPending: isPendingInvestor } = useMutation({
        mutationFn: async () => request<any, any>({
            apiParam: { url: "https://api.aditya-nr.in/send-otp", method: "POST" },
            body: { user: email }
        }),
        onError: (error: ErrorResponse) => toast.error(error.message),
        onSuccess: (data: any) => {
            window.localStorage.setItem(enums.investor_login, JSON.stringify({ hash: data.hash }));
            window.localStorage.setItem(enums.investor_email, email);
            toast.success(`OTP sent to ${email}`);
            next();
        }
    })

    const handleNext = () => {
        if (!email) {
            setError({ email: "Email is required" });
            return;
        }
        if (role === "broker") {
            requestOtpBroker({ apiParam: apiParams.REQ_WH_OTP, body: { email } });
        } else {
            requestOtpInvestor();
        }
    }

    const isPending = isPendingBroker || isPendingInvestor;

    return (
        <div className="space-y-8">
            <InputField
                label="Registered Email"
                name="email"
                onChange={val => setEmail(val)}
                value={email}
                type="email"
                placeholder="you@example.com"
                error={error}
            />

            <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Select Role</Label>
                <div className="grid grid-cols-1 gap-3">
                    <button
                        onClick={() => setRole("broker")}
                        className={`flex items-center justify-between px-5 h-14 rounded-2xl border-2 transition-all duration-300 ${role === "broker"
                            ? "border-primary bg-primary/5 text-slate-900"
                            : "border-slate-100 text-slate-500 hover:border-slate-200"
                            }`}
                    >
                        <span className="font-bold text-base">Sell Partner</span>
                        {role === "broker" && <CheckCircle2 className="w-6 h-6 text-primary" />}
                    </button>
                    <button
                        onClick={() => setRole("investor")}
                        className={`flex items-center justify-between px-5 h-14 rounded-2xl border-2 transition-all duration-300 ${role === "investor"
                            ? "border-primary bg-primary/5 text-slate-900"
                            : "border-slate-100 text-slate-500 hover:border-slate-200"
                            }`}
                    >
                        <span className="font-bold text-base">Investor</span>
                        {role === "investor" && <CheckCircle2 className="w-6 h-6 text-primary" />}
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
                <Button
                    className="h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20"
                    disabled={isPending}
                    onClick={handleNext}
                >
                    {isPending ? "Sending OTP..." : "Next"}
                </Button>

                <div className="flex items-center gap-4 py-2">
                    <div className="h-[1px] flex-1 bg-slate-100" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">or</span>
                    <div className="h-[1px] flex-1 bg-slate-100" />
                </div>

                <Button
                    variant="ghost"
                    className="h-14 text-base font-bold text-slate-400 hover:text-primary transition-colors"
                    onClick={() => navigate(nav.guest)}
                >
                    Login as Guest
                </Button>
            </div>
        </div>
    )
}

const StepOtp = ({ prev }: { prev: () => void }) => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState<string>("");
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
        if (otp.length !== 6) return;
        const { hash, phone } = JSON.parse(window.localStorage.getItem('login') || "")
        requestLogin({ apiParam: apiParams.LOGIN, body: { hash, phone, otp: otp as any } });
    }

    return (
        <div className="space-y-8 pt-4">
            <div>
                <Label htmlFor="otp" className="text-sm font-semibold text-slate-500 block mb-6 uppercase tracking-wider">Enter 6-digit OTP</Label>
                <div className="flex justify-center">
                    <InputOTP id="otp" maxLength={6} value={otp} onChange={v => setOtp(v)} >
                        <div className="flex gap-2">
                            {[0, 1, 2, 3, 4, 5].map(i => (
                                <InputOTPSlot key={i} index={i} className="w-12 h-14 text-xl border-2 border-slate-100 focus:border-primary rounded-xl" />
                            ))}
                        </div>
                    </InputOTP>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Button
                    className="h-14 text-lg font-bold rounded-2xl"
                    disabled={isPending || otp.length !== 6}
                    onClick={mutateHandler}
                >
                    {isPending ? "Logging in..." : "Login"}
                </Button>
                <Button variant="ghost" className="text-slate-400 font-bold" onClick={prev}>
                    <ChevronLeft className="w-5 h-5 mr-1" /> Edit Details
                </Button>
            </div>
        </div>
    )
}

const InvestorStepOtp = ({ prev }: { prev: () => void }) => {
    const [otp, setOtp] = useState<string>("");
    const apiErrorHandler = (error: any): boolean => {
        if (error.status == "ERROR") {
            toast.error(error.errstr);
            return false;
        }
        return true;
    }
    const { mutate: requestLogin, isPending } = useMutation({
        mutationFn: async () => request<any, any>({
            apiParam: { url: "https://api.aditya-nr.in/login", method: "POST" },
            body: {
                hash: JSON.parse(window.localStorage.getItem(enums.investor_login) || "").hash,
                otp,
                user: window.localStorage.getItem(enums.investor_email) || ""
            }
        }),
        onError: (error: ErrorResponse) => apiErrorHandler(error),
        onSuccess: (data) => {
            if (!apiErrorHandler(data)) return;
            toast.success("Login Success");
            window.localStorage.setItem(enums.investor_token, data.token);
            window.localStorage.setItem(enums.loginAs, "investor");
            window.location.href = investorUrl + data.token;
        }
    })

    const mutateHandler = () => {
        if (otp.length !== 4) return;
        requestLogin();
    }

    return (
        <div className="space-y-8 pt-4">
            <div>
                <Label htmlFor="otp" className="text-sm font-semibold text-slate-500 block mb-6 uppercase tracking-wider">Enter 4-digit OTP</Label>
                <div className="flex justify-center">
                    <InputOTP id="otp" maxLength={4} value={otp} onChange={v => setOtp(v)} >
                        <div className="flex gap-4">
                            {[0, 1, 2, 3].map(i => (
                                <InputOTPSlot key={i} index={i} className="w-14 h-16 text-2xl border-2 border-slate-100 focus:border-primary rounded-xl" />
                            ))}
                        </div>
                    </InputOTP>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Button
                    className="h-14 text-lg font-bold rounded-2xl"
                    disabled={isPending || otp.length !== 4}
                    onClick={mutateHandler}
                >
                    {isPending ? "Logging in..." : "Login"}
                </Button>
                <Button variant="ghost" className="text-slate-400 font-bold" onClick={prev}>
                    <ChevronLeft className="w-5 h-5 mr-1" /> Edit Details
                </Button>
            </div>
        </div>
    )
}

export default LoginPage