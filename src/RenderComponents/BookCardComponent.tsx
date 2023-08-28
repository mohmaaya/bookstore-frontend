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
        <div className="book-card bg-white rounded-lg p-6 flex items-center space-x-4">
            {book.covers?.M && (
                <div className="flex-shrink-0">
                    <img src={book.covers.M} alt="Medium cover" className="w-20 h-auto" />
                </div>
            )}

            <div>
                <h3 className="text-xl font-semibold">{book.id}</h3>
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-base">Author: {book.author_name}</p>
                <p className="text-base">First Publish Year: {book.first_publish_year}</p>
                <p className="text-base">Number of Pages: {book.number_of_pages_median}</p>
            </div>
        </div>
    );
};

export default BookCardComponent;
