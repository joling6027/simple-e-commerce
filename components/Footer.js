import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";
import { HomeIcon, CartIcon, HeartIcon } from "./icons";

export default function Footer() {
  const router = useRouter();
  const path = router.pathname;
  const { selectedProducts } = useContext(ProductsContext)

  return (
    <footer className="sticky bottom-0 bg-white p-5 w-full flex border-t border-gray-200 justify-center space-x-12 text-gray-400">
      <Link href={'/'} className={(path === '/' ? 'text-cyan-500' : '') + " flex jusity-center items-center flex-col"} >
        <HomeIcon />
        <span>Home</span>
      </Link>
      <Link href={'/checkout'} className={(path === '/checkout' ? 'text-cyan-500' : '') + " flex jusity-center items-center flex-col"}>
        <CartIcon />
        <span>Cart {selectedProducts.length}</span>
      </Link>
      <Link href={'/favourite'} className={(path === '/favourite' ? 'text-cyan-500' : '') + " flex jusity-center items-center flex-col"}>
        <HeartIcon />
        <span>Favourite</span>
      </Link>
    </footer>
  )
}