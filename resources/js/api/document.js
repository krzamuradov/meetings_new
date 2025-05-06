import http from "@/api/http";

const url = "/documents";

export async function createDocumentRequest(payload) {
    const response = await http.post(url, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
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
