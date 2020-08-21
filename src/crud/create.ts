const performCreate = async (
  airtable: any,
  table: string,
  records: any[],
): Promise<{ id: string; fields: any }[]> => {
  const Table = airtable(table)

  return new Promise((resolve, reject) => {
    Table.create(records, { typecast: true }, (err: Error, results: any[]) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const create = async (
  airtable: any,
  table: string,
  records: any[],
): Promise<{ id: string; fields: any }[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let mutableRecords = [...records]
      let results: any[] = []

      while (mutableRecords.length > 0) {
        const newRecords = await performCreate(airtable, table, mutableRecords.slice(0, 10))
        mutableRecords = mutableRecords.slice(10)
        results = [...results, ...newRecords]
      }

      resolve(results)
    } catch (e) {
      reject(e)
    }
  })
}
