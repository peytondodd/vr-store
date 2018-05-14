import React, { Component } from 'react';
import Checkout from './stripe/Checkout'
import CartItem from './CartItem';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUserCart, remFromCart } from './ducks/reducer';


class Cart extends Component {
    constructor() {
        super();

    }

    componentDidMount() {
        this.props.getUserCart();
    }

    subTotal() {
        var subTotal = 0;
        this.props.cart.map((item, index) => {
            subTotal += item.price * item.quantity
        })

        return subTotal;
    }

    tax() {
        var subTotal = this.subTotal()
        return subTotal * .06;
    }

    total() {
        var total = this.subTotal() + this.tax()
        return parseFloat(Math.round(total * 100) / 100).toFixed(2)
    }


    render() {

        const cartItems = this.props.cart.map((item, index) => {
            return (
                <CartItem
                    key={index}
                    item={item}
                    removeFn={this.props.remFromCart}
                />
            )
        })

        return (
            <CartWindow>
                <CartItems>
                    {cartItems}
                </CartItems>
                <CheckoutDiv>
                    <div>
                        <CostAmount>
                            <p>Subtotal:</p>
                            <p>${parseFloat(Math.round(this.subTotal() * 100) / 100).toFixed(2)}</p>
                        </CostAmount>
                        <CostAmount>
                            <p>Tax:</p>
                            <p>${parseFloat(Math.round(this.tax() * 100) / 100).toFixed(2)}</p>
                        </CostAmount>
                        <CostAmount>
                            <p>Total:</p>
                            <p>${this.total()}</p>
                        </CostAmount>
                    </div>
                    <Checkout total={this.total()} />
                </CheckoutDiv>
            </CartWindow>
        )
    }
}

const CartWindow = styled.div`
    display: flex;
    height: auto;
    padding: 80px;
`
const CartItems = styled.div`
    height: auto;
    margin-right: 40px;
    width: 60%;
`
const CheckoutDiv = styled.div`
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    height: 50vh;
    justify-content: space-between;
    padding: 10px;
    width: 30%;
`
const CostAmount = styled.div`
    display: flex;
    justify-content: space-between;
`

function mapStateToProps(state) {
    return {
        cart: state.userCart
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, { getUserCart, remFromCart })(Cart)