import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='grid min-h-screen md:grid-cols-12'>
      <aside className='bg-slate-800 p-4 md:col-span-3 lg:col-span-2'>
        <h1>AIKIDOKA Admin</h1>

        <nav className='flex flex-col gap-y-4 py-8'>
          <Link href='admin/aikidokas'>Aikidokas</Link>
          <Link href='admin/agenda'>Agenda</Link>
          <Link href='admin/club'>Club & Dojo</Link>
        </nav>
      </aside>
      <main className='p-4 md:col-span-9 lg:col-span-10'>{children}</main>
    </div>
  )
}
