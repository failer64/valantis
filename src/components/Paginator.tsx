import { Button } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { FC } from 'react';

type Props = {
  currentPage: number;
  loading: boolean;
  filtered: boolean;
  onChangeCurrentPage: (value: number) => void;
};

const Paginator: FC<Props> = ({
  currentPage,
  loading,
  filtered,
  onChangeCurrentPage,
}) => {
  return (
    <Footer className="footer">
      <Button
        disabled={currentPage === 0 || loading || filtered}
        onClick={() => onChangeCurrentPage(-1)}
      >
        Предыдущая
      </Button>
      <Button
        disabled={loading || filtered}
        onClick={() => onChangeCurrentPage(1)}
      >
        Следующая
      </Button>
    </Footer>
  );
};

export default Paginator;
