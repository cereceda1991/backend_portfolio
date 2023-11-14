import mongoose from 'mongoose';

const imageSchemaDefinition = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    swagger: {
      type: 'string',
      description: 'ID del usuario al que pertenece la imagen.',
    },
  },
  public_id: {
    type: String,
    required: true,
    swagger: {
      type: 'string',
      description: 'El public_id de Cloudinary de la imagen.',
    },
  },
  photo_url: {
    type: String,
    required: true,
    swagger: {
      type: 'string',
      description: 'La URL de la imagen almacenada en Cloudinary.',
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
    swagger: {
      type: 'string',
      format: 'date-time',
      description: 'Fecha y hora de creación de la imagen.',
    },
  },
});

const Image = mongoose.model('Image', imageSchemaDefinition);

export default Image;
