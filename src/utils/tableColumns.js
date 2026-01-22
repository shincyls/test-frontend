// create a function that takes in formFields and returns columns for the DataTable
export function tableColumns(formFields) {
  const columns = []
  formFields.forEach(field => {
    // if column is 0 or column not exists, then dont add to columns
    if (field.column === 0 || field.column === undefined) return
    columns.push({
      field: field.key,
      title: field.label,
      sortable: true,
      format: field.format // Pass the format function if it exists
    })
  })
  return columns
}

// Helper function to format a value using the field's format function
export function formatValue(value, field) {
  if (field.format && typeof field.format === 'function') {
    return field.format(value)
  }
  return value ?? '-'
}