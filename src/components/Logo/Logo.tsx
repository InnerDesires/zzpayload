import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const LogoOLD = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src=""
    />
  )
}

export function Logo() {
  return (
      <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 67 24"
          aria-label="Укрзалізниця"
          className="text-primary"
      >
          <path 
              fill="currentColor" 
              d="M25.926 5.956c1.946 0 2.894.752 2.894 1.774s-.955 1.774-2.894 1.774h-1.924l-2.394 5.014h4.636c2.084 0 2.97.722 2.97 1.737s-.886 1.741-2.97 1.741H19.93L17.036 24h8.525c6.68 0 10.004-2.89 10.004-6.672a6.55 6.55 0 0 0-3.136-5.765c1.769-1.17 2.923-2.89 2.923-4.928 0-4.103-3.552-6.632-9.187-6.632h-8.529l-5.425 11.343L6.8.003H0l8.738 18.503L6.148 24h6.692l8.637-18.044zM37.794 10.23h22.704L57.85 4.64A8.92 8.92 0 0 0 49.944 0h-13.72a9.13 9.13 0 0 1 2.478 6.257 9.5 9.5 0 0 1-.908 3.974M37.978 13.767a8.94 8.94 0 0 1 .911 3.974 8.23 8.23 0 0 1-2.673 6.256H67l-4.829-10.23z"
          />
      </svg>
  )
}