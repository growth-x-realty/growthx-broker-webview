export type ApiParams = {
    url: string;
    method: "GET" | "POST" | "PATCH";
    auth?: true;
}