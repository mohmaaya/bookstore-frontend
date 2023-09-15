import React, { useEffect, useState } from "react";
import { Book } from "../types/types";
import { useMutation } from "@tanstack/react-query";
import { addBook } from "../api/books";
import useForm from "./useForm";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface AddBookComponentProps {
 
}

const AddBookComponent: React.FC<AddBookComponentProps> = () => {

    const [bookAdded, setBookAdded] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const [bookTaken, setBookTaken] = useState<Boolean>(false);
    const navigate = useNavigate();

    const { values, handleChange, handleSubmit } = useForm(
        {
            title: "",
            first_publish_year: "",
            number_of_pages_median: "",
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
        (data: Book) => { }
    );

    const createBookMutation = useMutation(addBook, {
        onSuccess: (data) => {
            setLoading(false);
            setBookTaken(false);
            setBookAdded(true);
            setTimeout(() => {
                navigate('../paginatedbooks');
            }, 2000);
        },
        onError: (error: AxiosError) => {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                setBookTaken(true);
            }

        },
    });

    useEffect(() => {
        if (createBookMutation.status === "loading") {
            setLoading(true);
        }
    }, [createBookMutation.status]);

    return (
        <div className="flex mt-20 justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-lg shadow-md w-[400px]"
            >
                <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="input w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        name="first_publish_year"
                        value={values.first_publish_year}
                        onChange={handleChange}
                        placeholder="First Publish Year"
                        className="input w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        name="number_of_pages_median"
                        value={values.number_of_pages_median}
                        onChange={handleChange}
                        placeholder="Number of Pages Median"
                        className="input w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="author_name"
                        value={values.author_name}
                        onChange={handleChange}
                        placeholder="Author Name"
                        className="input w-full"
                        required
                    />
                </div>
                    <h3 className="text-lg font-semibold mb-2">Covers</h3>
                <div className="mb-4">
                    <input
                        type="text"
                        name="covers.S"
                        value={values.covers.S}
                        onChange={handleChange}
                        placeholder="Cover S"
                        className="input w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="covers.M"
                        value={values.covers.M}
                        onChange={handleChange}
                        placeholder="Cover M"
                        className="input w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="covers.L"
                        value={values.covers.L}
                        onChange={handleChange}
                        placeholder="Cover L"
                        className="input w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className=" ml-20 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-4"
                >
                    Add Book
                </button>
                <div className="flex justify-center items-center">
                    <div className="text-center">
                        {loading && <p className="text-lg font-bold mb-1">Loading...</p>}
                        {bookTaken && (
                            <h3 className="text-lg font-bold text-red-600 mb-1">
                                A book with the same name by the same author exists.
                            </h3>
                        )}
                        {bookAdded && (
                            <h3 className="text-lg font-bold text-green-600 mb-1">
                                Book has been successfully added! Redirecting to all books...
                            </h3>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddBookComponent;

