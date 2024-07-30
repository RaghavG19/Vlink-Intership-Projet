
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
 
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return isEmail(v);
      },
      message: props => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
}, {
  timestamps: true,
});
 
// Virtual field for confirm password
userSchema.virtual('confirmPassword')
  .get(function() {
    return this._confirmPassword;
  })
  .set(function(value) {
    this._confirmPassword = value;
  });
 
// Pre-save middleware to check if passwords match
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Passwords do not match');
    }
 
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});
 
// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;