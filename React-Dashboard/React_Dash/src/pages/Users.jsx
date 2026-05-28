import React from 'react'
import { Link } from 'react-router-dom'

export default function Users() {
  const users = JSON.parse(localStorage.getItem('users') || '[]')

  return (
    <div className="dashboard">
      <nav className="navbar">
        <span className="nav-brand">📊 Dashboard</span>
        <div className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/settings">Settings</Link>
        </div>
        <div className="nav-right">
          <span className="role-badge">Admin</span>
        </div>
      </nav>

      <div className="dash-content">
        <div className="card">
          <h3>All Registered Users <span className="count-badge">{users.length}</span></h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>NAME</th>
                  <th>USERNAME</th>
                  <th>ROLE</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0
                  ? <tr><td colSpan={4} className="no-data">No users registered yet</td></tr>
                  : users.map((u, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{u.name}</td>
                      <td>{u.username}</td>
                      <td><span className="badge badge-active">{u.role}</span></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}