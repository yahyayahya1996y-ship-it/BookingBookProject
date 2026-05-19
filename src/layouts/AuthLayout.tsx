import { Outlet } from 'react-router-dom'

export const AuthLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Outlet />
      </div>
    </div>
  )
}
