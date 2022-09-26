import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import { getDataFromLs, setLsData } from '../utilities/manageDb';


const Shop = () => {
    // ** products loading
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);

    // ** Handle add to cart

    const handleAddToCart = (product)=>{
        const existedProductInCart = cart.find(productCart => productCart.id === product.id);
        let newCart = [];
        if (!existedProductInCart) {
            product.quantity = 1;
            newCart = [...cart,product];
        } else{
            const rest = cart.filter(productCart => productCart.id !== product.id);
            existedProductInCart.quantity = existedProductInCart.quantity + 1;
            newCart = [...rest,existedProductInCart];
        }

       
        setCart(newCart);

        // ** set data to ls

        setLsData(product.id)
    }

    useEffect(()=>{
          // ** data loader function
          const loadProducts = async()=>{
            try {
                const response = await fetch(`products.json`);
                response.ok? console.log('Successful') : console.log('Failed');
                const data = await response.json();
                setProducts(data)
            } catch (error) {
                console.log(error);
            }
        };

        loadProducts()
    },[]);

    // ** Bring the data from localStorage and show

    useEffect(()=>{
        // ** get data
        const storedCart = getDataFromLs();

        const cartFromLs = [];
        
        for (const id in storedCart) {
            const addedToLsProducts = products.find(product => product.id === id);

            if (addedToLsProducts) {
                addedToLsProducts.quantity = storedCart[id];
                cartFromLs.push(addedToLsProducts);
            }
        };

        setCart(cartFromLs);

    },[products])

 
    return (
        <div className="grid grid-cols-12">
          <div className='col-start-1 col-end-9'>
            <div className='grid grid-cols-3 gap-4'>
                {
                products.map(product => <Products handleAddToCart={handleAddToCart} key={product.id} product={product}></Products>)
                }
            </div>
           
          </div>
          <div className='col-start-10 col-end-12'>
            <Cart cart={cart}></Cart>
          </div>
        </div>
    );
};

export default Shop;