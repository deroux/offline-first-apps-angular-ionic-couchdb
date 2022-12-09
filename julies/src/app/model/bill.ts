import { ConsumedProduct } from './productsConsumed';

export class BillDoc {
  _id: string = '';
  _rev?: string = '';
  type: string = 'bill';
  table: string = '';
  datetime: string = '';
  paid: Array<ConsumedProduct> = [];
}
