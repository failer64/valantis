import { useEffect, useState } from 'react';
import './App.css';
import { BodyType, appAPI } from './api';
import { getUniqeItems } from './helpers';
import { Card, Select, Table, TableColumnsType } from 'antd';
//import Paginator from './components/Paginator';

export interface Items {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

const columns: TableColumnsType<Items> = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Название',
    dataIndex: 'product',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
  },
  {
    title: 'Бренд',
    dataIndex: 'brand',
  },
];

const filtersArr = [
  { value: 'product', label: 'По названию' },
  { value: 'price', label: 'По цене' },
  { value: 'brand', label: 'По бренду' },
];

function App() {
  const [ids, setIds] = useState<string[]>([]);
  const [items, setItems] = useState<Items[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  //const [total, setTotal] = useState(0);
  //const [current, setCurrent] = useState(1);
  //const [size, setSize] = useState(50);
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 50,
    //total: total,
  });

  useEffect(() => {
    const body: BodyType = {
      action: 'get_ids',
      params: { offset: 0 },
    };

    appAPI.getProductIds(body).then((res) => {
      //setTotal(res.length);
      setIds(res);
    });
  }, []);

  useEffect(() => {
    const body: BodyType = {
      action: 'get_items',
      params: { ids: [...ids] },
    };
    setLoading(true);
    appAPI
      .getItems(body)
      .then((res) => setItems(getUniqeItems(res)))
      .finally(() => setLoading(false));
  }, [ids]);

  const handleTableChange = (pagination: Pagination) => {
    setPagination({
      ...pagination,
    });
  };

  //   const onPageChanged = (pageNumber: number) => {
  //     setCurrent(pageNumber);
  //   };

  const handleSelectChange = (value: any) => {
    setFilter(value);
  };

  return (
    <Card className="content" bordered={false}>
      <Table
        bordered={false}
        rowKey={(row) => row.id}
        columns={columns}
        dataSource={items}
        loading={loading}
        onChange={handleTableChange}
        pagination={pagination}
        className="table"
      />
      <Select
        //value={filter}
        defaultValue={filter}
        style={{ width: '100% ' }}
        onChange={handleSelectChange}
        options={filtersArr}
        disabled={loading || items.length < 1}
        placeholder={'Выберите фильтр'}
        allowClear
        showSearch={false}
      />
    </Card>
  );
}

export default App;
