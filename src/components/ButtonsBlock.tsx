import { FC } from 'react';
import { Button } from 'antd';

type Props = {
  value: string | number;
  loading: boolean;
  changeFilter: (value: string | number) => void;
  removeFilter: () => void;
};
const ButtonsBlock: FC<Props> = ({
  loading,
  value,
  changeFilter,
  removeFilter,
}) => {
  return (
    <>
      <Button disabled={loading} onClick={() => changeFilter(value)}>
        Применить
      </Button>
      <Button disabled={loading || !value} onClick={removeFilter}>
        Сброс
      </Button>
    </>
  );
};

export default ButtonsBlock;
