import { useState } from 'react';
import axios from 'axios';

interface Pet {
  id: number;
  name: string;
  species?: string;
}

interface AddScheduleProps {
  pet: Pet;
  onScheduleAdded: (petId: number) => void;
}

function AddSchedule({ pet, onScheduleAdded }: AddScheduleProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const submitSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const scheduleData = {
      title,
      description,
      startTime, // ISO 형식의 날짜 문자열
      endTime,
    };

    axios
      .post(`http://localhost:8080/api/schedules/${pet.id}`, scheduleData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setMessage('스케줄이 성공적으로 추가되었습니다.');
        onScheduleAdded(pet.id); // callback with pet ID
      })
      .catch((error) => {
        setMessage('스케줄 추가에 실패하였습니다.');
        console.error('Error adding schedule:', error);
      });
  };

  return (
    <div style={{ border: '1px solid #ccc', marginTop: '8px', padding: '8px' }}>
      <h4>일정 추가 (Pet: {pet.name})</h4>
      <form onSubmit={submitSchedule}>
        <div>
          <label>제목: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>설명: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>시작 시간: </label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>종료 시간: </label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">일정 추가</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddSchedule;
