const Firm=require('../models/firm');
const Vendor=require('../models/Vendor');
const multer=require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the folder to save images
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });
  const upload=multer({storage:storage});
  const addFirm=async(req,res)=>{
    try{
    const{firmName,area,category,region,offer}=req.body;
    const image=req.file? req.file.filename:undefined;
    const vendor=await Vendor.findById(req.vendorId);
    if(!vendor){
        res.status(404).json({message:"Vendor not found"});
    }
    const firm=new Firm({
        firmName,area,category,region,offer,image,vendor:vendor._id

    })
    const savedFirm=await firm.save();
    vendor.firm.push(savedFirm)
    await vendor.save()
    return res.status(200).json({mesage:"Firm added successfully"})
    }catch(error){
        console.error(error)
        res.status(500).json("Internal server error")

    }

}
const deleteFirmByID=async(req,res)=>{
  try{
    const firmId=req.params.firmId;
    const deletedFirm=await Firm.findByIdAndDelete(firmId);
    if(!deletedFirm)
    {
      return res.status(404).json({error:"No Firm found"})
    }
  }catch(error){
    console.error(error);

    res.status(500).json({error:"Internal server error "})


  }

}
module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}