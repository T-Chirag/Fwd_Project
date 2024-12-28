//Create new item
const createItem = async (req, res) => {
  try {
    const { name, description, condition, category, price, image } = req.body;
    const owner = req.user._id;

    const newItem = new Item({
      name,
      description,
      condition,
      category,
      price,
      image,
      owner,
    });

    await newItem.save();

    res.status(201).json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all products with filters, sorting, and pagination
const getItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, condition, sortBy, sortOrder } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (condition) {
      query.condition = condition;
    }

    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "asc" ? 1 : -1;
    }

    const items = await Item.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("category", "name")
      .populate("owner", "name");

    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).populate("category", "name").populate("owner", "name");

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
    }
    catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
    }
};


// Update product by ID
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
    }
    catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
    }
}

// Restore (undelete) product by ID
const restoreItem = async (req, res) => {
  try {
    const { id } = req.params;
    const restoredItem = await Item.findByIdAndUpdate(id, { deletedAt: null }, { new: true });
    if (!restoredItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(restoredItem);
    }
    catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
    }
}

// Soft delete product by ID
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndUpdate(id, { deletedAt: Date.now() }, { new: true }).populate("category", "name").populate("owner", "name");
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
    }
    catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
    }
}
