import reviewSchema, { find, findByIdAndUpdate, findByIdAndDelete } from "../models/review.model.js";

export async function create(req,res){
    try {
        console.log(req.body);
        const created=await new reviewSchema(req.body).populate({ path: 'user', select: "-password" }).execPopulate();
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        return res.status(500).json({message:'Error posting review, please try again later'})
    }
}

export async function getByProductId(req,res){
    try {
        const { id } = req.params
        let skip=0
        let limit=0

        if (req.query.page && req.query.limit) {
            const { limit: pageSize } = req.query;
            const { page } = req.query;

            skip=pageSize*(page-1)
            limit=pageSize
        }
        const totalDocs=await reviewSchema.find({product:id}).countDocuments().exec();
        const result=await reviewSchema.find({product:id}).skip(skip).limit(limit).populate({path:'user',select:"-password"}).exec();

        
        res.set("x-total-count",totalDocs);
        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting reviews for this product, please try again later'})
    }
}

export async function updateById(req,res){
    try {
        const {id}=req.params
        const updated=await findByIdAndUpdate(id,req.body,{new:true})
        console.log(updated);
        if (!updated) {
            return res.status(404).json({message:'Review not found'})
        }
        await updated.populate('user').execPopulate()
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating review, please try again later'})
    }
}

export async function deleteById(req,res){
    try {
        const {id}=req.params;
        const deleted=await findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting review, please try again later'})
    }
}