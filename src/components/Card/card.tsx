import { Component } from 'react';
import type { Character } from '../../services/api';
import './card.css';

type CardProps = {
  character: Character;
};

export class Card extends Component<CardProps> {
  render() {
    const { name, species, image, gender, origin, location } =
      this.props.character;

    return (
      <div className="card">
        <img className="img" src={image}></img>
        <h3>{name}</h3>
        <p>Species: {species}</p>
        <p>Gender: {gender}</p>
        <p>Location: {location.name}</p>
        <p>Origin: {origin.name}</p>
      </div>
    );
  }
}
