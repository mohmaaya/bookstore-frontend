import React from "react";
import { Books, Book } from "../types/types";
import BookCardComponent from "./BookCardComponent";

interface BookComponentProps {
    booksData: Books | null;
    onViewBookAction: (book: Book) => void;
    onDeleteBookAction: (id: number) => void;
}

const BookComponent: React.FC<BookComponentProps> = ({ booksData, onViewBookAction, onDeleteBookAction }) => {
    return (
        <div>
            <h4>In Book Component</h4>
            {
                booksData && (
                    <ul>
                        {booksData?.books?.map((book: Book) => (
                            <li key={book.id}>
                           
                                <BookCardComponent book={book} />

                                <button onClick={() => onViewBookAction(book)}>
                                    View Book
                                </button>

                               
                                <button onClick={() => onDeleteBookAction(book.id)}>
                                    Delete Book
                                </button>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    );
}

export default BookComponent;
