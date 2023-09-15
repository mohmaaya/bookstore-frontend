import React from 'react';
import { FaEnvelope, FaGithub } from 'react-icons/fa';

const AboutComponent: React.FC = () => {
    return (
        <div className="flex justify-center items-center  bg-gray-100  mt-20">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">
                Welcome to my Books Management Web App! Allow me to guide you through some of the application's functionalities.
            </h3>

            <p className="mb-4">
                In the "Paginated Books" tab, users can view a list of available books from the database.
                Initially, the display showcases ten books per page, but this count is adjustable by the user.
                Additionally, filtering options are available, which I will elaborate on in the next section.
                The "Add Books" tab enables users to contribute new books by furnishing the requested details.
            </p>

            <p className="mb-4">
                Now, let's delve deeper.
            </p>

            <p className="mb-4">
                <strong>Filtering:</strong> Users can filter the displayed books based on the title (regardless of letter case).
                Any books with matching titles will be retrieved from the database.
                Moreover, filtering by publication year is possible.
                By selecting a specific year, all books published after that year will be showcased.
                The third filter pertains to pagination, allowing users to specify the number of books displayed on each page.
                All three filtering options can be used separately or in combination.
                Resetting filters brings the display back to the initial page with ten books per page.
            </p>

            <p className="mb-4">
                <strong>Deletion:</strong> The option to delete books is available directly from the main page.
                Upon clicking the delete button, the book's data is cleared, removing it from the displayed list.
                A two-second timer is added, after which the book data is refreshed,
                resulting in the book no longer being visible due to its deletion.
            </p>

            <p className="mb-4">
                <strong>Updating:</strong> Users can view individual book details by clicking the "View" button,
                which opens a popup displaying the book's info along with cover. Within this view, users have the option to edit the book.
                A validation is added to ensure that no two books share the same title and author name.
                If an edited book's title and author match an existing book, the edit will not be permitted.
                Successful edits result in the updated information being reflected.
            </p>

            <p className="mb-4">
                <strong>Adding a Book:</strong> Users can also add new books through the "Add Book" tab.
                Similar validation is applied here to prevent adding a new book with the same title and author name as existing
                entries. If such an attempt is made, an error message is displayed. Upon successful submission,
                users are redirected to the "Paginated Books" component.
            </p>

            <p className="mb-4">
                <strong>Pagination:</strong> The key feature of the web app is pagination.
                I opted for cursor-based pagination to accommodate the possibility of deleting books directly from the main page.
                Offset-based pagination could result in indexing issues due to book deletions,
                which cursor-based pagination mitigates. The backend maintains three cursors: current, next, and previous.
                These cursors are updated based on user navigation.
                The pagination feature smoothly handles changes in the number of books per page,
                regardless of the current page. However, when applying title search or year filters,
                the pagination fetches data from the beginning, ensuring accurate filtering results.
            </p>

            <p className="mb-4">
                <strong>Tech Stack:</strong>
            </p>

            <p className="mb-4">
                <strong>Frontend:</strong> I developed the frontend using React with TypeScript.
                I employed the following techniques:
            </p>

            <ul className="list-disc ml-6 mb-4">
                <li>Utilized routing for navigation and the Navbar.</li>
                <li>Implemented a custom hook, "useForm," which streamlined form creation for both adding and editing books, reducing code duplication.</li>
                <li>Segmented features into components, fostering communication through callbacks and props.</li>
                <li>Created a popup that appears upon clicking "View Book." This popup was implemented using React DOM portal.</li>
                <li>Attempted to integrate an external API to retrieve book details based on titles. However, finding a free or paid API for this purpose proved challenging.</li>
            </ul>

            <p className="mb-4">
                <strong>For styling,</strong> I leveraged Tailwind CSS.
            </p>

            <p className="mb-4">
                <strong>Backend:</strong> As specified in the task description, I employed Java with Spring Boot for the backend. Details about the backend are outlined in a separate document, which I will provide.
            </p>

            <p>
                <FaGithub size={20} />
                You can access the frontend code on my GitHub repository:
                <a href="https://github.com/mohmaaya/bookstore-frontend" className="text-blue-500 hover:underline ml-1">Link to Frontend Repository</a>
            </p>

            <p>
                <FaGithub size={20} />
                Similarly, the backend code is available on my GitHub repository:
                <a href="https://github.com/mohmaaya/bookstore-backend" className="text-blue-500 hover:underline ml-1">Link to Backend Repository</a>
            </p>

            <p>
                <FaEnvelope size={20} />
                <a href="mailto:mohammed.ughratdar@fau.de">
                mohammed.ughratdar@fau.de
            </a>
            </p>

            <p className="mt-4">
                Thank you for your time and consideration.
            </p>
        </div>
    </div>
    );
}

export default AboutComponent;
