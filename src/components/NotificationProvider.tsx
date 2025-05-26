'use client'

import { SnackbarProvider } from 'notistack'
import { ReactNode } from 'react'

export default function NotificationProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
    </SnackbarProvider>
  )
}
