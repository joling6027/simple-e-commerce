import { useState } from "react"
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "../components/Layout";

export default function Home({ products }) {

  const categoriesNames = [...new Set(products.map(p => p.category))];
  const [phrase, setPhrase] = useState('');

  // Search product
  if (phrase) {
    products = products.filter(p => p.name.toLowerCase().includes(phrase));
  }

  return (
    <Layout>
      <h3 className="mb-2">Already have something in mind?</h3>
      <input
        type="text"
        placeholder="Search for products..."
        value={phrase}
        onChange={e => setPhrase(e.target.value.toLowerCase())}
        className="bg-gray-100 w-full py-2 px-4 rounded-xl"
      />
      {categoriesNames.map(categoryName => (
        <div key={categoryName}>
          {products.find(p => p.category === categoryName) && (
            <div>
              <h2 className="text-2xl my-5 p-2 pl-2 capitalize font-semibold bg-cyan-50">{categoryName}</h2>
              {/* scrollbar-hide requires external plugin */}
              <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                {products.filter(p => p.category === categoryName).map(productInfo => (
                  <div key={productInfo._id} className="px-5 snap-start">
                    <Product {...productInfo} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </Layout>

  )
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}
