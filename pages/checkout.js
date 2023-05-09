import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import { ProductsContext } from '../components/ProductsContext'
import currencyFormat from '../utils/currencyFormat'
import { AddIcon, MinusIcon } from '../components/icons'

const checkoutPage = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  // const { register, handleSubmit, watch, formState: { errors }} = useForm();
  const [productsInfo, setProductsInfo] = useState([])
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch('/api/products?ids=' + uniqIds.join(','))
      .then(response => response.json())
      .then(json => setProductsInfo(json))
      .catch(error => console.error(error))
  }, [selectedProducts]);

  const moreOfThisProduct = (id) => {
    setSelectedProducts(prev => [...prev, id]);
  }
  const lessOfThisProduct = (id) => {
    const position = selectedProducts.indexOf(id);
    if (position !== -1) {
      setSelectedProducts(prev => {
        return prev.filter((value, index) => index !== position);
      });
    }
  }

  const deliveryPrice = 5;
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfo.find(p => p._id === id)?.price || 0;
      subtotal += price;
    }
  }
  const total = subtotal + deliveryPrice;

  return (
    <Layout>
      <h2 className="text-2xl mb-4 font-semibold">Your Cart</h2>
      {!productsInfo.length && (
        <div>Looks like it's empty!</div>
      )}
      {productsInfo.length && productsInfo.map(product => {
      const amount = selectedProducts.filter(id => id === product._id).length;
      if (amount === 0 ) return;
      return (
        <div className="flex mb-5" key={product._id}>
          <div className="bg-gray-100 p-3 rounded-xl shrink-0" style={{ boxShadow: 'inset 1px 0px 10px 10px rgba(0,0,0,0.1)' }}>
            <img className='w-24' src={product.picture} alt={product.name} />
          </div>
          <div className='pl-4 items-center w-full'>
            <h3 className='font-bold text-lg'>{product.name}</h3>
            <p className='text-sm leading-4 text-gray-500'>{product.description.slice(0,100)+ "..."}</p>
            <div className="flex mt-4">
              <div className='grow'>{currencyFormat(product.price)}</div>
              <div className='flex'>
                <button onClick={() => lessOfThisProduct(product._id)} className='px-2 rounded-lg text-cyan-500 active:text-cyan-200'><MinusIcon /></button>
                <span className='mx-2'>{selectedProducts.filter(id => id === product._id).length}</span>
                <button onClick={() => moreOfThisProduct(product._id)} className=' px-2 rounded-lg text-cyan-500 active:text-cyan-200'><AddIcon /></button>
              </div>
            </div>
          </div>
        </div>
      )})}
      <h3 className='text-2xl mb-4 font-semibold'>Delivery Information</h3>
      <form action="/api/checkout" method='POST'>
        <div className="mt-4">
          <input name='address' value={address} onChange={e => setAddress(e.target.value)} className='bg-gray-100 w-full rounded-lg px-4 py-2 mb-2' type="text" placeholder='Street address, number' required/>
          <input name='city' value={city} onChange={e => setCity(e.target.value)} className='bg-gray-100 w-full rounded-lg px-4 py-2 mb-2' type="text" placeholder='City and postal code' required />
          <input name='name' value={name} onChange={e => setName(e.target.value)} className='bg-gray-100 w-full rounded-lg px-4 py-2 mb-2' type="text" placeholder='Your name' required />
          <input name='email' value={email} onChange={e => setEmail(e.target.value)} className='bg-gray-100 w-full rounded-lg px-4 py-2 mb-2' type="email" placeholder='Email address' required />
        </div>
        <h3 className='text-2xl mb-4 font-semibold'>Order Summary</h3>
        <div className='mt-4'>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className='font-bold'>{`${currencyFormat(subtotal)}`}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className='font-bold'>{`${currencyFormat(deliveryPrice)}`}</h3>
          </div>
          <div className="flex my-3 border-t pt-3 border-dashed border-cyan-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className='font-bold'>{`${currencyFormat(total)}`}</h3>
          </div>
        </div>
        <input type="hidden" name='products' value={selectedProducts.join(',')} />
        <button className='bg-cyan-600 p-5 text-white w-full rounded-xl font-bold my-4 px-5 py-2 shadow-lg shadow-cyan-300 hover:bg-cyan-400'>Pay {`${currencyFormat(total)}`}</button>
      </form>

    </Layout>
  )
}

export default checkoutPage;