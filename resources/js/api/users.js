import http from "@/api/http";

const url = "/users";

export async function getUsersRequest() {
    const response = await http.get(url);
    return response.data;
}

export async function createUserRequest(payload) {
    const response = await http.post(url, payload);
    return response.data;
}

export async function updateUserRequest(id, payload) {
    const response = await http.put(url + "/" + id, payload);
    return response.data;
}

export async function getUserByIdRequest(id) {
    const response = await http.get(url + "/" + id);
    return response.data;
}
