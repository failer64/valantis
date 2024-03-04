import { FC, useState } from 'react';
import { Input, Radio, RadioChangeEvent, Select, Space } from 'antd';
import ButtonsBlock from './ButtonsBlock';
import { Header } from 'antd/es/layout/layout';

type Props = {
  brands: string[];
  loading: boolean;
  onChangeFilter: (number: number, value: string | number) => void;
};

const Filters: FC<Props> = ({ brands, loading, onChangeFilter }) => {
  const [number, setNumber] = useState(0);
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState(0);
  const [select, setSelect] = useState<string | undefined>(undefined);

  const options = brands.map((b) => ({ label: b, value: b }));

  const onChange = (e: RadioChangeEvent) => {
    setNumber(e.target.value);
    setProduct('');
    setPrice(0);
    setSelect(undefined);
  };

  const onHandleChangeFilter = (value: string | number) => {
    onChangeFilter(number, value);
  };

  const onRemoveFilter = () => {
    setProduct('');
    setPrice(0);
    setSelect(undefined);
  };

  return (
    <Header className="header">
      <Radio.Group disabled={loading} onChange={onChange} value={number}>
        <Space direction="vertical">
          <Radio value={0} className="option">
            Название
            {number === 0 && (
              <>
                <Input
                  disabled={loading}
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  style={{ width: 300, margin: '0 10px' }}
                />
                <ButtonsBlock
                  loading={loading}
                  value={product}
                  changeFilter={onHandleChangeFilter}
                  removeFilter={onRemoveFilter}
                />
              </>
            )}
          </Radio>
          <Radio value={1} className="option">
            Цена
            {number === 1 && (
              <>
                <Input
                  disabled={loading}
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                  style={{ width: 300, margin: '0 10px' }}
                />
                <ButtonsBlock
                  value={price}
                  loading={loading}
                  changeFilter={onHandleChangeFilter}
                  removeFilter={onRemoveFilter}
                />
              </>
            )}
          </Radio>
          <Radio value={2} className="option">
            Бренд
            {number === 2 && (
              <>
                <Select
                  value={select}
                  style={{ width: 300, margin: '0 10px' }}
                  onChange={setSelect}
                  disabled={loading}
                  placeholder={'Выберите фильтр'}
                  allowClear
                  showSearch={false}
                  options={options}
                />
                <ButtonsBlock
                  value={select ?? ''}
                  loading={loading}
                  changeFilter={onHandleChangeFilter}
                  removeFilter={onRemoveFilter}
                />
              </>
            )}
          </Radio>
        </Space>
      </Radio.Group>
    </Header>
  );
};

export default Filters;
