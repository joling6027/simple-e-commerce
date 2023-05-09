import React, { createContext } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export const ProductsContext = createContext({});

export const ProductsContextProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState('cart', { defaultValue: [] })
  const [favouriteProducts, setFavouriteProducts] = useLocalStorageState('favourite', { defaultValue: [] })

  return (
    <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts, favouriteProducts, setFavouriteProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}
