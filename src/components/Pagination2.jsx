import axios from "axios";
import { useEffect, useState } from "react";

const renderPages = (totalPages) => {
    const pages = []
    for(var i = 1; i <= totalPages; i++){
        pages.push(i)
    }
    return pages;
}

const Pagination2 = () => {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState();

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://reqres.in/api/users?page=${page}`)
            setData(res.data);
            setPages(renderPages(res.data.total_pages));
        }

        getData();

    }, [page])

    const pageChange = (event) => {
        setPage(event.target.value);
    }

    return(data)?(
        <>
            <h3>Pages</h3>
            <ul>
                {pages.map( (page, index) =>
                    <button onClick={pageChange} value={page}>{page}</button>
                )}
            </ul>

            <h2>Users</h2>
            {data.data.map((user) => 
                <div key={user.id}>
                    <h3>{user.first_name}</h3>
                    <h4>{user.email}</h4>
                    <img src={user.avatar} alt="user" />
                </div>
            )}
        </>
    ): <>Loading....</>

}

export default Pagination2;