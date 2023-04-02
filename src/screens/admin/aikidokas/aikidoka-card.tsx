'use client'

import { FirebaseApp } from 'firebase/app'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import clientApp from 'src/firebase/client-app'
import Button from 'src/ui/button'
import { AikidokaType, aikidokasCollection } from './aikidoka-type'

const firestore = getFirestore(clientApp as FirebaseApp)
const storage = getStorage()

export default function AikidokaCard({ aikidoka }: { aikidoka: AikidokaType }) {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const fullName = [aikidoka.firstName, aikidoka.lastName]
    .filter(Boolean)
    .join(' ')

  const isAvatarUrl = aikidoka.avatar?.startsWith('http')

  async function deleteAikidoka(aikidoka: AikidokaType) {
    setLoading(true)

    const docRef = doc(firestore, aikidokasCollection, aikidoka.id)

    if (aikidoka.avatar) {
      const storageRef = ref(storage, aikidoka.avatar)
      await deleteObject(storageRef).catch(() => {
        console.log('failed to delete avatar', aikidoka.avatar)
      })
    }

    await deleteDoc(docRef)
      .then(() => {
        router.push('/admin/aikidokas')
      })
      .catch(() => {
        console.log('failed to delete item', aikidoka.id)
      })

    setLoading(false)
  }

  return (
    <li
      key={aikidoka.id}
      className='flex gap-5 rounded border border-slate-500'
    >
      <div className='h-48 w-48 overflow-hidden bg-slate-800'>
        {!isAvatarUrl ? null : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={aikidoka.avatar}
            className='h-full w-full object-contain'
            alt={fullName}
          />
        )}
      </div>

      <div className='py-6'>
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

        <div className='mt-2 flex gap-3'>
          <Link href={`admin/aikidokas/${aikidoka.id}`}>Edit</Link>

          <Button
            color='danger'
            loading={loading}
            onClick={() => deleteAikidoka(aikidoka)}
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  )
}
