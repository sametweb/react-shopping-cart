import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

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

  const addItem = item => setCart([...cart, item]);
  const removeItem = index =>
    setCart(cart.filter((item, itemIndex) => itemIndex !== index));

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
