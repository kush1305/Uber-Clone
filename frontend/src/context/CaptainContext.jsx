import React from 'react'

export const CaptainDataContext = React.createContext()

export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = React.useState({})
  const [isloading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const updateCaptain= (captainData) => {
    setCaptain(captainData)
  }

  const value = {
    captain,
    setCaptain, updateCaptain,
    isloading,
    setIsLoading,
    error,
    setError
  }

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  )
}



export default CaptainContext