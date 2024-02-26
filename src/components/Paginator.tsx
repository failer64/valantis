import { FC, useEffect, useState } from 'react';
import styles from './Paginator.module.css';

type PropsType = {
  pageSize: number;
  currentPage: number;
  totalItems: number;
  portionSize?: number;

  onPageChanged: (p: number) => void;
};

const Paginator: FC<PropsType> = ({
  pageSize,
  currentPage,
  totalItems,
  onPageChanged,
  portionSize = 15,
}) => {
  const pagesCount = Math.ceil(totalItems / pageSize);
  const pagesArr = [];
  for (let i = 1; i <= pagesCount; i++) {
    pagesArr.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  useEffect(() => {
    setPortionNumber(Math.ceil(currentPage / portionSize));
  }, [currentPage, portionSize]);

  return (
    <div className={styles.paging}>
      {portionNumber > 1 && (
        <span onClick={() => setPortionNumber(portionNumber - 1)}>prev</span>
      )}
      {pagesArr
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p, value) => (
          <span
            key={value}
            onClick={() => onPageChanged(p)}
            className={p === currentPage ? 'active' : ''}
          >
            {p}
          </span>
        ))}
      {portionCount > portionNumber && (
        <span onClick={() => setPortionNumber(portionNumber + 1)}>next</span>
      )}
    </div>
  );
};

export default Paginator;
