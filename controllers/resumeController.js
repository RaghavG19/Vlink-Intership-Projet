const Resume = require("../models/Resume");

// Create a new resume
exports.createResume = async (req, res) => {
  try {
    const resume = new Resume({
      user: req.user._id, // Associate resume with the authenticated user
      ...req.body, // Spread resume data from request body
    });

    await resume.save(); // Save resume to the database
    res.status(201).json(resume); // Respond with created resume
  } catch (err) {
    console.error("Error creating resume:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a resume by ID
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.find({ userId: req.params.id });
    if (!resume) {
      return res.status(201).json({ message: "Resume not found", data: [] });
    }
    console.log(resume);
    console.log(req.params.id);
    // if (resume.user.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ message: "Not authorized" });
    // }

    return res.status(200).json({ message: "Resume found", data: resume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a resume by ID
exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.find({ userId: req.params.id });
    if (!resume) {
      return res.status(201).json({ message: "Resume not found" });
    }

    // if (resume.user.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ message: "Not authorized" });
    // }

    // Update only specific fields
    const updatedFields = req.body;
    console.log(updatedFields);
    await Resume.findOneAndUpdate({ userId: req.params.id }, updatedFields, {
      new: true,
    });

    res.json(await Resume.findById(req.params.id)); // Respond with updated resume
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a resume by ID
exports.deleteResume = async (req, res) => {
  try {
    // Find the resume by userId
    const resume = await Resume.findOne({ userId: req.params.id });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    await Resume.deleteOne({ userId: req.params.id });

    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateResumeSection = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const resume = await Resume.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is run
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
