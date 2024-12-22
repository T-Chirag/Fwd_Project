

const asyncHandler = (requestHandler) => async(err,req,res,next) =>{
    try{
        await requestHandler(err,req,res,next)
    }catch(e){
        res.status(e.code || 500).json({
            success:false,
            message :e.message
        }) 

        
    }
}


export {asyncHandler}

