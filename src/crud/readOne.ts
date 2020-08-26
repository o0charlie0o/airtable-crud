export const readOne = async (
  airtable: any,
  table: string,
  id: string,
): Promise<{ id: string; fields: any }[]> => {
  const Table = airtable(table)

  return new Promise((resolve, reject) => {
    Table.find(id, (err: Error, record: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(record)
      }
    })
  })
}
