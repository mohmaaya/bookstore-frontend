import React, { useState } from "react";
import { Book } from "../types/types";
import { useMutation } from "@tanstack/react-query";
import { updateBook } from "../api/books";
import useForm from "./useForm";

interface ViewBookComponentProps {
    book: Book;
    onClose: () => void;
}

const ViewBookComponent: React.FC<ViewBookComponentProps> = ({ book, onClose }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState<Book>(book);

    const { values, handleChange, handleSubmit } = useForm(
        book,

        (data:Book) => {
            updateBookMutation.mutate(data);
        },
        (data: Book) => {
           
        }
    );

    const updateBookMutation = useMutation(updateBook, {
        onSuccess: (data) => {
            setEditedBook(data);
            setIsEditing(false);
            console.log("Book Updated");
        },
        onError: () => { }
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false); 
        setEditedBook(book);
    };

    return (
        <div>
            {editedBook.covers?.L && <img src={editedBook.covers.L} alt="Large cover" />}
            {isEditing ? (
                 <form onSubmit={handleSubmit}>
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
            
                    <button type="submit">Update</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
                ) : (
                <div>
                        <h3>{editedBook.id}</h3>
                        <h3>{editedBook.title}</h3>
                        <p>Author: {editedBook.author_name}</p>
                        <p>First Publish Year: {editedBook.first_publish_year}</p>
                        <p>Number of Pages: {editedBook.number_of_pages_median}</p>

                    <button type="button" onClick={handleEditClick}>Edit</button>
                </div>
            )}
            <button type="button" onClick={onClose}>Close</button>
        </div>
    );
};

export default ViewBookComponent;
