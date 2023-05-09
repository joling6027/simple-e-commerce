import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { ProductsContext } from '../components/ProductsContext'
import currencyFormat from '../utils/currencyFormat'
import { CartIcon, RemoveIcon } from '../components/icons';

const favouritePage = () => {
  const { favouriteProducts, setSelectedProducts, setFavouriteProducts } = useContext(ProductsContext);
  const [productsInfo, setProductsInfo] = useState([]);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const removeMsg = "Successfully removed product from your favourite collection.";
  const addToCartMsg = "Successfully added product to cart and removed from your favoruite collection.";

  useEffect(() => {
    const uniqIds = [...new Set(favouriteProducts)];
    fetch('/api/products?ids=' + uniqIds.join(','))
      .then(response => response.json())
      .then(json => setProductsInfo(json))
      .catch(error => console.error(error + " There's no item in favourite list yet."))
  }, [favouriteProducts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRemoved(false);
      setIsAdded(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isRemoved, isAdded]);

  const removeItem = (id) => {
    setFavouriteProducts(prev => [...prev].filter(itemId => itemId !== id));
    setIsRemoved(true);
  }

  const addItem = (id) => {
    setSelectedProducts(prev => [...prev, id]);
    setFavouriteProducts(prev => [...prev].filter(itemId => itemId !== id));
    setIsAdded(true);
  }

  const successMsg = (msg) => {
    if (msg.includes("added")) {
      return (<div className="mb-5 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white text-lg p-5 rounded-xl">
        {msg}
      </div>);
    } else {
      return (<div className="mb-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg p-5 rounded-xl">
        {msg}
      </div>);
    }
  }

  return (
    <Layout>
      {isRemoved && successMsg(removeMsg)}
      {isAdded && successMsg(addToCartMsg)}
      <h2 className="text-2xl mb-4">Your Favourite</h2>
      {!productsInfo.length && (
        <div>Looks like it's empty!</div>
      )}
      {productsInfo.length && productsInfo.map(product => {
        const amount = favouriteProducts.filter(id => id === product._id).length;
        if (amount === 0) return;
        return (
          <div className="flex mb-5" key={product._id}>
            <div className="bg-gray-100 p-3 rounded-xl shrink-0" style={{ boxShadow: 'inset 1px 0px 10px 10px rgba(0,0,0,0.1)' }}>
              <img className='w-24' src={product.picture} alt={product.name} />
            </div>
            <div className='pl-4 items-center w-full'>
              <h3 className='font-bold text-lg'>{product.name}</h3>
              <p className='text-sm leading-4 text-gray-500'>{product.description.slice(0.100)}</p>
              <div className="flex mt-4">
                <div className='grow'>{currencyFormat(product.price)}</div>
                <div>
                  <button onClick={() => removeItem(product._id)} className=' px-2 rounded-lg text-red-500'><RemoveIcon /></button>
                  <button onClick={() => addItem(product._id)} className=' px-2 rounded-lg text-cyan-500'><CartIcon /></button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

export default favouritePage;