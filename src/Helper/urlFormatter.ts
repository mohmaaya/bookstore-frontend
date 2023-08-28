import { PageParams } from "../types/types";

export const urlQuery = (parameters: PageParams) => {
    let query = "";

    if (parameters.cursor !== undefined) {
        query += `cursor=${parameters.cursor}&`;
    }
    if (parameters.limit !== undefined) {
        query += `limit=${parameters.limit}&`;
    }
    if (parameters.direction !== undefined) {
        query += `direction=${parameters.direction}&`;
    }
    if (parameters.title !== undefined) {
        query += `title=${parameters.title}&`;
    }
    if (parameters.first_publish_year !== undefined) {
        query += `year_From=${parameters.first_publish_year}&`;
    }

    if (query.endsWith('&')) {
        query = query.slice(0, -1);
    }

    if (query) {
        query = `?${query}`;
    }

    return query;
};

