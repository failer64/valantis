import { useEffect, useState } from 'react';
import './App.css';
import { getUniqeItems } from './helpers';
import { Table } from 'antd';
import Paginator from './components/Paginator';
import Filters from './components/Filters';
import { getData } from './api';

const { Column } = Table;

export interface Items {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}

const pageSize = 50;

function App() {
  const [items, setItems] = useState<Items[]>([]);
  const [products, setProducts] = useState<Items[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(0);
  const [filterValue, setFilterValue] = useState<string | number>('');
  const [fields, setFields] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // получаем список полей фильтра
    getData({
      action: 'get_fields',
    }).then((data) => setFields(data));

    // получаем список всех брендов
    getData({
      action: 'get_fields',
      params: {
        field: 'brand',
      },
    }).then((data: string[]) => {
      const filteredData = data
        .filter((d) => d) // фильтруем пустые значения
        .reduce(
          // оставляем уникальные
          (res, cur) =>
            res.find((find) => find === cur) ? res : [...res, cur],
          [] as string[]
        );
      setBrands(filteredData);
    });
  }, []);

  useEffect(() => {
    setItems([]);
    setProducts([]);
    setLoading(true);

    if (filterValue) {
      getData({
        action: 'filter',
        params: {
          [fields[filter]]: filterValue,
        },
      }).then((ids) => {
        getData({
          action: 'get_items',
          params: { ids },
        })
          .then((data) => setProducts(data))
          .finally(() => setLoading(false));
      });
    } else {
      getData({
        action: 'get_ids',
        params: {
          offset: currentPage,
          limit: pageSize,
        },
      }).then((ids) => {
        getData({
          action: 'get_items',
          params: { ids },
        })
          .then((data) => setItems(data))
          .finally(() => setLoading(false));
      });
    }
  }, [currentPage, filter, filterValue, fields]);

  const uniqeItems = products.length
    ? getUniqeItems(products)
    : getUniqeItems(items);

  const onChangeFilter = (number: number, value: string | number) => {
    setFilter(number);
    setFilterValue(value);
    setCurrentPage(0);
  };

  const onChangeCurrentPage = (value: number) => {
    setItems([]);
    setCurrentPage((prev) => prev + value);
  };

  return (
    <>
      <Filters
        loading={loading}
        brands={brands}
        onChangeFilter={onChangeFilter}
      />
      <Table
        loading={loading}
        dataSource={uniqeItems}
        pagination={
          products.length
            ? {
                pageSize: pageSize,
                hideOnSinglePage: true,
                defaultCurrent: 1,
                showSizeChanger: false,
              }
            : false
        }
        className="content"
      >
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Название" dataIndex="product" key="product" />
        <Column title="Цена" dataIndex="price" key="price" />
        <Column title="Бренд" dataIndex="brand" key="brand" />
      </Table>
      {!products.length && (
        <Paginator
          loading={loading}
          currentPage={currentPage}
          filtered={!!filterValue}
          onChangeCurrentPage={onChangeCurrentPage}
        />
      )}
    </>
  );
}

export default App;
