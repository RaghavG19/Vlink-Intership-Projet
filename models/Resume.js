const mongoose = require("mongoose"); // Import Mongoose for MongoDB interactions

// Define the Resume schema with validation
const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "UserId name is required"],
    },
    basicInfo: {
      firstName: {
        type: String,
        required: [true, "First name is required"],
      },
      lastName: {
        type: String,
        required: [true, "Last name is required"],
      },
      contact: {
        type: String,
        required: [true, "Contact number is required"],
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v); // Ensure contact is exactly 10 digits long
          },
          message: (props) =>
            `${props.value} is not a valid contact number. It should be exactly 10 digits.`,
        },
      },
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        validate: {
          validator: function (v) {
            return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v); // Basic email validation
          },
          message: (props) => `${props.value} is not a valid email address`,
        },
      },
      linkedin: {
        type: String,
        required: [true, "LinkedIn profile URL is required"],
        validate: {
          validator: function (v) {
            return /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,7}\/[^\s]+$/.test(v); // Basic URL validation
          },
          message: (props) => `${props.value} is not a valid LinkedIn URL`,
        },
      },
      github: {
        type: String,
        required: [true, "GitHub profile URL is required"],
        validate: {
          validator: function (v) {
            return /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,7}\/[^\s]+$/.test(v); // Basic URL validation
          },
          message: (props) => `${props.value} is not a valid GitHub URL`,
        },
      },
      objective: {
        type: String,
        required: [true, "Objective is required"],
      },
    },
    education: [
      {
        degree: {
          type: String,
          required: [true, "Degree is required"],
          enum: ["Bachelor", "Master", "Class 12", "Class 10"], // Ensure valid degree
        },
        institute: {
          type: String,
          required: [true, "Institute is required"],
        },
        fieldOfStudy: {
          type: String,
          required: [true, "Field of study is required"],
        },
        location: {
          type: String,
          required: [true, "Location is required"],
        },
        startDate: {
          type: Date,
          required: [true, "Start date is required"],
        },
        endDate: {
          type: Date,
          required: [true, "End date is required"],
        },
        cgpa: {
          type: String,
          validate: {
            validator: function (v) {
              return /^(\d+(\.\d{1,2})?)?$/.test(v); // Basic validation for CGPA
            },
            message: (props) => `${props.value} is not a valid CGPA`,
          },
        },
      },
    ],
    workExperience: [
      {
        company: {
          type: String,
          required: [true, "Company name is required"],
        },
        designation: {
          type: String,
          required: [true, "Designation is required"],
        },
        startDate: {
          type: Date,
          required: [true, "Start date is required"],
        },
        endDate: {
          type: Date,
          validate: {
            validator: function (v) {
              return v === null || v > this.startDate; // End date must be after start date
            },
            message: "End date must be after start date",
          },
        },
      },
    ],
    skills: {
      technical: {
        type: [String],
      },
      soft: {
        type: [String],
      },
      additional: [String], // Optional additional skills
    },
    achievements: {
      type: [String],
    },
    projects: {
      type: [String],
    },
    extracurricular: {
      type: [String],
    },
    leadership: {
      type: [String],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Resume model using the schema
const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume; // Export the Resume model
