import { useState, useEffect } from "react";
import { Button } from "./Button"

import { api } from "../services/api"

import "../styles/sidebar.scss";

interface GenreResponse {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  selectedGenreId: number;
  onClickGenre: (id: number) => void;
}

export function SideBar(props: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponse[]>([]);

  useEffect(() => {
    api.get<GenreResponse[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.onClickGenre(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}