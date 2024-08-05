const express = require("express"); // Import Express framework
const { authMiddleware } = require("../middleware/authMiddleware"); // Import authentication middleware
const {
  createResumeValidation,
  updateResumeValidation,
} = require("../middleware/validation/resumeValidation"); // Import resume validation rules
const { validationResult } = require("express-validator"); // Import express-validator for validation results
const resumeController = require("../controllers/resumeController"); // Import resume controller

const router = express.Router(); // Create a new router instance

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Create Resume
router.post(
  "/",
  createResumeValidation, // Apply validation rules for creating a resume
  (req, res, next) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Respond with errors if validation fails
    }
    next(); // Proceed to the next middleware or route handler
  },
  resumeController.createResume // Call the controller function to handle resume creation
);

// Get Resume by ID
router.get(
  "/:id",
  (req, res, next) => {
    // Validation for ID parameter
    if (!req.params.id) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Resume ID is required" }] });
    }
    next(); // Proceed to the next middleware or route handler
  },
  resumeController.getResumeById // Call the controller function to handle getting a resume by ID
);

// Update Resume
router.put(
  "/:id",
  updateResumeValidation, // Apply validation rules for updating a resume
  (req, res, next) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Respond with errors if validation fails
    }
    next(); // Proceed to the next middleware or route handler
  },
  resumeController.updateResume // Call the controller function to handle updating a resume
);

// Delete Resume
router.delete(
  "/:id",
  (req, res, next) => {
    // Validation for ID parameter
    if (!req.params.id) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Resume ID is required" }] });
    }
    next(); // Proceed to the next middleware or route handler
  },
  resumeController.deleteResume // Call the controller function to handle deleting a resume
);

module.exports = router; // Export the router
