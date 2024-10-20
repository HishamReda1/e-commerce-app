import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import $ from 'jquery';
import { useNavigate } from 'react-router';

export const cartContext = createContext()
const CartContext = ({ children }, { userdata }) => {
    const navigate = useNavigate()
    const [numberOfCart, setnumberOfCart] = useState(0);
    const [wishlistCount, setwishlistCount] = useState(0);
    const [totalCartPrice, settotalCartPrice] = useState(0);
    const [cartProducts, setcartProducts] = useState(null);
    const [cartId, setcartId] = useState(null);
    const [wishlistProducts, setwishlistProducts] = useState(null);
    async function getCart() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {

                headers: { 'token': localStorage.getItem('tkn') }
            })
            if (data.status === 'success') {
                setnumberOfCart(data.numOfCartItems)
                settotalCartPrice(data.data.totalCartPrice)
                setcartProducts(data.data.products)
                setcartId(data.data._id)
               
            }
        } catch (error) {
            if (error.response.status == 404) {
                $('.errMsgCart').fadeIn(500)
               
              
                   
                
                navigate('/home')
                
            }
            
            console.log(error);
        }


    }
    async function addProduct(proId) {

        try {

            const { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/cart', {
                "productId": proId



            }, {

                headers: { 'token': localStorage.getItem('tkn') }
            })

            console.log(data);
            if (data.status == 'success' && userdata !== null) {
                toast.success(data.message);
                $('#btnS').fadeOut(500)
                $('#btnE').fadeIn(500)
                setnumberOfCart(data.numOfCartItems) 
                setcartId(data.data._id)
                setcartProducts(data.data.products)
                getCart()
                console.log(data.numOfCartItems);
              
            }

        }

        catch (error) {
            navigate('/Login')
            console.log(error);

        }

    }
    async function removeProduct(id) {
        try {
            const { data } = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
                {
                    headers: { 'token': localStorage.getItem('tkn') }

                }
            )
            console.log(data);
            if (data.status == 'success' && userdata !== null) {
                setnumberOfCart(data.numOfCartItems)
                settotalCartPrice(data.data.totalCartPrice)
                setcartProducts(data.data.products)
                 getCart()
                toast.error("Product removed successfully from your cart");
                $('#btnS').fadeIn(500)
                $('#btnE').fadeOut(500)
               

            }
        } catch (error) {

        }

    }
    async function updateProductCount(id, count) {
        try {
            const { data } = await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
                { "count": count },

                {
                    headers: { 'token': localStorage.getItem('tkn') }

                }
            )
            console.log(data);
            if (data.status == 'success' && userdata !== null) {
                setnumberOfCart(data.numOfCartItems)
                settotalCartPrice(data.data.totalCartPrice)
                setcartProducts(data.data.products)


            }
        } catch (error) {

        }

    }
    //-----------------------------------------------------------------------------------
    async function getwishlist() {
        try {
            const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist', {
                headers: { 'token': localStorage.getItem('tkn') }
            })
            if (data.status === 'success') {
                setwishlistCount(data.data.length)
                setwishlistProducts(data.data)


            }
        }
        catch (error) {
            if (error.response.status == 404) {
                toast.error('No wishlist exist for this user');
                navigate('/home')
            }
            console.log(error);
        }
    }
    async function addProductwishlist(proId) {

        try {

            const { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist', {
                "productId": proId



            }, {

                headers: { 'token': localStorage.getItem('tkn') }
            })

            console.log(data);
            if (data.status == 'success' && userdata !== null) {
                toast.success(data.message);
                $('#loveS').fadeOut(500)
                $('#loveE').fadeIn(500)
               
                setwishlistCount(data.data.length)
                getwishlist()
                 console.log(data.data.length)


            }

        }

        catch (error) {
            navigate('/Login')
            console.log(error);

        }

    }
    async function removeProductwishlist(id) {
        try {
            const { data } = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,
                {
                    headers: { 'token': localStorage.getItem('tkn') }

                }
            )
            console.log(data);
            if (data.status == 'success' && userdata !== null) {
                
                setwishlistProducts(data.data)
                setwishlistCount(data.data.length)
                getwishlist()
                toast.error("Product removed successfully from your wishlist");
                $('#loveS').fadeIn(500)
                $('#loveE').fadeOut(500)

            }
        } catch (error) {

        }

    }

    useEffect(function(){
        getwishlist();
      },[])
      
      useEffect(function(){
        getCart();
      },[])


    return (
        <cartContext.Provider value={{ addProduct, cartId, numberOfCart, totalCartPrice, cartProducts, removeProduct, updateProductCount, addProductwishlist, getwishlist, wishlistProducts, wishlistCount, removeProductwishlist,getwishlist,getCart }}>
            {children}
        </cartContext.Provider>
    );
}

export default CartContext;
