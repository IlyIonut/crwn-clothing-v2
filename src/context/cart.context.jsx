import { createContext, useEffect, useState } from "react";
import CartItem from "../components/cart-item/cart-item.component";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id );
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id?
        {...cartItem,quantity: cartItem.quantity +1}
        :cartItem
        );
    };
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems,cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (CartItem) => CartItem.id === cartItemToRemove.id
    );

    if(existingCartItem.quantity ===1){
        return cartItems.filter(CartItem => CartItem.id !== cartItemToRemove.id);
    }
   
     return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id?
        {...cartItem,quantity: cartItem.quantity -1}
        :cartItem
        );
    

};

const clearCartItem = (CartItem ,cartItemtoClear) =>{
    return CartItem.filter(CartItem => CartItem.id !== cartItemtoClear.id);
}

export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen:() =>{},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount : 0,
    cartTotal:0
});

export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);

    useEffect(() =>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0)
        setCartCount(newCartCount);
    }, [cartItems])
    useEffect(() =>{
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0)
        setCartTotal(newCartTotal);
    }, [cartItems])
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems,cartItemToRemove));
    }
    const clearItemFromCart = (cartItemtoClear) => {
        setCartItems(clearCartItem(cartItems,cartItemtoClear));
    }

    const value = {isCartOpen,setIsCartOpen, addItemToCart, cartItems, cartCount, cartTotal ,removeItemToCart,clearItemFromCart};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};