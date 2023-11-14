import { body, validationResult } from 'express-validator';

export const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = {};

    errors.array().forEach((error) => {
      const fieldName = error.path;
      let errorMessage = error.msg;

      if (!errorMessages[fieldName]) {
        errorMessages[fieldName] = [];
      }

      errorMessages[fieldName].push(errorMessage);
    });

    const groupedErrors = Object.keys(errorMessages).reduce((acc, key) => {
      acc[key] = errorMessages[key];
      return acc;
    }, {});

    return res.status(400).json({
      status: 'fail',
      errors: groupedErrors,
    });
  }

  next();
};

// Función para generar reglas de validación dinámica.
export const generateValidationRules = (entityName, fields) => {
  const validationRules = [];

  for (const fieldName in fields) {
    if (Object.hasOwnProperty.call(fields, fieldName)) {
      const fieldConfig = fields[fieldName];

      const fieldValidationRules = Object.entries(fieldConfig).map(([ruleName, ruleOptions]) => {
        const { validator, errorMessage } = validationConfig[ruleName];
        return validator(fieldName, ruleOptions).withMessage(errorMessage(fieldName, ruleOptions));
      });

      validationRules.push(...fieldValidationRules);
    }
  }

  validationRules.push(validFields);

  return validationRules;
};

export const validationConfig = {
  //Reglas Nativas de Express
  notEmpty: {
    validator: (fieldName) => body(fieldName).notEmpty(),
    errorMessage: () => `This is a required field. Please provide a value.`,
  },
  isLength: {
    validator: (fieldName, options) => body(fieldName).isLength(options),
    errorMessage: (fieldName, options) => `Must be between ${options.min} and ${options.max} characters.`,
  },
  isEmail: {
    validator: (fieldName) => body(fieldName).isEmail(),
    errorMessage: () => `Invalid email address. Please enter a valid one.`,
  },
  isURL: {
    validator: (fieldName) => body(fieldName).isURL(),
    errorMessage: () => `The field must be a valid URL.`,
  },
  isNumeric: {
    validator: (fieldName) => body(fieldName).isNumeric(),
    errorMessage: () => `The field must be a number.`,
  },
  isInt: {
    validator: (fieldName) => body(fieldName).isInt(),
    errorMessage: () => `The field must be an integer.`,
  },
  isFloat: {
    validator: (fieldName) => body(fieldName).isFloat(),
    errorMessage: () => `The field must be a decimal number.`,
  },
  isBoolean: {
    validator: (fieldName) => body(fieldName).isBoolean(),
    errorMessage: () => `The field must be a boolean value (true or false).`,
  },
  isDate: {
    validator: (fieldName) => body(fieldName).isISO8601(),
    errorMessage: () => `The field must be a valid date.`,
  },
  isAfter: {
    validator: (fieldName, date) => body(fieldName).isAfter(date),
    errorMessage: () => `The field must be a date later than the provided date.`,
  },
  isBefore: {
    validator: (fieldName, date) => body(fieldName).isBefore(date),
    errorMessage: () => `The field must be a date earlier than the provided date.`,
  },
  isMongoId: {
    validator: (fieldName) => body(fieldName).isMongoId(),
    errorMessage: () => `The field must be a valid MongoDB ObjectId.`,
  },

  // Agrega más reglas de validación nativas aquí...

  //Reglas Personalizadas
  notEmptyFile: {
    validator: (fieldName) =>
      body(fieldName).custom((value, { req }) => {
        if (!req.file) {
          throw new Error(`The ${fieldName} field is required.`);
        }
        return true;
      }),
    errorMessage: () => `The field is required.`,
  },
  isImage: {
    validator: (fieldName) =>
      body(fieldName).custom((value, { req }) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (req.file) {
          if (!allowedMimeTypes.includes(req.file.mimetype)) {
            throw new Error(`The file must be an image (JPEG or PNG).`);
          }
        }
        return true;
      }),
    errorMessage: () => `The file must be an image (JPEG or PNG).`,
  },

  password: {
    validator: (fieldName) =>
      body(fieldName).custom((value) => {
        // Define los caracteres especiales permitidos
        const specialChars = '!#$%&()*+/-?@[]^_{|}';

        // Define las reglas de validación personalizadas aquí
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = [...specialChars].some((char) => value.includes(char));

        if (!(hasUppercase && hasLowercase && hasNumber && hasSpecialChar)) {
          throw new Error(
            `The field must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character`,
          );
        }

        return true;
      }),
    errorMessage: () => `The field must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character`,
  },

  OnlyLetters: {
    validator: (fieldName) =>
      body(fieldName).custom((value) => {
        // Define la expresión regular para validar nombres que solo contienen letras y espacios
        const regex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s.]+$/;

        if (!regex.test(value)) {
          throw new Error(`Invalid characters. Use only letters, spaces, or hyphens.`);
        }

        return true;
      }),
    errorMessage: () => `Invalid characters. Use only letters, spaces, or hyphens.`,
  },

  // Agrega más reglas de validación personalizadas aquí...
};
