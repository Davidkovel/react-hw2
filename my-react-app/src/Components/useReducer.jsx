export const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_DISCOUNT: 'SET_DISCOUNT',
  SET_TAX: 'SET_TAX',
  SET_SHIPPING: 'SET_SHIPPING',
  LOAD_CART: 'LOAD_CART'
};

export const initialState = {
  cart: [],
  discount: 0,
  tax: 0,
  shipping: 0
};

export const calcTotal = (cart, discount = 0, tax = 0, shipping = 0) => {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (discount / 100);
  const taxAmount = (subtotal - discountAmount) * (tax / 100);
  return subtotal - discountAmount + taxAmount + shipping;
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case ACTIONS.SET_DISCOUNT:
      return {
        ...state,
        discount: action.payload
      };

    case ACTIONS.SET_TAX:
      return {
        ...state,
        tax: action.payload
      };

    case ACTIONS.SET_SHIPPING:
      return {
        ...state,
        shipping: action.payload
      };

    case ACTIONS.LOAD_CART:
      return {
        ...state,
        cart: action.payload
      };

    default:
      return state;
  }
};

export const getInitialState = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return {
        ...initialState,
        cart: JSON.parse(savedCart)
      };
    }
  } catch (error) {
    console.error('Помилка завантаження кошика:', error);
  }
  return initialState;
};