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
        `http://localhost:8080/pets/${pet.id}`,
        { name, species },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        setMessage('✅ 수정 완료!');
        console.log('Updated pet:', response.data);
        onUpdateComplete();
      })
      .catch((error) => {
        setMessage('❌ 수정 실패!');
        console.error('Error updating pet:', error);
      });
  };

  return (
    <div className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold mb-4">🐶 반려동물 수정 (ID: {pet.id})</h3>

      <form onSubmit={updatePet} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">종(species)</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        >
          수정하기
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            message.includes('성공') || message.includes('완료') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default UpdatePet;
