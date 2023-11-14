// Función de utilidad para enviar respuestas JSON con una estructura común siguiendo Restful
export const sendResponse = (res, status, message, data) => {
  const response = {
    status: 'success',
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  res.status(status).json(response);
};
