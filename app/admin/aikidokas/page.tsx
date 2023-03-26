import { FirebaseApp } from 'firebase/app'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

import clientApp from 'src/firebase/client-app'
import AikidokaScreens from 'src/screens/admin/aikidokas'
import {
  aikidokasCollection,
  AikidokaType,
} from 'src/screens/admin/aikidokas/aikidoka-type'

const firestore = getFirestore(clientApp as FirebaseApp)

function getAikidokas() {
  return getDocs(collection(firestore, aikidokasCollection)).then((query) => {
    return query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as AikidokaType
    })
  })
}

export default async function Aikidokas() {
  const aikidokas: AikidokaType[] = await getAikidokas()

  return <AikidokaScreens aikidokas={aikidokas} />
}
