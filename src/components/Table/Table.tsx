import React, { FC, useRef } from 'react';
import { FaArrowUp, FaArrowDown} from 'react-icons/fa';
import { useUserContext } from '../../context/UserContext';
import { useTable, useResizeColumns, useSortBy, } from 'react-table';
import styles from './Table.module.css';
//типы
import { Column, TableData, TableProps, sortTypes } from './types';

//определение колонок
export const columns: Column<TableData>[] = [
  { Header: '№', accessor: 'id', disableSortBy: true, width: 51, minWidth: 50},
  { Header: 'ФИО', accessor: 'fullName', sortType: 'string', minWidth: 50, },
  { Header: 'ВОЗРАСТ', accessor: 'age', sortType: 'number', minWidth: 50, },
  { Header: 'ПОЛ', accessor: 'gender', minWidth: 50, },
  { Header: 'НОМЕР ТЕЛ.', accessor: 'phone', disableSortBy: true, minWidth: 50, },
  { Header: 'АДРЕС', accessor: 'address', sortType: 'string', minWidth: 50 }
]


export const Table: FC<TableProps> = ({ handleModal }) => {
  const { users } = useUserContext();

  //данные для таблицы
  const data = React.useMemo(
    () =>
      users.map((user) => ({
        id: user.id,
        fullName: `${user.firstName} ${user.lastName} ${user.maidenName}`,
        age: user.age,
        gender: user.gender,
        phone: user.phone,
        address: `${user.address.city}, ${user.address.address}`,
      })),
    [users]
  );
  const autoResetResize = useRef(false);

  // экземпляр таблицы
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      sortTypes,
      autoResetResize: autoResetResize.current,
    },
    useSortBy,
    useResizeColumns
  );

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((hG) => (
          <tr {...hG.getHeaderGroupProps()}>
            {hG.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  minWidth: 50,
                  padding: '5px',
                  width: column.width,
                  resize: 'horizontal',
                  overflow: 'hidden',
                }}
              >
                  <div
                    {...column.getResizerProps()}
                    className={styles.Resize}
                    style={{
                      userSelect: 'none',
                    }}
                  />
                <div
                style={{  ...(column.disableSortBy && { pointerEvents: 'none' }),}}
                  className={styles.TableTitle}
                >
                  <h6>{column.render('Header')}</h6>
                  <div className={styles.arrowIcons}>
                    {column.isSorted && !column.isSortedDesc && <FaArrowUp />}
                    {column.isSorted && column.isSortedDesc && <FaArrowDown />}
                  </div>
                </div>

              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr 
            {...row.getRowProps()} 
            onClick={() => {
              handleModal(row.original.id, true)
            }} 
            className={styles.TableTr}
            style={{ cursor: 'pointer' }}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
