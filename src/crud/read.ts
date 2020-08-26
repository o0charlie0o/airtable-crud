import { omitBy, isNil } from 'lodash'

export const read = async (
  airtable: any,
  table: string,
  filterByFormula?: string,
  maxRecords?: number,
  sort?: any[],
  fields?: string[],
  view?: string,
): Promise<{ id: string; fields: any }[]> => {
  const Table = airtable(table)
  const results: any[] = []
  const options: any = omitBy({ filterByFormula, maxRecords, sort, fields, view }, (o) => isNil(o))

  return new Promise((resolve, reject) => {
    Table.select(options).eachPage(
      (records: any[], fetchNextPage: any) => {
        results.push(...records)
        fetchNextPage()
      },
      (err: Error) => {
        if (err) {
          reject(err)
        } else {
          if (results.length > 0) {
            resolve(results)
          } else {
            resolve([])
          }
        }
      },
    )
  })
}
