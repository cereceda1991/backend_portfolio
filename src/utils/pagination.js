// Utilidad de paginación genérica
export const paginate = async (model, page, limit, baseUrl) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Consulta para obtener el recuento total sin filtrar
  const totalResults = await model.countDocuments({});

  // Consulta para obtener los resultados paginados
  const results = await model.find({}).skip(startIndex).limit(limit);

  const response = {
    count: results.length,
    next: endIndex < totalResults ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
    previous: startIndex > 0 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
    results: results,
    total: totalResults,
  };

  return response;
};
