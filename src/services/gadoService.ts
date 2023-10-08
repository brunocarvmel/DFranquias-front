import api from "@/services/api";

export async function gados() {
    return api.get('/gados');
};

export async function apagarGado(id) {
    return api.delete(`/gados/${id}`);
};

export async function save(data) {
    return api.post('/gados', data);
}

export async function update(id, data) {
    return api.put(`/gados/${data.id}`, data);
}

export async function abaterGado(id_gado) {
    return api.post(`/abates`, {id_gado});
}