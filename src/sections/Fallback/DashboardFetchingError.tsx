import { Button } from "@/components/ui/button"
import type { ErrorResponse } from "@/types/response"
import { RotateCcw, ServerCrash } from "lucide-react"
import Navbar from "../Navbar"

const DashboardFetchingError = ({ error }: { error: ErrorResponse }) => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-4">
                <ServerCrash className="w-12 h-12 text-primary" />
                <p className="text-lg  text-primary">Something went wrong</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                    {error?.message || "We couldn’t load your data. Please try again shortly."}
                </p>
                <Button variant="outline" onClick={() => location.reload()} >
                    <RotateCcw /> Retry
                </Button>
            </div >
        </>
    )
}

export default DashboardFetchingError