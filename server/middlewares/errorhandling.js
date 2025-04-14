
function errorhandling(err,req,res,next){
const scode=err.status || 500

    res.status(500).json({
        message:err.message,
        status:scode,
        success:false
    })
}

module.exports=errorhandling