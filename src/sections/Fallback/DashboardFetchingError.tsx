import type { ErrorResponse } from "@/types/response"

const DashboardFetchingError = ({ error }: { error: ErrorResponse }) => {
    return (
        <div>{error?.message}</div>
    )
}

export default DashboardFetchingError