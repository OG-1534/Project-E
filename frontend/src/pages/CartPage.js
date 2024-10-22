const CartPage = () => {
    const { cartItems, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);
  
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <div>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.img} alt={item.name} />
                  <div className="cart-item-details">
                    <h2>{item.name}</h2>
                    <p>Price: {item.price}</p>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <h3>Total: {getTotalPrice()}</h3>
              <button onClick={clearCart}>Clear Cart</button>
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    );
  };
