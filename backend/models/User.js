// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schema per il modello User.
 * Include nome, email, password e ruolo.
 */
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      // I ruoli possibili sono "user" (default) e "admin"
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

/**
 * Hook pre-save per hashare la password.
 * Se la password è nuova o modificata, viene hashata prima di salvare.
 */
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Metodo per verificare la corrispondenza della password fornita con quella salvata.
 * @param {String} enteredPassword - La password in chiaro da confrontare.
 * @returns {Boolean} True se la password corrisponde, false altrimenti.
 */
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);