import mongoose from 'mongoose';

const appointmentSchemaDefinition = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    swagger: {
      type: 'string',
      description: 'Fecha de la cita',
      format: 'date',
    },
  },
  start_time: {
    type: Date,
    required: true,
    swagger: {
      type: 'string',
      description: 'Hora de inicio de la cita',
      format: 'time',
    },
  },
  end_time: {
    type: Date,
    required: true,
    swagger: {
      type: 'string',
      description: 'Hora de finalización de la cita',
      format: 'time',
    },
  },
  reason: {
    type: String,
    required: true,
    swagger: {
      type: 'string',
      description: 'Motivo de la cita',
    },
  },
  notes: {
    type: String,
    required: true,
    swagger: {
      type: 'string',
      description: 'Notas adicionales sobre la cita',
    },
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
    swagger: {
      type: 'string',
      description: 'ID de la mascota relacionada con la cita',
    },
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    swagger: {
      type: 'string',
      description: 'ID del cliente relacionado con la cita',
    },
  },
  veterinarianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinarian',
    required: true,
    swagger: {
      type: 'string',
      description: 'ID del veterinario relacionado con la cita',
    },
  },
  isActive: {
    type: Boolean,
    default: true,
    swagger: {
      type: 'boolean',
      description: 'Indica si la cita está activa o inactiva',
    },
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchemaDefinition);

export default Appointment;
