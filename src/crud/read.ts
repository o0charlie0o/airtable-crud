export const read = async (
  airtable: any,
  table: string,
  filter: string,
): Promise<{ id: string; fields: any }[]> => {
  const Table = airtable(table)
  const results: any[] = []

  return new Promise((resolve) => {
    Table.select({
      filterByFormula: filter,
    }).eachPage(
      (records: any[], fetchNextPage: any) => {
        results.push(...records)
        fetchNextPage()
      },
      (err: Error) => {
        if (err) {
          resolve(undefined)
        } else {
          if (results.length > 0) {
            resolve(results)
          } else {
            resolve(undefined)
          }
        }
      },
    )
  })
}
