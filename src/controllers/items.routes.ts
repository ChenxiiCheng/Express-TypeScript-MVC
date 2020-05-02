import { Router } from 'express';
import {
  showAllItems,
  createItem,
  deleteItem,
  updateItem,
} from './items.handler';

export const router = Router({ mergeParams: true });

router.route('/').get(showAllItems).post(createItem);

router.route('/:itemId').get(showAllItems).put(updateItem).delete(deleteItem);
