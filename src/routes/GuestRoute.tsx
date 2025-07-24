import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { LOCALSTORAGE_KEYS } from '../lib/constants'
import { RootState } from '../redux/store'

interface GuestRouteProps {
    children: ReactNode
}

interface LocationState {
    from: string
}

const GuestRoute = ({
    children
}: GuestRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth) 

  const location = useLocation()
  const previousLocation = window.sessionStorage.getItem(LOCALSTORAGE_KEYS.PREVIOUS_LOCATION)

  if (user) { 
    const to = {
      pathname: previousLocation || '/',
      state: { from: location.pathname } as LocationState
    }
    return <Navigate to={to} replace />
  }

  return <>{children}</>
}

export default GuestRoute