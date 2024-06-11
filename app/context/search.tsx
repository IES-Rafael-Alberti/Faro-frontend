import React, { useState, useContext, useEffect, useCallback, ReactNode } from 'react'
import { URL } from '@/types/consts'

// Create a React context for managing global state
const AppContext = React.createContext({})

// AppProvider component responsible for managing the global state
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [resultTitle, setResultTitle] = useState('')

  // TODO: Verify if this is viable or if we should create a fetch per endpoint
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${URL}${searchTerm}`)
      const json = await response.json()
      const { information } = json
      setData(information || [])
    } catch (error) {
      
    } finally {
      setResultTitle(data.length > 1 ? 'Your Search Result' : 'No Search Result Found!')
      setLoading(false)
    }
  }, [searchTerm])

  // useDebounce hook to delay the search term update and subsequent API calls
  const useDebounce = (value : String, delay: any) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debouncedValue
  }
  // Apply the debounce hook to the search term with a delay of 300ms
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // useEffect to trigger the fetchBooks function when debouncedSearchTerm changes
  useEffect(() => {
    fetchData()
  }, [debouncedSearchTerm, fetchData])
  return (
    <AppContext.Provider value={{
      loading, data, setSearchTerm, resultTitle, setResultTitle
    }}>
        {children}
    </AppContext.Provider>
  )
}

// Custom hook to access the global context from any component
export const useGlobalContext = () => {
  return useContext(AppContext)
}

// Export the context and provider for use in other parts of the application
export { AppContext, AppProvider }
