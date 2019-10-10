export let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

export function parseJSON(response) {
    console.log(response);
    if (response.ok) {
        return response.clone().json();
    }
    return Promise.reject(response.clone());
}

export function updateHeaders(newHeaders) {
    headers = { ...headers, newHeaders };
    Object.keys(headers).forEach((key) => {
        if (undefined === headers[key]) {
            delete headers[key];
        }
    });
}