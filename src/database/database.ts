interface blog {
    id: string;
    date: Date;
    title: string;
    body: string;
};

interface blogs {
    [id: string]: blog
};

let data: blogs = {};

data[12] = {
    id: "12",
    date: new Date(),
    title: "asfd",
    body: ""
}

export {data};