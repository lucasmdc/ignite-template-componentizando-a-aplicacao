import { useState, useEffect } from "react";
import { MovieCard } from '../components/MovieCard';

import { api } from "../services/api";

import "../styles/content.scss";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponse {
  title: string;
}

interface ContentProps {
  selectedGenreId: number;
}

export function Content(props: ContentProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponse>({} as GenreResponse);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${props.selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponse>(`genres/${props.selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [props.selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}