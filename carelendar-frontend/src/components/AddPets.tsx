import { useState } from 'react';
//import axios from 'axios';
import {http} from '../lib/http'

interface AddPetsProps {
  onPetAdded: () => void;
}

function AddPets({ onPetAdded }: AddPetsProps) {
  const [name, setName] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const url = import.meta.env.VITE_API_BASE_URL+'/pets';

  const submitPet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const petData = { name, species };

    http//axios
      .post(`${url}/add`, petData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setMessage('✅ 반려동물이 등록되었습니다.');
        console.log('Added pets:', response.data);
        onPetAdded();
        setName('');
        setSpecies('');
      })
      .catch((error) => {
        setMessage('❌ 등록에 실패했습니다.');
        console.error('Error adding pet:', error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">반려동물 추가</h2>
      <form onSubmit={submitPet} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">동물 종</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          추가하기
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm font-medium text-green-600">{message}</p>
      )}
    </div>
  );
}

export default AddPets;
