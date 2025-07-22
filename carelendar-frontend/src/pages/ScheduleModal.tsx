import './ScheduleModal.css';

export interface SelectedEvent {
  id?: number;
  title: string;
  start: string | Date;
  end: string | Date;
  description?: string;
  petId?: number;
}

interface ScheduleModalProps {
  event: SelectedEvent;
  isEditMode: boolean;
  onClose: () => void;
  onSubmit: (event: SelectedEvent) => void;
  onDelete: (id: number) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  event,
  isEditMode,
  onClose,
  onSubmit,
  onDelete
}) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{event.title || '(제목 없음)'}</h2>
        <p><strong>설명:</strong> {event.description || '없음'}</p>
        <p><strong>시작일:</strong> {new Date(event.start).toLocaleDateString()}</p>
        <p><strong>종료일:</strong> {new Date(event.end).toLocaleDateString()}</p>
        <div className="modal-actions">
          {isEditMode ? (
            <button onClick={() => onSubmit(event)}>💾 저장</button>
          ) : (
            <button onClick={() => onSubmit(event)}>➕ 추가</button>
          )}
          {isEditMode && (
            <button onClick={() => onDelete(event.id ?? 0)}>🗑️ 삭제</button>
          )}
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};


export default ScheduleModal;
