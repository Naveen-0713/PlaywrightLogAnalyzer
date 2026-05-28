import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { getMetrics, getChartData, getTableData } from '../services/api'

export default function Dashboard() {
  const navigate = useNavigate()
  const name = localStorage.getItem('name') || 'User'
  const role = localStorage.getItem('role') || 'User'

  const [metrics, setMetrics] = useState([])
  const [chartData, setChart] = useState([])
  const [tableData, setTable] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [sortKey, setSortKey] = useState('id')
  const [sortAsc, setSortAsc] = useState(true)
  const [page, setPage]       = useState(1)
  const PAGE_SIZE = 5

  useEffect(() => {
    async function fetchAll() {
      const [m, c, t] = await Promise.all([getMetrics(), getChartData(), getTableData()])
      setMetrics(m); setChart(c); setTable(t); setLoading(false)
    }
    fetchAll()
  }, [])

  function handleLogout() { localStorage.clear(); navigate('/') }

  function handleSort(key) {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(true) }
  }

  const filtered = tableData
    .filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.role.toLowerCase().includes(search.toLowerCase()) ||
      r.status.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey]
      return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1)
    })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if (loading) return <div className="loading">Loading dashboard...</div>

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
          <span>Hello, {name}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <div className="dash-content">
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <div className="metric-card" key={i}>
              <p className="metric-label">{m.label}</p>
              <h2 className="metric-value">{m.value}</h2>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Monthly Overview</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users"   fill="#6366f1" radius={[4,4,0,0]} />
              <Bar dataKey="revenue" fill="#22d3ee" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="table-header">
            <h3>User Records</h3>
            <input className="search-input" placeholder="Search..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {['id','name','email','role','status'].map(col => (
                    <th key={col} onClick={() => handleSort(col)} className="sortable">
                      {col.toUpperCase()} {sortKey === col ? (sortAsc ? '▲' : '▼') : ''}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0
                  ? <tr><td colSpan={5} className="no-data">No records found</td></tr>
                  : paginated.map(row => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.role}</td>
                      <td>
                        <span className={`badge ${row.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button onClick={() => setPage(p => Math.max(p-1,1))} disabled={page === 1}>Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(p+1,totalPages))} disabled={page === totalPages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}