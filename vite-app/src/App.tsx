import './App.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Menu from './components/Menu'
import Profile from './components/Profile'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { isLoading, error } = useAuth0();

  return (
    <main>
      <h1>Auth0 Login</h1>
      {error && <p>Auth error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <p>
            <LoginButton />
            <LogoutButton />
          </p>
          <Profile />
        </>
      )}
      <p>
        <Menu />
      </p>
    </main>
  )
}

export default App
