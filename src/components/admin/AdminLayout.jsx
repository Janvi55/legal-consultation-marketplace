import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import "../../assets/css/admin/admin.css"

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'User Management', icon: '👥' },
    { path: '/admin/lawyers', label: 'Lawyer Management', icon: '⚖️' },
    { path: '/admin/cases', label: 'Case Management', icon: '📂' },
    { path: '/admin/activity', label: 'Activity', icon: '📈' },
    { path: '/admin/stat' , label :'stat', icon: ' '}
    // { path: '/admin/system', label: 'System Settings', icon: '⚙️' }
  ];

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <nav>
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <span className="icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-footer">
          <p>Logged in as: <strong>{user?.email}</strong></p>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}