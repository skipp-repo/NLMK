import React from 'react'
import clsx from 'clsx'
import './ErrorFallback.css'

export type ErrorFallbackProps = {
  error: Error
  resetErrorBoundary(): void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return (
    <div role="alert">
      <p>Произошла ошибка</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Перезагрузить</button>
    </div>
  )
}

export default React.memo(ErrorFallback)
