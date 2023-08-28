import React from "react";
import { Cursor } from "../types/types";

interface PaginationProps {
    cursors: Cursor | null;
    onNextPage: () => void;
    onPreviousPage: () => void;
}

const ChangePageComponent: React.FC<PaginationProps> = ({
    cursors,
    onNextPage,
    onPreviousPage
}) => {
    return (
        <div className="flex justify-between">
            {cursors?.previousCursor && (
                <button
                    className="
                    text-gray-600 
                    px-3 py-2 
                    border border-gray-600
                    transition 
                    duration-300 
                    hover:bg-gray-300 
                    hover:text-gray-800 
                    transform hover:scale-110
                    mb-5"
                    
                    onClick={onPreviousPage}
                >
                    ← Previous
                </button>
            )}
            {cursors?.nextCursor && (
                <button
                    className="
                    text-gray-600 
                    px-3 py-2   
                    border border-gray-600
                    transition 
                    duration-300 
                    hover:bg-gray-300 
                    hover:text-gray-800 
                    transform hover:scale-110
                    ml-5 mb-5"
                    
                    onClick={onNextPage}
                >
                    Next →
                </button>
            )}
        </div>
    );
};

export default ChangePageComponent;
