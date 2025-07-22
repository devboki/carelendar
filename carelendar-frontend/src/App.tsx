import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MyCalendar from './components/MyCalendar';
import PetPage from './pages/PetPage';
import NavBar from './components/NavBar/NavBar';

function App(): React.ReactElement {
  // 캘린더 새로고침을 위한 트리거 상태
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // 일정 추가/수정 시 캘린더 갱신
  const handleScheduleUpdated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <MyCalendar
              refreshKey={refreshTrigger}
              setRefreshTrigger={setRefreshTrigger}
              petId={undefined} // 전체 일정 보기
            />
          }
        />
        <Route
          path="/pets"
          element={
            <PetPage onScheduleUpdated={handleScheduleUpdated} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
