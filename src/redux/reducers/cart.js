const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((totalPrice, item) => totalPrice + item.price, 0);

const pizzas = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const currentPizzaItems = state.items[action.payload.id]
        ? [...state.items[action.payload.id].items, action.payload]
        : [action.payload];
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const items = Object.values(newItems).map((obj) => obj.items);
      const allItems = Object.values(items).flat();

      return {
        ...state,
        items: newItems,
        totalCount: allItems.length,
        totalPrice: getTotalPrice(allItems),
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

      const items = Object.values(newItems).map((obj) => obj.items);
      const allItems = Object.values(items).flat();

      return {
        ...state,
        items: newItems,
        totalCount: allItems.length,
        totalPrice: getTotalPrice(allItems),
      };
    }

    case 'MINUS_CART_ITEM': {
      const newItems = {
        ...state.items,
      };
      if (newItems[action.payload].items.length > 1) {
        newItems[action.payload].items.pop();
        newItems[action.payload].totalPrice = getTotalPrice(newItems[action.payload].items);
      }

      const items = Object.values(newItems).map((obj) => obj.items);
      const allItems = Object.values(items).flat();

      return {
        ...state,
        items: newItems,
        totalCount: allItems.length,
        totalPrice: getTotalPrice(allItems),
      };
    }

    case 'PLUS_CART_ITEM': {
      const newItems = {
        ...state.items,
      };
      newItems[action.payload].items.push(newItems[action.payload].items[0]);
      newItems[action.payload].totalPrice = getTotalPrice(newItems[action.payload].items);

      const items = Object.values(newItems).map((obj) => obj.items);
      const allItems = Object.values(items).flat();

      return {
        ...state,
        items: newItems,
        totalCount: allItems.length,
        totalPrice: getTotalPrice(allItems),
      };
    }
    default:
      return state;
  }
};

export default pizzas;
