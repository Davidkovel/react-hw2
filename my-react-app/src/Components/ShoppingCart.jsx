import React, { useReducer, useEffect } from 'react';
import { cartReducer, getInitialState, ACTIONS, calcTotal } from './useReducer';

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const sampleProducts = [
    { id: 1, name: 'Молоко', price: 30 },
    { id: 2, name: 'Хліб', price: 20 },
    { id: 3, name: 'Яблука', price: 50 }
  ];

  const addToCart = (product) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  const total = calcTotal(state.cart, state.discount, state.tax, state.shipping);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Кошик покупок</h1>

      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
        <h3>Налаштування:</h3>
        <label>
          Знижка (%):
          <input
            type="number"
            value={state.discount}
            onChange={(e) => dispatch({ type: ACTIONS.SET_DISCOUNT, payload: Number(e.target.value) })}
            min="0"
            max="100"
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label style={{ marginLeft: '15px' }}>
          Податок (%):
          <input
            type="number"
            value={state.tax}
            onChange={(e) => dispatch({ type: ACTIONS.SET_TAX, payload: Number(e.target.value) })}
            min="0"
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label style={{ marginLeft: '15px' }}>
          Доставка (грн):
          <input
            type="number"
            value={state.shipping}
            onChange={(e) => dispatch({ type: ACTIONS.SET_SHIPPING, payload: Number(e.target.value) })}
            min="0"
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Доступні товари:</h3>
        {sampleProducts.map(product => (
          <div key={product.id} style={{ marginBottom: '10px' }}>
            {product.name} - {product.price} грн
            <button 
              onClick={() => addToCart(product)}
              style={{ marginLeft: '10px' }}
            >
              Додати в кошик
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Кошик ({state.cart.length} товарів)</h3>
          <button onClick={clearCart} style={{ backgroundColor: '#ff4444', color: 'white' }}>
            Очистити кошик
          </button>
        </div>
        
        {state.cart.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          state.cart.map(item => (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '10px',
              border: '1px solid #eee',
              marginBottom: '5px'
            }}>
              <span>{item.name}</span>
              <span>{item.price} грн × </span>
              <div>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                  style={{ 
                    margin: '0 5px',
                    opacity: item.quantity === 1 ? 0.5 : 1
                  }}
                >
                  –
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ margin: '0 5px' }}
                >
                  +
                </button>
              </div>
              <span>{item.price * item.quantity} грн</span>
              <button 
                onClick={() => removeFromCart(item.id)}
                style={{ color: 'red' }}
              >
                Видалити
              </button>
            </div>
          ))
        )}
      </div>

      {state.cart.length > 0 && (
        <div style={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
          <h3>Загальна сума:</h3>
          <p>Товари: {calcTotal(state.cart)} грн</p>
          {state.discount > 0 && <p>Знижка: -{state.discount}%</p>}
          {state.tax > 0 && <p>Податок: +{state.tax}%</p>}
          {state.shipping > 0 && <p>Доставка: +{state.shipping} грн</p>}
          <p><strong>До сплати: {total.toFixed(2)} грн</strong></p>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;