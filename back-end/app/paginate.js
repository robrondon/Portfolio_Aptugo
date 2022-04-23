exports.paginate = (docs, options = {}) => {
  if (!options.page) options.page = 1
  if (!options.limit) options.limit = 10

  const fromDoc = (parseInt(options.page) - 1) * parseInt(options.limit)
  const toDoc = fromDoc + parseInt(options.limit)
  console.log(options, fromDoc, toDoc)
  return {
    docs: docs.slice(fromDoc, toDoc),
    hasNextPage: docs.length > toDoc,
    hasPrevPage: options.page > 1,
    limit: options.limit,
    nextPage: options.page + 1,
    page: options.page,
    pagingCounter: 1,
    prevPage: options.page > 1 ? options.page + 1 : null,
    totalDocs: docs.length,
    totalPages: Math.ceil(docs.length / options.limit),
  }
}
