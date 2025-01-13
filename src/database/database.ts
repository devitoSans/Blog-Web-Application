interface blog {
    date: string;
    title: string;
    author: string;
    body: string;
};

interface blogs {
    [id: string]: blog
};

let data: blogs = {};

export default data;