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
    let res;
    await fetch(url)
    .then(data => data.json())
    .catch((data) => {
        console.log(data);
    })
    .finally((data) => {
        res = data;
    });

    if (!res.ok) {
        throw new Error(`Could not feth $
       {url}, status: ${res.status}`);
    }
    return await res.json();
};

export {postData};
export {getData};