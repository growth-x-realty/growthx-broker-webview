import { request } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { apiParams } from "@/constants";
import { useStoreInterested } from "@/state/store";
import type { RequestAddInteresed } from "@/types/request";
import type { ErrorResponse, ResponseAddInteresed } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const AddInterested = ({ p_id }: { p_id: string }) => {
    const addInterested = useStoreInterested((s) => s.addInterested);
    const isInterested = useStoreInterested((s) => s.set.has(p_id));

    const { mutate: requestAddInterested, isPending } = useMutation({
        mutationFn: request<RequestAddInteresed, ResponseAddInteresed>,
        onError: (error: ErrorResponse) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            addInterested(p_id);
        }
    })

    const mutateHandler = () => {
        requestAddInterested({ apiParam: apiParams.ADD_INTERESTED, body: { p_id } });
    }

    return (<>
        {
            !isInterested &&
            <Button disabled={isPending} onClick={mutateHandler} variant={"outline"} className="text-slate-900 rounded-full text-xs">show interest</Button>
        }
    </>)
}