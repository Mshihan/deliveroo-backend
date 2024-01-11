import { CustomError } from "../middleware/error.middleware";
import { Dish, DishRating, User } from "../model";

const createReview = async (
  rating: number,
  comment: string,
  dishId: string,
  userId: string
) => {
  try {
    const review = await DishRating.create({ rating, comment, dishId, userId });

    return review;
  } catch (error) {
    throw new CustomError("Dish rating Error", 400);
  }
};

const getReviewsByDishId = async (dishId: string) => {
  try {
    const reviews = await DishRating.findAll({
      where: { dishId },
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Dish,
          as: "dish",
        },
      ],
    });
    return reviews;
  } catch (error) {
    throw new CustomError("Review fetch error", 400);
  }
};

const updateReview = async (
  reviewId: number,
  rating: number,
  comment: string
) => {
  try {
    const review = await DishRating.findByPk(reviewId);
    if (!review) {
      throw new CustomError("Review not found", 404);
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    return review;
  } catch (error) {
    throw new CustomError("Review update failed", 400);
  }
};

const deleteReview = async (reviewId: number) => {
  try {
    const review = await DishRating.findByPk(reviewId);
    if (!review) {
      throw new CustomError("Review not found", 404);
    }

    await review.destroy();
    return { message: "Review deleted successfully" };
  } catch (error) {
    throw new CustomError("Review delete failed", 404);
  }
};

export default {
  createReview,
  getReviewsByDishId,
  updateReview,
  deleteReview,
};
