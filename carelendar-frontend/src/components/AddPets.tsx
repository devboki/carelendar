import { useState } from 'react';
import axios from 'axios';

interface AddPetsProps {
  onPetAdded: () => void;
}

function AddPets({ onPetAdded }: AddPetsProps) {
  const [name, setName] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const submitPet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const petData = [{ name, species }];

    axios
      .post('/api/pets', petData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setMessage('Pet added successfully!');
        console.log('Added pets:', response.data);
        onPetAdded(); // props 콜백 호출
      })
      .catch((error) => {
        setMessage('Error adding pet.');
        console.error('Error adding pet:', error);
      });
  };

  return (
    <div>
      <h2>Add a Pet</h2>
      <form onSubmit={submitPet}>
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
        <button type="submit">Add Pet</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddPets;
