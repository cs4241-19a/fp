export const request = async (method, endpoint, json = {}) => {
    const res = await fetch(endpoint, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    });

    // Redirect us if the request wants us to be redirected
    if (res.redirected) {
        window.location.href = res.url;
    }

    if (!res.ok) {
        console.error(res);
    }

    return res;
};