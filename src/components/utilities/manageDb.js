// ** get data from ls 

const getDataFromLs = ()=>{
    const storedCart = JSON.parse(localStorage.getItem('shopping-cart'));
    let cart = {};
    storedCart && (cart = storedCart);

    return cart;
};


// ** set data to ls 

const setLsData = (id)=>{
    // ** get data from ls

    const storedCart = getDataFromLs();

    if (id in storedCart) {
        storedCart[id] = storedCart[id] + 1;
        localStorage.setItem('shopping-cart', JSON.stringify(storedCart))
    } else{
        storedCart[id] = 1;
        localStorage.setItem('shopping-cart', JSON.stringify(storedCart))
    }
};


export {
    setLsData,
    getDataFromLs
};
