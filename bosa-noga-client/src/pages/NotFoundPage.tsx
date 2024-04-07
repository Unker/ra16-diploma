import { useNavigate } from 'react-router-dom';

import { MAIN_PAGE_ROUTE } from '../utils/consts';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="top-sales">
      <h1 className="text-center">Error 404. Page not found</h1>
      <div className="text-center">
        <p>
          Извините, такая страница не найдена!
        </p>
        <i
          onClick={() => navigate(MAIN_PAGE_ROUTE)}
          style={{ cursor: 'pointer' }}
        >
          Перейти на главную
        </i>
      </div>
    </section>
  );
};

export default NotFoundPage;
