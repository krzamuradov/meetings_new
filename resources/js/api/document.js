import http from "@/api/http";

const url = "/documents";

export async function createDocumentRequest(payload) {
    const formData = new FormData();

    formData.append("meeting_id", payload.meeting_id);
    formData.append("name", payload.name);
    formData.append("locale", payload.locale);
    formData.append("position", payload.position);
    if (payload.file) {
        formData.append("file", payload.file);
    }

    const response = await http.post(url, formData);
    if (response.status === 201) {
        return response.data;
    }
}

export async function updateDocumentRequest(document_id, payload) {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("locale", payload.locale);
    formData.append("position", payload.position);
    formData.append("_method", "PUT");
    if (payload.file) {
        formData.append("file", payload.file);
    }

    const response = await http.post(url + "/" + document_id, formData);
    if (response.status === 201) {
        return response.data;
    }
}

export async function getDocumentByIdRequest(id) {
    const response = await http.get(url + "/" + id);
    return response.data;
}

export async function deleteDocumentRequest(id) {
    const formData = new FormData();
    formData.append("_method", "DELETE");
    const response = await http.post(url + "/" + id, formData);
    return response.data;
}
