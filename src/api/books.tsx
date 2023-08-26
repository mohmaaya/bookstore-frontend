
import axios from "axios";
import { PageParams } from "../types/types";


export function getAllBooks(pageParams: PageParams | null) {

    return axios
        .get("http://localhost:8080/books", {
            params: pageParams,
        })
        .then(res => res.data)
}
