const performUpdate = async (
  airtable: any,
  table: string,
  records: any[],
): Promise<{ id: string; fields: any }[]> => {
  const Table = airtable(table)

  return new Promise((resolve, reject) => {
    Table.update(records, (err: Error, results: any[]) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const update = async (
  airtable: any,
  table: string,
  records: any[],
): Promise<{ id: string; fields: any }[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let mutableRecords = [...records]
      let results: any[] = []

      while (mutableRecords.length > 0) {
        const newRecords = await performUpdate(airtable, table, mutableRecords.slice(0, 10))
        mutableRecords = mutableRecords.slice(10)
        results = [...results, ...newRecords]
      }

      resolve(results)
    } catch (e) {
      reject(e)
    }
  })
}
