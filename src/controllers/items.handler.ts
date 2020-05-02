import { Request, Response, NextFunction } from 'express';
import { GroceryList } from '../entities/GroceryList';
import { Item } from '../entities/Item';

export const showAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const list = await GroceryList.findOne({
      where: { id },
      relations: ['items'],
    });

    res.json(list?.items);
  } catch (err) {
    next(err);
  }
};

export const showItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findOne({ where: { id: itemId } });

    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    let item = await Item.create({ ...req.body } as Object);
    item = await item.save();
    const list = await GroceryList.findOne({
      where: { id },
      relations: ['items'],
    });
    list?.items.push(item);
    await list?.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId } = req.params;
    const item = (await Item.findOne({ where: { id: itemId } })) as Item;
    item.name = req.body.name;
    item.save();

    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId } = req.params;
    const item = (await Item.findOne({ where: { id: itemId } })) as Item;

    await item.remove();

    res.json(item);
  } catch (err) {
    next(err);
  }
};
