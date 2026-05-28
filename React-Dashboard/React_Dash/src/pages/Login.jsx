import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAPI, signupAPI } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode]       = useState('login')
  const [form, setForm]       = useState({ name: '', username: '', password: '', confirm: '', role: 'User' })
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError(''); setSuccess('')
  }

  function switchMode(m) {
    setMode(m)
    setForm({ name: '', username: '', password: '', confirm: '', role: 'User' })
    setError(''); setSuccess('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (mode === 'signup') {
      if (!form.name || !form.username || !form.password || !form.confirm) {
        setError('Please fill in all fields.'); return
      }
      if (form.password !== form.confirm) {
        setError('Passwords do not match.'); return
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.'); return
      }
      setLoading(true)
      try {
        await signupAPI(form.username, form.password, form.name, form.role)
        setSuccess('Account created! You can now log in.')
        switchMode('login')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    } else {
      if (!form.username || !form.password) {
        setError('Please fill in all fields.'); return
      }
      setLoading(true)
      try {
        const data = await loginAPI(form.username, form.password)
        localStorage.setItem('token', data.token)
        localStorage.setItem('name',  data.name)
        localStorage.setItem('role',  data.role)
        navigate('/dashboard')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="login-sub">{mode === 'login' ? 'Sign in to your account' : 'Sign up to get started'}</p>

        <div className="auth-tabs">
          <button className={mode === 'login'  ? 'tab active' : 'tab'} onClick={() => switchMode('login')}>Login</button>
          <button className={mode === 'signup' ? 'tab active' : 'tab'} onClick={() => switchMode('signup')}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="Enter your name"
                value={form.name} onChange={handleChange} />
            </div>
          )}
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="Enter username"
              value={form.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter password"
              value={form.password} onChange={handleChange} />
          </div>
          {mode === 'signup' && (
            <>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" name="confirm" placeholder="Confirm password"
                  value={form.confirm} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="User">User</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </>
          )}

          {error   && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}