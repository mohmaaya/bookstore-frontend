import React, { useEffect, useState } from "react";
import { Book } from "../types/types";
import { useMutation } from "@tanstack/react-query";
import { updateBook } from "../api/books";
import useForm from "./useForm";
import ReactDOM from 'react-dom';
import { AxiosError } from "axios";

interface ViewBookComponentProps {
    book: Book;
    onClose: () => void;
}

const ViewBookComponent: React.FC<ViewBookComponentProps> = ({ book, onClose }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState<Book>(book);
    const [bookUpdated, setBookUpdated] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const [bookNotFound, setBookNotFound] = useState<Boolean>(false);
    const [duplicateBookExist, setDuplicateBookExist] = useState<Boolean>(false);

    const { values, handleChange, handleSubmit } = useForm(
        book,
        (data: Book) => {
            updateBookMutation.mutate(data);
        },
        (data: Book) => {

        }
    );

    const updateBookMutation = useMutation(updateBook, {
        onSuccess: (data) => {
            setLoading(false);
            if (bookNotFound) setBookNotFound(false);
            if (duplicateBookExist) setDuplicateBookExist(false);
            setBookUpdated(true);
            setTimeout(() => {
                setBookUpdated(false);
                setEditedBook(data);
                setIsEditing(false);
            }, 2000);
            
           
        },
        onError: (error: AxiosError) => {
            setLoading(false);
            if (error.response && error.response.status === 404) {
                setBookNotFound(true);
            }
            if (error.response && error.response.status === 409) {
                setDuplicateBookExist(true);
            }
        }
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedBook(book);
    };

    useEffect(() => {
        if (updateBookMutation.status === "loading") {
            setLoading(true);
        }
    }, [updateBookMutation.status]);

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-8 rounded-lg z-50 w-[800px] h-[680px] flex">
                <div className="flex-shrink-0">
                    {editedBook.covers?.L && (
                        <img src={editedBook.covers.L} alt="Large cover" className="h-full w-auto" />
                    )}
                </div>

                <div className="ml-8 flex-grow">
                    <div className="relative mt-2 mb-3" style={{ left: "250px" }}>
                        <button
                            type="button"
                            className="bg-red-500 text-white px-3 py-2 rounded-md"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                placeholder="Title"
                                required
                                className="border rounded-md px-3 py-2 w-full"
                            />
                            <input
                                type="number"
                                name="first_publish_year"
                                value={values.first_publish_year}
                                onChange={handleChange}
                                placeholder="First Publish Year"
                                required
                                className="border rounded-md px-3 py-2 w-full"
                            />
                            <input
                                type="number"
                                name="number_of_pages_median"
                                value={values.number_of_pages_median}
                                onChange={handleChange}
                                placeholder="Number of Pages Median"
                                required
                                className="border rounded-md px-3 py-2 w-full"
                            />
                            <input
                                type="text"
                                name="author_name"
                                value={values.author_name}
                                onChange={handleChange}
                                placeholder="Author Name"
                                required
                                className="border rounded-md px-3 py-2 w-full"
                            />
                            <h3>Covers</h3>
                            <input
                                type="text"
                                name="covers.S"
                                value={values.covers.S}
                                onChange={handleChange}
                                placeholder="Cover S"
                                required
                                className="border rounded-md px-3 py-2 w-full"
                            />
                            <input
                                type="text"
                                name="covers.M"
                                value={values.covers.M}
                                onChange={handleChange}
                                placeholder="Cover M"
                                required
                                className="border rounded-md px-3 py-2 w-full"
                            />
                            <input
                                type="text"
                                name="covers.L"
                                value={values.covers.L}
                                onChange={handleChange}
                                placeholder="Cover L"
                                required
                                className="border rounded-md px-3 py-2 w-full"
                            />

                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-3 py-2 rounded-md"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white ml-4 px-3 py-2 rounded-md"
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </button>
                            <div className="flex justify-center items-center">
                                <div className="text-center">
                                    {loading && <p className="text-lg font-bold mb-1">Loading...</p>}
                                    {bookNotFound && (
                                        <h3 className="text-lg font-bold text-red-600 mb-1">
                                            Book not found.
                                        </h3>
                                    )}
                                    {bookUpdated && (
                                        <h3 className="text-lg font-bold text-green-600 mb-1">
                                            Book has been successfully added! Redirecting to view mode...
                                        </h3>
                                    )}
                                    {duplicateBookExist && (
                                        <h3 className="text-lg font-bold text-red-600 mb-1">
                                           Book with the same title and author name exists. 
                                        </h3>
                                    )}
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-5">
                            <h3 className="text-xl font-semibold">{editedBook.title}</h3>
                            <p className="text-lg">Author: {editedBook.author_name}</p>
                            <p className="text-lg">First Publish Year: {editedBook.first_publish_year}</p>
                            <p className="text-lg">Number of Pages: {editedBook.number_of_pages_median}</p>

                            <button
                                type="button"
                                onClick={handleEditClick}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md text-lg"
                            >
                                Edit
                            </button>
                        </div>
                    )
                }
                </div>
            </div>
        </div>,
        document.getElementById('popup') as Element
    );
}

    export default ViewBookComponent;