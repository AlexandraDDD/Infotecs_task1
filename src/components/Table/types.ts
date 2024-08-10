
import { SortByFn, Column as ReactTableColumn } from 'react-table';

export interface TableProps {
    handleModal: (Id: number, show: boolean) => void;
}

export type Column<T extends object> = ReactTableColumn<T> & {
    canResize?: boolean;
};

export type TableData = {
    id: number;
    fullName: string;
    age: number;
    gender: string;
    phone: string;
    address: string;

};
// типы сортировки
export const sortTypes: Record<string, SortByFn<TableData>> = {
    string: (rowA, rowB, columnId, desc) => {
      const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [
        string,
        string
      ]
      return a.localeCompare(b, 'en')
    },
    number: (rowA, rowB, columnId, desc) => {
      const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [
        number,
        number
      ]
      return a - b
    }
  }