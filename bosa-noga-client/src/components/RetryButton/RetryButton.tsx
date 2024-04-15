import { Button } from "react-bootstrap";
import s from './RetryButton.module.css';

interface RetryButtonProps {
  refetch: () => void;
}

const RetryButton: React.FC<RetryButtonProps> = ({ refetch }) => {
  const handleClick = () => {
    refetch();
  };

  return (
    <div className="text-center">
      <p>Ошибка получения данных от сервера</p>
      <Button onClick={handleClick} variant="outline-dark" className={s.reloadAnimation}>
        Повторить запрос
      </Button>
    </div >
  );
};

export default RetryButton;
