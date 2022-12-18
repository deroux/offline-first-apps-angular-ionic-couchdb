import { v4 as uuidv4 } from 'uuid';

export class TableDoc {
  _id: string = uuidv4();
  _rev: string = '';
  type: string = 'table';
  table: Table = new Table();
}

export class Table {
  id: string = '';
  guests: number = 0;
  state: string = 'free';
}
