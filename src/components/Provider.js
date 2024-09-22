import React, { createContext, useState } from 'react'

export const Context = createContext();

const Provider = ({children}) => {
    const [total, setTotal] = useState(null)
    return(
        <Context.Provider value={{ total, setTotal }}>
        {children}
      </Context.Provider>
    )
}

export default Provider
