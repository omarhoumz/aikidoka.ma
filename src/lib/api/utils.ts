export async function fetchGraphQL(query: string, preview = false) {
  const env = process.env.NODE_ENV === 'development' ? '/environments/dev' : ''

  const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}${env}`

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
      }`,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json())
}

export function extractAikidokaEntries(fetchResponse: {
  data: { aikidokaCollection: { items: [unknown] } }
}) {
  return fetchResponse?.data?.aikidokaCollection?.items
}
