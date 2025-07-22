import { useState, useEffect } from 'react';
import axios from 'axios';
import UpdatePet from './UpdatePet';
import type { Pet } from '../types/Pet';

interface PetListProps {
  refreshPets: boolean;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const PetList: React.FC<PetListProps> = ({ refreshPets }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [updatingPetId, setUpdatingPetId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get<Pet[]>('/api/pets')
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pets:', error);
      });
  }, [refreshPets]);

  const deletePet = (id: number) => {
    axios
      .delete(`/api/pets/${id}`)
      .then(() => {
        return axios.get<Pet[]>('/api/pets');
      })
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error('Error deleting pet or fetching pets:', error);
      });
  };

  const handleUpdateComplete = () => {
    setUpdatingPetId(null);
    axios
      .get<Pet[]>('/api/pets')
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pets after update:', error);
      });
  };

  return (
    <div>
      <h1>Pet List</h1>
      {pets.length === 0 ? (
        <p>No pets found.</p>
      ) : (
        <ul>
          {pets.map((pet) => (
            <li key={pet.id}>
              {pet.name} ({pet.species})
              <button onClick={() => deletePet(pet.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
              <button onClick={() => setUpdatingPetId(pet.id)} style={{ marginLeft: '10px' }}>
                Update
              </button>

              {updatingPetId === pet.id && (
                <UpdatePet pet={pet} onUpdateComplete={handleUpdateComplete} />
              )}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PetList;
