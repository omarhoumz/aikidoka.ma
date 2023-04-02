import { FirebaseApp } from 'firebase/app'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import clientApp from 'src/firebase/client-app'
import AikidokaCard from 'src/screens/admin/aikidokas/aikidoka-card'
import {
  AikidokaType,
  aikidokasCollection,
} from 'src/screens/admin/aikidokas/aikidoka-type'

const firestore = getFirestore(clientApp as FirebaseApp)

function getAikidoka(id: string) {
  const docRef = doc(firestore, aikidokasCollection, id)

  return getDoc(docRef).then((doc) => {
    return { id: doc.id, ...doc.data() } as AikidokaType
  })
}

export default async function AikidokaEdit({
  params,
}: {
  params: { id: string }
}) {
  const aikidoka = await getAikidoka(params.id)

  return (
    <div>
      <AikidokaCard aikidoka={aikidoka} />
    </div>
  )
}
