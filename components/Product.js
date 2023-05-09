import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from './ProductsContext'
import currencyFormat from '../utils/currencyFormat';
import { CartIcon, HeartIcon, FilledHeartIcon } from './icons';

export default function Product({_id, name, price, description, picture}) {
  const { setSelectedProducts, setFavouriteProducts, favouriteProducts } = useContext(ProductsContext);
  const [ isClicked, setIsClicked ] = useState(false);
  const priceFormatted = currencyFormat(price);
  const addProduct = () => {
    setSelectedProducts(prev => [...prev, _id]);
  }

  useEffect(() => {
    setIsClicked(favouriteProducts.includes(_id));
  }, [favouriteProducts, _id]);

  const toogle = () => {
    if (!isClicked) {
      setFavouriteProducts(prev => [...prev, _id]);
    } else {
      setFavouriteProducts(prev => [...prev].filter(itemId => itemId !== _id));
    }
    setIsClicked(!isClicked);
  }

  return (
    <div className="w-64">
      <div className="bg-blue-100 p-5 rounded-xl">
        <img src={picture} alt="" />
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{name.slice(0,25)}</h3>
      </div>
      <p className="text-sm mt-1 leading-4 text-gray-500">{description.slice(0,100)+ "..."} </p>
      <div className="flex mt-1">
        <div className="text-2xl font-bold grow">{priceFormatted}</div>
        <button onClick={toogle} className="heartBtn text-red-400 px-3 py-1 rounded-xl">{isClicked? <FilledHeartIcon/> :<HeartIcon />}</button>
        <button onClick={addProduct} className="bg-cyan-400 active:bg-cyan-200 text-white px-3 py-1 rounded-xl"><CartIcon/></button>
      </div>
    </div>
  )
}
