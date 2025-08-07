import { useState, useEffect } from 'react';
import axios from 'axios';
import UpdatePet from './UpdatePet';
import type { Pet } from '../types/Pet';

interface PetListProps {
  refreshPets: boolean;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const url = import.meta.env.VITE_API_BASE_URL + '/pets';

const PetList: React.FC<PetListProps> = ({ refreshPets }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [updatingPetId, setUpdatingPetId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get<Pet[]>(url, {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      })
      .then((res) => setPets(res.data))
      .catch((err) => console.error('Error fetching pets:', err));
  }, [refreshPets]);

  const deletePet = (id: number) => {
    axios
      .delete(`${url}/${id}`)
  .then((res) => {
    if (res.status === 200 || res.status === 204) {
      alert("삭제 성공!");
      window.location.reload();
    } else {
      console.error('예상치 못한 응답 코드:', res.status);
    }
  })
  .catch((err) => {
    console.error('삭제 실패:', err);
    alert('삭제에 실패했습니다.');
  });
  };

  const handleUpdateComplete = () => {
    setUpdatingPetId(null);
    axios
      .get<Pet[]>(url)
      .then((res) => setPets(res.data))
      .catch((err) => console.error('Error fetching pets after update:', err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🐾 반려동물 목록 🐾</h1>

      {pets.length === 0 ? (
        <p className="text-center text-gray-500">저장된 반려동물이 없어요...🥺</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col items-start justify-between space-y-3"
            >
              <div>
                <h2 className="text-xl font-semibold">{pet.name}</h2>
                <p className="text-gray-600">{pet.species}</p>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => deletePet(pet.id)}
                  className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                  삭제
                </button>
                <button
                  onClick={() => setUpdatingPetId(pet.id)}
                  className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  수정
                </button>
              </div>

              {updatingPetId === pet.id && (
                <div className="w-full mt-2">
                  <UpdatePet pet={pet} onUpdateComplete={handleUpdateComplete} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetList;
