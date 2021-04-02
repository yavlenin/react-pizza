const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((totalPrice, item) => totalPrice + item.totalPrice, 0);

const getTotalCount = (arr) => arr.reduce((totalCount, item) => totalCount + item.count, 0);

const pizzas = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const itemName = `${action.payload.id}_${action.payload.size}_${action.payload.type}`;
      const count = state.items[itemName] ? state.items[itemName].count + 1 : 1;
      const newItems = {
        ...state.items,
        [itemName]: {
          id: itemName,
          info: action.payload,
          count,
          totalPrice: action.payload.price * count,
        },
      };

      return {
        ...state,
        items: newItems,
        totalCount: getTotalCount(Object.values(newItems)),
        totalPrice: getTotalPrice(Object.values(newItems)),
      };
    }
    case 'SET_TOTAL_PRICE':
      return {
        ...state,
        totalPrice: action.payload,
      };
    case 'SET_TOTAL_COUNT':
      return {
        ...state,
        totalCount: action.payload,
      };

    case 'CLEAR_CART':
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };

    case 'REMOVE_CART_ITEM': {
      const newItems = {
        ...state.items,
      };
      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        totalCount: getTotalCount(Object.values(newItems)),
        totalPrice: getTotalPrice(Object.values(newItems)),
      };
    }

    case 'MINUS_CART_ITEM': {
      const newItems = {
        ...state.items,
      };
      const item = newItems[action.payload];
      if (item.count > 1) {
        item.count--;
        item.totalPrice = item.info.price * item.count;
      }

      return {
        ...state,
        items: newItems,
        totalCount: getTotalCount(Object.values(newItems)),
        totalPrice: getTotalPrice(Object.values(newItems)),
      };
    }

    case 'PLUS_CART_ITEM': {
      const newItems = {
        ...state.items,
      };
      const item = newItems[action.payload];
      item.count++;
      item.totalPrice = item.info.price * item.count;

      return {
        ...state,
        items: newItems,
        totalCount: getTotalCount(Object.values(newItems)),
        totalPrice: getTotalPrice(Object.values(newItems)),
      };
    }
    default:
      return state;
  }
};

export default pizzas;
