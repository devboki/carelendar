import { useState, useEffect } from 'react';
import { http } from '../lib/http';
import UpdatePet from './UpdatePet';
import type { Pet } from '../types/Pet';

interface PetListProps {
  refreshPets: boolean;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const url = '/pets';

// 응답 정규화 유틸
function normalizePets(raw: unknown): Pet[] {
  if (Array.isArray(raw)) return raw as Pet[];
  // Page 형태 { content: [...] }
  if (raw && typeof raw === 'object' && Array.isArray((raw as any).content)) {
    return (raw as any).content as Pet[];
  }
  // HATEOAS 형태 { _embedded: { pets: [...] } }
  if (
    raw &&
    typeof raw === 'object' &&
    (raw as any)._embedded &&
    Array.isArray((raw as any)._embedded.pets)
  ) {
    return (raw as any)._embedded.pets as Pet[];
  }
  return [];
}

const PetList: React.FC<PetListProps> = ({ refreshPets }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [updatingPetId, setUpdatingPetId] = useState<number | null>(null);

  useEffect(() => {
    http
      .get(url, {
        params: { _ts: Date.now() }, // 캐시 버스터
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-store',
          Pragma: 'no-cache',
        },
      })
      .then((res) => {
        // 콘솔에 원본 응답 로깅
        console.log('GET /pets status=', res.status);
        console.log('GET /pets content-type=', res.headers['content-type']);
        console.log('GET /pets raw data=', res.data);

        const list = normalizePets(res.data);
        setPets(list);
      })
      .catch((err) => {
        console.error('Error fetching pets:', err);
        setPets([]); // 방어
      });
  }, [refreshPets]);

  const deletePet = (id: number) => {
    http
      .delete(`${url}/${id}`)
      .then((res) => {
        console.log('DELETE /pets/:id status=', res.status);
        if (res.status === 200 || res.status === 204) {
          // 성공 시 상태에서 제거
          setPets((prev) => prev.filter((p) => p.id !== id));
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
    http
      .get(url, {
        params: { _ts: Date.now() },
        headers: { Accept: 'application/json', 'Cache-Control': 'no-store', Pragma: 'no-cache' },
      })
      .then((res) => {
        console.log('REFETCH /pets status=', res.status, 'raw=', res.data);
        setPets(normalizePets(res.data));
      })
      .catch((err) => console.error('Error fetching pets after update:', err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🐾 반려동물 목록 🐾</h1>

      {Array.isArray(pets) && pets.length === 0 ? (
        <p className="text-center text-gray-500">저장된 반려동물이 없어요...🥺</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.isArray(pets) &&
            pets.map((pet) => (
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
