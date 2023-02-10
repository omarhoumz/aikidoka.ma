import { extractAikidokaEntries, fetchGraphQL } from './utils'

export type DanType = {
  name: string
}
export type AIKIDOKA_TYPE = {
  sys: {
    id: string
  }
  avatar: {
    url: string
  }
  name: string
  birthdate: string
  deathdate: string

  dansCollection: {
    aikikaiDan: [DanType]
    moroccoDan: [DanType]
  }
}

const AIKIDOKA_GRAPHQL_FIELDS = `
sys {
  id
}
avatar {
  url
}
name
birthdate
deathdate
dansCollection {
  aikikaiDan: items {
    ... on AikikaiDan {
      name
    }
  }
  moroccoDan: items {
    ... on MoroccoNationalDan {
      name
    }
  }
}
`

export async function getAllAkidokasForHome(preview: boolean) {
  const entries = await fetchGraphQL(
    `query {
      aikidokaCollection(order: name_ASC, preview: ${
        preview ? 'true' : 'false'
      }) {
        items {
          ${AIKIDOKA_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  )

  return extractAikidokaEntries(entries)
}
