const express=require('express')
const firmController=require('../controllers/firmController');
const verifyToken=require('../middlewares/verifyTokens');
const router=  express.Router()
router.post('/add-firm',verifyToken,firmController.addFirm);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(Path2D.join(__dirnamem,'..','uploads',imageName));
});
router.delete('/:firmId',firmController.deletedFirmById);
module.exports=router;