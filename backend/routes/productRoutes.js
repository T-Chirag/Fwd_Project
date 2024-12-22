// Get Products Listed by a Specific User
router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const products = await Product.find({ listedBy: userId });
    res.json(products);
  });
  
  // Update a Product by ID
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedProduct);
  });
  
  // Delete a Product by ID
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully!" });
  });
  