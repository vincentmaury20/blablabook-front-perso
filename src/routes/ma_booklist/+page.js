export async function load({ params, url }) {
    const page = url.searchParams.get('page') || '1';
    const limit = '10';

    // const res = await fetch(`http://localhost:3000/userbooks/${params.id}?page=${page}&limit=${limit}`);
    const res = await fetch(`http://localhost:3000/userbooks/4?page=${page}&limit=${limit}`);
    const data = await res.json();

    console.log(data);

    // return {
    //     booklist: data.userbooks,
    //     page: data.page,
    //     totalPages: data.totalPages,
    //     totalBooks: data.totalBooks    
    // };
    return data;
};
