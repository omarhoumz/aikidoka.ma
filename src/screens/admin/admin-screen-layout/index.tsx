export default function AdminScreenLayout({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div>
      {!title ? null : <h1 className='mb-4 text-4xl font-thin'>{title}</h1>}
      {children}
    </div>
  )
}
