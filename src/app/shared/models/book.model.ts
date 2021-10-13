export interface IBook {
    id: number;
    title: string;
    description: string;
    genre: string;
    author: string;
    image: string;
    showDescription: boolean;
}

export interface IGenre {
    id: number;
    name: string;
}