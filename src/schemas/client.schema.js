import mongoose from 'mongoose';

const clientSchemaDefinition = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    swagger: {
      type: 'string',
      format: 'email',
      description: 'La dirección de correo electrónico del cliente.',
    },
  },
  fullname: {
    type: String,
    required: true,
    swagger: {
      type: 'string',
      description: 'El nombre completo del cliente.',
    },
  },
  password: {
    type: String,
    swagger: {
      type: 'string',
      description: 'La contraseña del cliente.',
    },
  },
  phone: {
    type: String,
    swagger: {
      type: 'string',
      description: 'El número de teléfono del cliente.',
    },
  },
  address: {
    type: String,
    swagger: {
      type: 'string',
      description: 'La dirección del cliente.',
    },
  },
  photo_url: {
    type: String,
    default: 'https://res.cloudinary.com/dxq0pypxu/image/upload/v1696476957/nn12qmebo7v6qhbwbkdf.png',
    swagger: {
      type: 'string',
      description: 'URL de la foto del cliente.',
    },
  },
  isActive: {
    type: Boolean,
    default: true,
    swagger: {
      type: 'boolean',
      description: 'Indica si el cliente está activo o inactivo.',
    },
  },
  verificationCode: {
    type: Number,
  },
  verificationCodeExpires: {
    type: Date,
  },
});

// Función toJSON personalizada para excluir campos sensibles
clientSchemaDefinition.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.verificationCode;
  delete obj.verificationCodeExpires;

  return obj;
};

const Client = mongoose.model('Client', clientSchemaDefinition);

export default Client;
