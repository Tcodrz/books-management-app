import { IBook } from 'src/app/shared/models/book.model';
import { FilterEvent } from './../../books-management/books-list-filter/books-list-filter.component';


export const filterBooksByTitleAndGenre = (books: IBook[], filter: FilterEvent): IBook[] => {
    if (!filter.title && filter.genres.length < 1) {
        return books;
    }

    let filteredBooks = [];

    if (filter.genres.length > 0) {
        books.forEach(book => {

            for (let i = 0; i < filter.genres.length; i++) {
                if (book.genres.includes(filter.genres[i])) {
                    filteredBooks.push(book);
                }
            }
        });

        filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(filter.title.toLowerCase())
        );
    } else {
        filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(filter.title.toLowerCase())
        );
    }

    return [...filteredBooks];
}

export const toggleBookDescription = (books: IBook[], book: IBook): IBook[] => {
    let b = books.find(b => b.id === book.id);

    b = { ...b, showDescription: !b.showDescription };

    books = [...books.filter(b => b.id !== book.id)];
    return [...books, b];
}