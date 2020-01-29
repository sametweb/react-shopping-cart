import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";

//custom hooks
import { useLocalStorage } from "./hooks/useLocalStorage";

//contexts
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CardContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);
  const [storedCart, setStoredCart] = useLocalStorage("cart");

  const addItem = item => setCart([...cart, item]);

  const removeItem = index =>
    setCart(cart.filter((item, itemIndex) => itemIndex !== index));

  useEffect(() => setCart(JSON.parse(storedCart)), [storedCart]); //Populates cart if there is data in localStorage
  useEffect(() => setStoredCart(cart), [cart, setStoredCart]); //Saves in localStorage everytime cart changes

  //   const storeIt = (key, value) =>
  //     window.localStorage.setItem(key, JSON.stringify(value));

  //   useEffect(() => {
  //     const savedCart = window.localStorage.getItem("cart");
  //     if (savedCart) setCart(JSON.parse(savedCart));
  //   }, []);

  //   useEffect(() => storeIt("cart", cart), [cart]);

  console.log(cart);
  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation cart={cart} />
          <Route exact path="/" component={Products} />
          <Route path="/cart" component={ShoppingCart} />
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
