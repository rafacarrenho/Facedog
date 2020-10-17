import React from 'react'
import { TOKEN_POST } from './api'

export const UserContext = React.createContext()

export const UserStorage = ({children}) => {
  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [loading, setLoading] = React.useState(null)
  const [error, setError] = React.useState(null)

  async function userLogin(username, password){
    const {url, options} = TOKEN_POST({username, password})
    const tokenRes = await fetch(url, options)
    const {token} = await tokenRes.json()
    window.localStorage.setItem('token', token)
  }

  return (
  <UserContext.Provider value={{usuario: "Rafael"}}>
    {children}
  </UserContext.Provider>)
}
