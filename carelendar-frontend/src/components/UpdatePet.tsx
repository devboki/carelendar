import { useState } from 'react';
import axios from 'axios';
import type { Pet } from '../types/Pet';

interface UpdatePetProps {
  pet: Pet;
  onUpdateComplete: () => void;
}

const UpdatePet: React.FC<UpdatePetProps> = ({ pet, onUpdateComplete }) => {
  const [name, setName] = useState<string>(pet.name);
  const [species, setSpecies] = useState<string>(pet.species);
  const [message, setMessage] = useState<string>('');

  const updatePet = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    axios
      .put<Pet>(
        `http://localhost:8080/api/pets/${pet.id}`,
        { name, species },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        setMessage('Pet updated successfully!');
        console.log('Updated pet:', response.data);
        onUpdateComplete();
      })
      .catch((error) => {
        setMessage('Error updating pet.');
        console.error('Error updating pet:', error);
      });
  };

  return (
    <div>
      <h3>Update Pet (ID: {pet.id})</h3>
      <form onSubmit={updatePet}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Species:</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Pet</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdatePet;
