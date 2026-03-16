const express = require('express');
const router = express.Router();

const Product = require('../models/Products');
const upload = require('../middlewares/upload');

/* ---------------- ADD PRODUCT ---------------- */

router.post('/', upload.single('image'), async (req, res) => {
  try {

    console.log(req.body);

    const {name, category, price, quantity, description } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const product = await Product.create({
      name,
      category,
      price,
      quantity,
      description,
      image
    });

    res.status(201).json({
      message: "Product added successfully",
      product
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ---------------- GET DEALER PRODUCTS ---------------- */

// router.get('/dealer/:dealerId', async (req, res) => {
//   try {

//     const dealerId = req.params.dealerId;

//     const products = await Product.find({ dealer: dealerId })
//       .sort({ createdAt: -1 });

//     res.json(products);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


/* ---------------- UPDATE PRODUCT ---------------- */

router.put('/:id', upload.single('image'), async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, category, price, quantity, description } = req.body;

    if (name) product.name = name;
    if (category) product.category = category;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;
    if (description) product.description = description;

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    await product.save();

    res.json({
      message: "Product updated successfully",
      product
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ---------------- DELETE PRODUCT ---------------- */

router.delete('/:id', async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;