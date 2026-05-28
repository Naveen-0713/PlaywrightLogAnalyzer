import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Settings() {
  const name = localStorage.getItem('name') || ''
  const role = localStorage.getItem('role') || ''
  const [saved, setSaved] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <span className="nav-brand">📊 Dashboard</span>
        <div className="nav-links">
          <Link to="/dashboard">Home</Link>
          {role === 'Admin' && <Link to="/users">Users</Link>}
          <Link to="/settings">Settings</Link>
        </div>
        <div className="nav-right">
          <span className="role-badge">{role}</span>
        </div>
      </nav>

      <div className="dash-content">
        <div className="card" style={{ maxWidth: 500 }}>
          <h3>Account Settings</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue={name} readOnly />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" defaultValue={role} readOnly />
            </div>
            <div className="form-group">
              <label>Theme</label>
              <select defaultValue="dark">
                <option value="dark">Dark</option>
                <option value="light">Light (coming soon)</option>
              </select>
            </div>
            {saved && <p className="success-msg">Settings saved!</p>}
            <button type="submit" className="btn-primary">Save Settings</button>
          </form>
        </div>
      </div>
    </div>
  )
}