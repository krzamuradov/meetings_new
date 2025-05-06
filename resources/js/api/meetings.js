import http from "@/api/http";

const url = "/meetings";

export async function getMeetingsRequest() {
    const response = await http.get(url);
    return response.data;
}

export async function getMeetingByIdRequest(id) {
    const response = await http.get(url + "/" + id);
    return response.data;
}

export async function createMeetingRequest(payload) {
    const response = await http.post(url, payload);
    if (response.status === 201) {
        return response.data;
    }
}

export async function updateMeetingRequest(id, payload) {
    const response = await http.put(url + "/" + id, payload);
    if (response.status === 201) {
        return response.data;
    }
}
