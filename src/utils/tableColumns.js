// create a function that takes in formFields and returns columns for the DataTable
export function tableColumns(formFields) {
  const columns = []
  formFields.forEach(field => {
    // if column is 0 or column not exists, then dont add to columns
    if (field.column === 0 || field.colomn === undefined) return
    columns.push({ field: field.key, title: field.label, sortable: true })
  })
  return columns
}