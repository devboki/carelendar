import { useState, useEffect } from 'react';
import AddPets from '../components/AddPets';
import PetList from '../components/PetList';

interface PetPageProps {
  onScheduleUpdated: () => void;
}

function PetPage({ onScheduleUpdated }: PetPageProps) {
  const [refreshPets, setRefreshPets] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    console.log('🐾 refreshTrigger updated:', refreshTrigger);
  }, [refreshTrigger]);

  const handlePetAdded = () => {
    setRefreshPets(prev => !prev);
    setRefreshTrigger(prev => prev + 1);

    // 캘린더 갱신 트리거 호출
    onScheduleUpdated();
  };

  return (
    <div>
      <AddPets onPetAdded={handlePetAdded} />
      <PetList
        refreshPets={refreshPets}
        setRefreshTrigger={setRefreshTrigger}
        //onScheduleUpdated={onScheduleUpdated} // 필요 시 전달
      />
    </div>
  );
}

export default PetPage;
