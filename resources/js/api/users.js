import http from "@/api/http";

const url = "/users";

export async function getUsersRequest() {
    const response = await http.get(url);
    return response.data;
}
