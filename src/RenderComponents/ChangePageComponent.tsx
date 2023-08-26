import React from "react";
import { Cursor } from "../types/types";

interface PaginationProps {
    cursors: Cursor | null,
    onNextPage: () => void;
    onPreviousPage: () => void;
}

const ChangePageComponent: React.FC<PaginationProps> = ({
    cursors,
    onNextPage,
    onPreviousPage,
}) => {

    console.log("cursors", cursors);
    return (
        <div>
            {cursors?.previousCursor && <button onClick={onPreviousPage}>Previous</button>}
            {cursors?.nextCursor && <button onClick={onNextPage}>Next</button>}
        </div>
    );
};

export default ChangePageComponent;