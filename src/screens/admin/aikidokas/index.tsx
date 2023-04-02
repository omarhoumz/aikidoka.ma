import Link from 'next/link'

import AdminScreenLayout from '../admin-screen-layout'
import AikidokaCard from './aikidoka-card'
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
          return <AikidokaCard key={aikidoka.id} aikidoka={aikidoka} />
        })}
      </ul>
    </AdminScreenLayout>
  )
}
