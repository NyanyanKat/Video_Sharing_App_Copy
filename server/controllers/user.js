import User from "../models/User.js";
import { createError } from "../error.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json(`User with id ${req.user.id} has been deleted`);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only delete your account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribeUser = async (req, res, next) => {
  try {
    //req.user.id is your user ID
    //req.params.id is the ID of the user's channel you subscribe to
    await User.findById(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription Successful!")
  } catch (err) {
    next(err);
  }
};

export const unSubscribeUser = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscription Successful!");
  } catch (err) {
    next(err);
  }
};

export const likeVideo = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const dislikeVideo = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
