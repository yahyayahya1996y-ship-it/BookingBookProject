import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Sidebar } from '../components/layout/Sidebar'
import { Footer } from '../components/layout/Footer'

export const UserLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
