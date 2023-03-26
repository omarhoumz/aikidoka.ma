import Link from 'next/link'

import AdminScreenLayout from '../admin-screen-layout'
import { AikidokaType } from './aikidoka-type'

export default function AikidokaScreens({
  aikidokas = [],
}: {
  aikidokas: AikidokaType[]
}) {
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
