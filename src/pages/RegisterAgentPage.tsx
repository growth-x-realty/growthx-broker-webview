import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideGitPullRequest } from "lucide-react"

const RegisterAgent = () => {
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center bg-linear-to-b from-primary via-slate-50 to-white">
                <div className="bg-white rounded-md border shadow-sm p-4">
                    <div className="text-center">
                        <p className="text-xl"><span className="font-semibold">Growthx </span> | Broker</p>
                        <p className="text-sm text-slate-600">Register as an Agent</p>
                    </div>

                    <div className="pt-10 pb-6 flex flex-col gap-4">
                        <div>
                            <Label htmlFor="name" className="pl-1 text-gray-800 pb-1 text-xs font-semibold">Enter your name</Label>
                            <Input id="name" type="text" placeholder="Name" />
                        </div>
                        <div>
                            <Label htmlFor="ph" className="pl-1 text-gray-800 pb-1 text-xs font-semibold">Enter your whatsapp number</Label>
                            <Input id="ph" type="tel" placeholder="Whatsapp Number" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button >Send Request<LucideGitPullRequest /></Button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default RegisterAgent