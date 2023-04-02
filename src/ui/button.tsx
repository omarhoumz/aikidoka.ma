'use client'

import cx from 'classnames'
import { CircleNotch } from '@phosphor-icons/react'

type ButtonProps = {
  children: React.ReactNode
  color?: 'primary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  onClick?: () => void
}

const colorClasses = {
  primary: 'bg-blue-500 hover:bg-blue-400',
  danger: 'bg-red-500 hover:bg-red-400',
}

export default function Button({
  children,
  color = 'primary',
  type = 'button',
  loading = false,
  onClick,
}: ButtonProps) {
  const classes = cx(
    'px-2 rounded text-black h-6 min-w-[65px] flex items-center justify-center',
    colorClasses[color],
  )

  return (
    <button className={classes} type={type} onClick={onClick}>
      {loading ? <CircleNotch className='animate-spin' /> : children}
    </button>
  )
}
