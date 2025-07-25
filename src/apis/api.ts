import type { ErrorResponse } from "@/types/response";
import type { ErrorType } from "@/types/types";

type apiParams = {
    url: string;
    method: "GET" | "POST" | "PATCH";
    auth?: true;
}

function makeHeader(auth?: boolean): HeadersInit {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };
    if (auth) {
        const token = localStorage.getItem("token");
        if (token) headers["authorization"] = token;
    }
    return headers;
}

const makeErrorFromCatch = (error: unknown) => {
    if (error instanceof ApiError) {
        throw error;
    }
    if (error instanceof Error) {
        throw ApiError.defaultError(error.message);
    }
    throw ApiError.defaultError();
};

class ApiError extends Error {
    public status = "error";
    public error: ErrorType;
    public message: string;

    constructor(error: ErrorType, message: string) {
        super(message);
        this.error = error;
        this.message = message;
    }

    static defaultError(msg = "An unknown error occurred") {
        return new ApiError("INTERNAL_ERROR", msg);
    }

}

export async function request<REQ extends object, RES extends object>({
    apiParam,
    body
}: {
    apiParam: apiParams;
    body?: REQ;
}): Promise<RES> {
    try {
        const res = await fetch(`${apiParam.url}`, {
            method: apiParam.method,
            headers: makeHeader(apiParam.auth),
            ...(apiParam.method != "GET" && (body ? { body: JSON.stringify(body) } : {})),
        });

        const data: RES | ErrorResponse = await res.json();

        if ("status" in data && data.status === "error") {
            throw new ApiError(data.error, data.message);
        }

        return data as RES;
    } catch (error) {
        console.log(error)
        return makeErrorFromCatch(error);
    }
}
