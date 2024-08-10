// FilterBar.tsx
import React, { FC, useState, useEffect } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { Form, Spinner } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';
import useFetch from '../../hooks/UseFetch';
import styles from './FilterBar.module.css'


export const FilterBar: FC = () => {
  const { setUsers } = useUserContext();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKey, setSearchKey] = useState<string>('');
  const [url, setUrl] = useState<string | null>(null);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('');
  const [limit, setLimit] = useState<string>('5');

  //debounce для input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let formattedSearchValue
      if (searchKey !== 'gender') {
        formattedSearchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1).toLowerCase();
      } else {
        formattedSearchValue = searchValue
      }

      setDebouncedSearchValue(formattedSearchValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchValue, 500]);

// запросы (для всей таблицы)
  useEffect(() => {
    if (searchKey && debouncedSearchValue) {
      setUrl(`https://dummyjson.com/users/filter?key=${searchKey}&value=${debouncedSearchValue}`);
    } else if ((!debouncedSearchValue || !searchKey) && limit != 'all') {
      setUrl(`https://dummyjson.com/users?limit=${limit}&select=firstName,lastName,maidenName,gender,age,phone,address`);
    }
    else if ((!debouncedSearchValue || !searchKey) && limit === 'all') {
      setUrl(`https://dummyjson.com/users?select=firstName,lastName,maidenName,gender,age,phone,address`);
    }
  }, [searchKey, debouncedSearchValue, limit]);

  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      if ('users' in data && Array.isArray(data.users)) {
        setUsers(data.users);
      }
    }
  }, [data, setUsers]);



  if (loading) return (
    <Spinner></Spinner>
  )
  if (error instanceof Error) return (
    <h2>Fetch ERROR: {error.message}</h2>
  )
  

  return (
    <>
      <div className={styles.FilterBarTitle}>
        <h4>Для поиска по ключу необходимо вводить полное значение</h4>

      </div>

      <Form.Group controlId="limitSelect">
        <Form.Label>Кол-во строк таблицы</Form.Label>
        {!searchKey && (
          <Form.Select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="mb-2"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="all">загрузить всё</option>
          </Form.Select>
        )}
      </Form.Group>


      <Form.Select
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        className='mb-2'
      >
        <option value="">Выберите ключ</option>
        <option value="firstName">Имя</option>
        <option value="lastName">Фамилия</option>
        <option value="maidenName">Отчество</option>
        <option value="gender">Пол</option>
        <option value="age">Возраст</option>
        <option value="phone">Телефон</option>
        <option value="address.city">Город</option>
        <option value="address.address">Улица</option>
      </Form.Select>
      {searchKey && searchKey !== 'gender' && (
        <MDBInput
          label="Поиск по значению"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      )}
      {searchKey === 'gender' && (
        <Form.Select
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        >
          <option value="">Выберите пол</option>
          <option value="male">Муж.</option>
          <option value="female">Жен.</option>

        </Form.Select>
      )}
    </>
  );
};
