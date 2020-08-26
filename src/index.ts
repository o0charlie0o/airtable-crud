import Airtable from 'airtable'
import { create, destroy, read, readOne, update } from './crud'

type AirtableConfig = {
  apiKey: string
  base: string
}

class AirtableCRUD {
  config: AirtableConfig = {
    apiKey: '',
    base: '',
  }

  airtable: Airtable.Base | undefined = undefined

  constructor(config: AirtableConfig) {
    this.config = config
    this.airtable = new Airtable({ apiKey: config.apiKey }).base(config.base)
  }

  create = async ({ table, records }: { table: string; records: any[] }) => {
    return await create(this.airtable, table, records)
  }

  delete = async ({ table, ids }: { table: string; ids: string[] }) => {
    return await destroy(this.airtable, table, ids)
  }

  read = async ({
    table,
    filter,
    maxRecords,
    sort,
    fields,
    view,
  }: {
    table: string
    filter?: string
    maxRecords?: number
    sort?: any[]
    fields?: string[]
    view?: string
  }) => {
    return await read(this.airtable, table, filter, maxRecords, sort, fields, view)
  }

  readOne = async ({ table, id }: { table: string; id: string }) => {
    return await readOne(this.airtable, table, id)
  }

  update = async ({ table, records }: { table: string; records: any[] }) => {
    return await update(this.airtable, table, records)
  }
}

export default AirtableCRUD
