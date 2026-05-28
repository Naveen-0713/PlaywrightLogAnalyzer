export async function signupAPI(username, password, name, role) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const exists = users.find(u => u.username === username)
      if (exists) { reject(new Error('Username already exists')); return }
      users.push({ username, password, name, role })
      localStorage.setItem('users', JSON.stringify(users))
      resolve({ message: 'Account created successfully' })
    }, 800)
  })
}

export async function loginAPI(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user  = users.find(u => u.username === username && u.password === password)
      if (user) {
        resolve({ token: 'fake-jwt-token-123', name: user.name, role: user.role })
      } else {
        reject(new Error('Invalid username or password'))
      }
    }, 800)
  })
}

export async function getMetrics() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { label: 'Total Users',     value: '12,430' },
        { label: 'Revenue',         value: '$48,290' },
        { label: 'Active Sessions', value: '3,210'  },
        { label: 'Errors Today',    value: '45'     },
      ])
    }, 500)
  })
}

export async function getChartData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { month: 'Jan', users: 400,  revenue: 2400 },
        { month: 'Feb', users: 600,  revenue: 3200 },
        { month: 'Mar', users: 800,  revenue: 4100 },
        { month: 'Apr', users: 700,  revenue: 3800 },
        { month: 'May', users: 1000, revenue: 5200 },
        { month: 'Jun', users: 1200, revenue: 6100 },
      ])
    }, 500)
  })
}

export async function getTableData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1,  name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin',  status: 'Active'   },
        { id: 2,  name: 'Bob Smith',     email: 'bob@example.com',   role: 'User',   status: 'Inactive' },
        { id: 3,  name: 'Carol White',   email: 'carol@example.com', role: 'Editor', status: 'Active'   },
        { id: 4,  name: 'David Brown',   email: 'david@example.com', role: 'User',   status: 'Active'   },
        { id: 5,  name: 'Eva Green',     email: 'eva@example.com',   role: 'User',   status: 'Inactive' },
        { id: 6,  name: 'Frank Lee',     email: 'frank@example.com', role: 'Editor', status: 'Active'   },
        { id: 7,  name: 'Grace Kim',     email: 'grace@example.com', role: 'Admin',  status: 'Active'   },
        { id: 8,  name: 'Henry Ford',    email: 'henry@example.com', role: 'User',   status: 'Inactive' },
        { id: 9,  name: 'Iris Chan',     email: 'iris@example.com',  role: 'User',   status: 'Active'   },
        { id: 10, name: 'Jack Nolan',    email: 'jack@example.com',  role: 'Editor', status: 'Active'   },
      ])
    }, 500)
  })
} 