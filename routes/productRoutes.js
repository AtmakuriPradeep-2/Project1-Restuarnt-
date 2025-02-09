const express = require('express');
const path = require("path");  // Import path module
const productController = require("../controllers/productController");

const router = express.Router();

router.post('/add-product/:firmId', productController.addProduct);
router.get('/:firmId/products', productController.getProductByFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.setHeader('Content-Type', 'image/jpeg');  // Corrected this line
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));  // Fixed __dirname and Path2D error
});

router.delete('/:productId', productController.deleteProductById);  // Corrected function name

module.exports = router;
