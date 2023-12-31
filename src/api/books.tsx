
import axios from "axios";
import { Book, PageParams } from "../types/types";


export function getAllBooks(pageParams: PageParams | null) {

    return axios
        .get("http://localhost:8080/books", {
            params: pageParams,
        })
        .then(res => res.data)
}

export function addBook(book: Book) {
    return axios
        .post("http://localhost:8080/books",
            book 
        )
        .then(res => res.data)
}

export function deleteBook(id: number) {
    return axios
        .delete(`http://localhost:8080/books/${id}`)
        .then(res => res.data);
}

export function updateBook(book: Book) {
    const id = book.id;
    return axios
        .put(`http://localhost:8080/books/${id}`,
            book
        )
        .then(res => res.data)
}


