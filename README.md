Link to BackEnd : https://github.com/mohmaaya/bookstore-backend
<br>
Filtering: Users can filter the displayed books based on the title (regardless of letter case). Any books with matching titles will be retrieved from the database. Moreover, filtering by publication year is possible. By selecting a specific year, all books published after that year will be showcased. The third filter pertains to pagination, allowing users to specify the number of books displayed on each page. All three filtering options can be used separately or in combination. Resetting filters brings the display back to the initial page with ten books per page.
<br>
Deletion: The option to delete books is available directly from the main page. Upon clicking the delete button, the book's data is cleared, removing it from the displayed list. A two-second timer is added, after which the book data is refreshed, resulting in the book no longer being visible due to its deletion.
<br>
Updating: Users can view individual book details by clicking the "View" button, which opens a popup displaying the book's info along with cover. Within this view, users have the option to edit the book. A validation is added to ensure that no two books share the same title and author name. If an edited book's title and author match an existing book, the edit will not be permitted. Successful edits result in the updated information being reflected.
<br>
Adding a Book: Users can also add new books through the "Add Book" tab. Similar validation is applied here to prevent adding a new book with the same title and author name as existing entries. If such an attempt is made, an error message is displayed. Upon successful submission, users are redirected to the "Paginated Books" component.
<br>
Pagination: The key feature of the web app is pagination. I opted for cursor-based pagination to accommodate the possibility of deleting books directly from the main page. Offset-based pagination could result in indexing issues due to book deletions, which cursor-based pagination mitigates. The backend maintains three cursors: current, next, and previous. These cursors are updated based on user navigation. The pagination feature smoothly handles changes in the number of books per page, regardless of the current page. However, when applying title search or year filters, the pagination fetches data from the beginning, ensuring accurate filtering results.
<br>

•	Utilized routing for navigation and the Navbar.
<br>
•	Implemented a custom hook, "useForm," which streamlined form creation for both adding and editing books, reducing code duplication.
<br>
•	Segmented features into components, fostering communication through callbacks and props.
<br>
•	Created a popup that appears upon clicking "View Book." This popup was implemented using React DOM portal.
<br>
•	Attempted to integrate an external API to retrieve book details based on titles. However, finding a free or paid API for this purpose proved challenging.

