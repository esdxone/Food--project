const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await res.json();
};
const getData = async (url) => {
    const data = await fetch(url)
        .then(res => {
            if (res.ok) {
                return res;
            } else {
                throw new Error(`Could not feth
                ${url}, status: ${res.status}`);
            }
        });
    return await data.json();
};

export {
    postData,
    getData
};