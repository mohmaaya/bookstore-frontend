import React from "react";
import { Book } from "../types/types";

interface BookCardComponentProps {
    book: Book | null;
}

const BookCardComponent: React.FC<BookCardComponentProps> = ({ book }) => {
    if (!book) {
        return null;
    }

    return (
        <div className="book-card">
            <h3>{book.id}</h3>
            <h3>{book.title}</h3>
            <p>Author: {book.author_name}</p>
            <p>First Publish Year: {book.first_publish_year}</p>
            <p>Number of Pages: {book.number_of_pages_median}</p>

            <div className="covers">
                {book.covers?.S && <img src={book.covers.S} alt="Small cover" />}
                {book.covers?.M && <img src={book.covers.M} alt="Medium cover" />}
                {book.covers?.L && <img src={book.covers.L} alt="Large cover" />}
            </div>
        </div>
    );
};

export default BookCardComponent;
