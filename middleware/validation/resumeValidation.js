
const { check, validationResult } = require('express-validator');

// Validation rules for creating a resume
exports.createResumeValidation = [
  // Basic Info
  check('basicInfo.firstName', 'First name is required').not().isEmpty(),
  check('basicInfo.lastName', 'Last name is required').not().isEmpty(),
  check('basicInfo.contact', 'Contact is required')
    .not().isEmpty()
    .isLength({ min: 10, max: 10 }).withMessage('Contact must be exactly 10 digits')
    .isNumeric().withMessage('Contact must be numeric'),
  check('basicInfo.address', 'Address is required').not().isEmpty(),
  check('basicInfo.email', 'Email is required').isEmail().withMessage('Invalid email format'),
  check('basicInfo.linkedin', 'LinkedIn profile URL is required')
    .not().isEmpty()
    .isURL().withMessage('Invalid LinkedIn URL format'),
  check('basicInfo.github', 'GitHub profile URL is required')
    .not().isEmpty()
    .isURL().withMessage('Invalid GitHub URL format'),
  check('basicInfo.objective', 'Objective is required').not().isEmpty(),

  // Education
  check('education.*.degree', 'Degree is required').not().isEmpty(),
  check('education.*.institute', 'Institute is required').not().isEmpty(),
  check('education.*.fieldOfStudy', 'Field of study is required').not().isEmpty(),
  check('education.*.location', 'Location is required').not().isEmpty(),
  check('education.*.startDate', 'Start date is required').isDate().withMessage('Invalid start date format'),
  check('education.*.endDate', 'End date is required').isDate().withMessage('Invalid end date format'),
  check('education.*.cgpa').optional().isDecimal().withMessage('Invalid CGPA format'),

  // Work Experience
  check('workExperience.*.company', 'Company name is required').not().isEmpty(),
  check('workExperience.*.designation', 'Designation is required').not().isEmpty(),
  check('workExperience.*.startDate', 'Start date is required').isDate().withMessage('Invalid start date format'),
  check('workExperience.*.endDate').optional().isDate().withMessage('Invalid end date format')
    .custom((value, { req }) => {
      if (value && value < req.body.workExperience.startDate) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  // Skills
  check('skills.technical', 'Technical skills are required').isArray({ min: 1 }).withMessage('At least one technical skill is required'),
  check('skills.soft', 'Soft skills are required').isArray({ min: 1 }).withMessage('At least one soft skill is required'),
  check('skills.additional').optional().isArray().withMessage('Additional skills must be an array'),

  // Achievements
  check('achievements').isArray().withMessage('Achievements must be an array')
    .custom((array) => array.length > 0).withMessage('At least one achievement is required'),

  // Projects
  check('projects').isArray().withMessage('Projects must be an array')
    .custom((array) => array.length > 0).withMessage('At least one project is required'),

  // Extracurricular
  check('extracurricular').isArray().withMessage('Extracurricular activities must be an array')
    .custom((array) => array.length > 0).withMessage('At least one extracurricular activity is required'),

  // Leadership
  check('leadership').isArray().withMessage('Leadership experiences must be an array')
    .custom((array) => array.length > 0).withMessage('At least one leadership experience is required'),
];

// Validation rules for updating a resume (if needed, can be similar to create)
exports.updateResumeValidation = [
  // Similar to createResumeValidation, but can be adjusted for update scenarios if needed
  check('basicInfo.firstName', 'First name is required').not().isEmpty(),
  check('basicInfo.lastName', 'Last name is required').not().isEmpty(),
  check('basicInfo.contact', 'Contact is required')
    .not().isEmpty()
    .isLength({ min: 10, max: 10 }).withMessage('Contact must be exactly 10 digits')
    .isNumeric().withMessage('Contact must be numeric'),
  check('basicInfo.address', 'Address is required').not().isEmpty(),
  check('basicInfo.email', 'Email is required').isEmail().withMessage('Invalid email format'),
  check('basicInfo.linkedin', 'LinkedIn profile URL is required')
    .not().isEmpty()
    .isURL().withMessage('Invalid LinkedIn URL format'),
  check('basicInfo.github', 'GitHub profile URL is required')
    .not().isEmpty()
    .isURL().withMessage('Invalid GitHub URL format'),
  check('basicInfo.objective', 'Objective is required').not().isEmpty(),

  // Education
  check('education.*.degree', 'Degree is required').not().isEmpty(),
  check('education.*.institute', 'Institute is required').not().isEmpty(),
  check('education.*.fieldOfStudy', 'Field of study is required').not().isEmpty(),
  check('education.*.location', 'Location is required').not().isEmpty(),
  check('education.*.startDate', 'Start date is required').isDate().withMessage('Invalid start date format'),
  check('education.*.endDate', 'End date is required').isDate().withMessage('Invalid end date format'),
  check('education.*.cgpa').optional().isDecimal().withMessage('Invalid CGPA format'),

  // Work Experience
  check('workExperience.*.company', 'Company name is required').not().isEmpty(),
  check('workExperience.*.designation', 'Designation is required').not().isEmpty(),
  check('workExperience.*.startDate', 'Start date is required').isDate().withMessage('Invalid start date format'),
  check('workExperience.*.endDate').optional().isDate().withMessage('Invalid end date format')
    .custom((value, { req }) => {
      if (value && value < req.body.workExperience.startDate) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  // Skills
  check('skills.technical', 'Technical skills are required').isArray({ min: 1 }).withMessage('At least one technical skill is required'),
  check('skills.soft', 'Soft skills are required').isArray({ min: 1 }).withMessage('At least one soft skill is required'),
  check('skills.additional').optional().isArray().withMessage('Additional skills must be an array'),

  // Achievements
  check('achievements').isArray().withMessage('Achievements must be an array')
    .custom((array) => array.length > 0).withMessage('At least one achievement is required'),

  // Projects
  check('projects').isArray().withMessage('Projects must be an array')
    .custom((array) => array.length > 0).withMessage('At least one project is required'),

  // Extracurricular
  check('extracurricular').isArray().withMessage('Extracurricular activities must be an array')
    .custom((array) => array.length > 0).withMessage('At least one extracurricular activity is required'),

  // Leadership
  check('leadership').isArray().withMessage('Leadership experiences must be an array')
    .custom((array) => array.length > 0).withMessage('At least one leadership experience is required'),
];

// Middleware to handle validation results
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};