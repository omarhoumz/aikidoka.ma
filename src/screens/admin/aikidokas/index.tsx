import { FirebaseApp } from 'firebase/app'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import Link from 'next/link'

import clientApp from 'src/firebase/client-app'
import AdminScreenLayout from '../admin-screen-layout'
import { AikidokaType, aikidokasCollection } from './aikidoka-type'

const firestore = getFirestore(clientApp as FirebaseApp)

function getAikidokas() {
  return getDocs(collection(firestore, aikidokasCollection)).then((query) => {
    return query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as AikidokaType
    })
  })
}

export default async function AikidokaScreens() {
  const aikidokas: AikidokaType[] = await getAikidokas()

  return (
    <AdminScreenLayout title='Aikidokas'>
      <div className='mb-6'>
        <Link
          href='admin/aikidokas/add'
          className='rounded bg-slate-800 px-2 hover:bg-slate-700'
        >
          Add
        </Link>
      </div>

      <ul className='flex flex-col gap-4'>
        {aikidokas.map((aikidoka) => {
          const fullName = [aikidoka.firstName, aikidoka.lastName]
            .filter(Boolean)
            .join(' ')

          const isAvatarUrl = aikidoka.avatar?.startsWith('http')

          return (
            <li key={aikidoka.id} className='flex items-center gap-5'>
              <div className='h-16 w-16 overflow-hidden rounded border border-slate-500 bg-slate-800'>
                {!isAvatarUrl ? null : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={aikidoka.avatar}
                    className='h-16 w-16'
                    alt={fullName}
                  />
                )}
              </div>
              <div>
                <div className='text-xl'>{fullName}</div>

                <div>
                  {aikidoka.grades.map((grade, index) => {
                    return (
                      <div key={index}>
                        {grade.level} Dan - {grade.type} - {grade.date}
                      </div>
                    )
                  })}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </AdminScreenLayout>
  )
}
