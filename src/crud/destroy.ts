const performDelete = async (
  airtable: any,
  table: string,
  records: string[],
): Promise<{ id: string; fields: any }[]> => {
  const Table = airtable(table)

  return new Promise((resolve, reject) => {
    Table.destroy(records, (err: Error, results: any[]) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const destroy = (
  airtable: any,
  table: string,
  records: string[],
): Promise<{ id: string; fields: any }[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let mutableRecords = [...records]
      let results: any[] = []

      while (mutableRecords.length > 0) {
        const deletedRecords = await performDelete(airtable, table, mutableRecords.slice(0, 10))
        mutableRecords = mutableRecords.slice(10)
        results = [...results, ...deletedRecords]
      }

      resolve(results)
    } catch (e) {
      reject(e)
    }
  })
}
