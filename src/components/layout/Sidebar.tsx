import { Link } from 'react-router-dom'

export const Sidebar: React.FC = () => {
  return (
    <aside style={{ width: '250px', backgroundColor: '#f9f9f9', borderRight: '1px solid #ddd', padding: '1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0 }}>User Menu</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link to="/user/dashboard" style={{ color: '#333', textDecoration: 'none' }}>Dashboard</Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link to="/user/books" style={{ color: '#333', textDecoration: 'none' }}>Available Books</Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link to="/user/my-bookings" style={{ color: '#333', textDecoration: 'none' }}>My Bookings</Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link to="/user/profile" style={{ color: '#333', textDecoration: 'none' }}>Profile</Link>
          </li>
        </ul>
      </div>

      <div>
        <h3>Admin Menu</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link to="/admin/dashboard" style={{ color: '#333', textDecoration: 'none' }}>Dashboard</Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link to="/admin/books" style={{ color: '#333', textDecoration: 'none' }}>Manage Books</Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link to="/admin/bookings" style={{ color: '#333', textDecoration: 'none' }}>Manage Bookings</Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link to="/admin/users" style={{ color: '#333', textDecoration: 'none' }}>Manage Users</Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link to="/admin/activity-log" style={{ color: '#333', textDecoration: 'none' }}>Activity Log</Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
