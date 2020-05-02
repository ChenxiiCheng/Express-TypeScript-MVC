import { Request, Response, NextFunction } from 'express';
import {} from 'typeorm';
import { GroceryList } from '../entities/GroceryList';

export const showAllGroceries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const groceries: GroceryList[] = await GroceryList.find({
      relations: ['items'],
    });
    return res.status(200).json(groceries);
  } catch (err) {
    next(err);
  }
};

export const showOneGroceries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const grocery: GroceryList | undefined = await GroceryList.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!grocery) {
      throw new Error(`Grocery List doesn't exist`);
    }

    return res.status(200).json(grocery);
  } catch (err) {
    next(err);
  }
};

export const createNewGroceries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const grocery: GroceryList = await GroceryList.create({
      ...req.body,
    } as Object);
    await grocery.save();

    return res.status(201).json(grocery);
  } catch (err) {
    next(err);
  }
};

export const updateGroceries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const grocery: GroceryList | undefined = await GroceryList.findOne({
      where: { id },
      relations: ['items'],
    });

    if (grocery) {
      grocery.name = req.body.name;
      await grocery.save();

      return res.status(200).json(grocery);
    } else {
      return res.status(400).json({ message: 'not found' });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteGroceries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const grocery: GroceryList | undefined = await GroceryList.findOne({
      where: { id },
      relations: ['items'],
    });

    if (grocery) {
      await grocery.remove();
      return res.status(200).json(grocery);
    }
  } catch (err) {
    next(err);
  }
};
