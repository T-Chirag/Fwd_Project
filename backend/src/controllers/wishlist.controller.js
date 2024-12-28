import Wishlist from "../models/Wishlist";
import Item from "../models/ItemSchema.model.js";
import User from "../models/User.model.js";

export const create = async (req, res) => {
    try {
        const created = await new Wishlist(req.body);
        console.log(created);
        if (!created.user) {
            res.status(400).json({ message: "User is required" });
        }

        if (!created.item) {
            res.status(400).json({ message: "Item is required" });
        }

        await created.populate({ path: "item", populate: { path: "user", model: User } }).execPopulate();
        await created.save();
        res.status(201).json(created);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding item to wishlist, please try again later" });
    }
};

export const getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const { page, limit } = req.query;
        const skip = page && limit ? (parseInt(limit, 10) * (parseInt(page, 10) - 1)) : 0;
        const pageSize = limit ? parseInt(limit, 10) : 0;

        const result = await Wishlist.find({ user: id }).skip(skip).limit(pageSize).populate({ path: "item", populate: { path: "user", model: User } });
        const totalResults = await Wishlist.countDocuments({ user: id });

        res.set("X-Total-Count", totalResults);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching your wishlist, please try again later" });
    }
};

export const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Wishlist.findByIdAndUpdate(id, req.body, { new: true }).populate({ path: "item", populate: { path: "user", model: User } });
        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating your wishlist, please try again later" });
    }
};

export const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Wishlist.findByIdAndDelete(id);
        res.status(200).json(deleted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting that item from wishlist, please try again later" });
    }
};
