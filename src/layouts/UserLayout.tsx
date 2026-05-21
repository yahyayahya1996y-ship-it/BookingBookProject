import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Sidebar } from '../components/layout/Sidebar'
import { Footer } from '../components/layout/Footer'

export const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <div className="flex min-h-[calc(100vh-100px)] flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-5 sm:p-8">
          <div className="mx-auto max-w-7xl rounded-3xl bg-white p-6 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
