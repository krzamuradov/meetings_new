import http from "@/api/http";

export async function loginRequest(payload) {
    const response = await http.post("/login", payload);
    return response.data;
}

export async function logoutRequest(payload) {
    const response = await http.post("/logout");
    return response.data;
}
