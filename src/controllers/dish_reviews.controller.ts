import { NextFunction, Request, Response } from "express";
import { dishReviewService } from "../service";
import { UserAttributes } from "../typings/express";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rating, comment, dishId } = req.body;
    const userId = (req.user as UserAttributes).id;
    const review = await dishReviewService.createReview(
      rating,
      comment,
      dishId,
      userId
    );
    res.status(201).json({
      data: review,
      message: "Review create successful",
      error: null,
      code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const getReviewsByDish = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { dishId } = req.params;
    const userId = (req.user as UserAttributes).id;
    const reviews = await dishReviewService.getReviewsByDishId(dishId);
    res.status(200).json({
      data: reviews,
      message: "Reviews fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

export default { createReview, getReviewsByDish };
