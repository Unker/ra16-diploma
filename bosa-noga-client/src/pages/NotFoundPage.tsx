import { useNavigate } from 'react-router-dom';

import { MAIN_PAGE_ROUTE } from '../utils/consts';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Error 404. Page not found</h1>
      <i
        onClick={() => navigate(MAIN_PAGE_ROUTE)}
        style={{ cursor: 'pointer' }}
      >
        На главную
      </i>
    </>
  );
};

export default NotFoundPage;
