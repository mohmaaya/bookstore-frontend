import React from "react";
import { Book } from "../types/types";
import { useMutation } from "@tanstack/react-query";
import { addBook } from "../api/books";
import useForm from "./useForm";

interface AddBookComponentProps {
 
}

const AddBookComponent: React.FC<AddBookComponentProps> = () => {
    const { values, handleChange, handleSubmit } = useForm(
        {
            title: "",
            first_publish_year: 0,
            number_of_pages_median: 0,
            author_name: "",
            covers: {
                S: "",
                M: "",
                L: "",
            },
        },
        (data: Book) => {
            return createBookMutation.mutate(data);
        },
        (data: Book) => {
            
        }
    );

    const createBookMutation = useMutation(addBook, {
        onSuccess: (data) => {
            console.log("book Added");
        },
        onError: () => {}
    });

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Book</h2>
            <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <input
                type="number"
                name="first_publish_year"
                value={values.first_publish_year}
                onChange={handleChange}
                placeholder="First Publish Year"
                required
            />
            <input
                type="number"
                name="number_of_pages_median"
                value={values.number_of_pages_median}
                onChange={handleChange}
                placeholder="Number of Pages Median"
                required
            />
            <input
                type="text"
                name="author_name"
                value={values.author_name}
                onChange={handleChange}
                placeholder="Author Name"
                required
            />
            <h3>Covers</h3>
            <input
                type="text"
                name="covers.S"
                value={values.covers.S}
                onChange={handleChange}
                placeholder="Cover S"
                required
            />
            <input
                type="text"
                name="covers.M"
                value={values.covers.M}
                onChange={handleChange}
                placeholder="Cover M"
                required
            />
            <input
                type="text"
                name="covers.L"
                value={values.covers.L}
                onChange={handleChange}
                placeholder="Cover L"
                required
            />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBookComponent;
