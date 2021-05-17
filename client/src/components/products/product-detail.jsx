import React from 'react';

const ProductDetail = (id, name, image, amount, txCode ) => {
    return (
        <section class="row product-section">
            <div class="col-md-6">
                <div class="product__img">
                <img src="https://wallpapercave.com/wp/wp4410917.jpg" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="product__details">
                    <div class="product__details-title">
                        <h4>Fortnite (Standard Edition)</h4>
                        <button><ph-heart /></button>
                    </div>
                    <div class="product__details-content">
                        Use Bitcoin or altcoins on Fortnite V-Bucks. Pay with Bitcoin,
                        Lightning, Dash, Dogecoin, Litecoin or Ethereum. Instant email delivery.
                        No account required. Start living on crypto!
                    </div>
            
                    <ul class="product__details-prices mt-10">
                        {[1,2,3,4,5].map((price, i) => 
                        <li key={i}>
                            <input type="radio" class="mr-2"/>
                            <div class="product__details-prices__price">
                                <span>5000-V-Bucks</span>
                                <span class="value">0.00071487 USD</span>
                            </div>
                        </li>)}
                    </ul>
                    <div class="product__details-prices mt-10">
                        <div class="input-field">
                            <p>Customer</p>
                            <div class="input-con">
                                <input v-model="customer" type="text" placeholder="0123456789" required />
                            </div>
                        </div>
                        <div class="input-field">
                            <p>Amount</p>
                            <div class="input-con">
                                <input v-model="amount" type="number" placeholder="500" required />
                            </div>
                        </div>
                        <div class="input-field">
                            <p>Note</p>
                            <div class="input-con">
                                <input v-model="note" type="text" placeholder="Buying airtime for john doe" required />
                            </div>
                        </div>
                        <div class="input-field">
                            <p>Passphrase</p>
                            <div class="input-con">
                                <input
                                v-model="passphrase"
                                required
                                type="text"
                                placeholder="Enter wallet passphrase"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="add-cart mt-10 btn--big">
                        Add <span> 20 </span> to cart
                        {/* <ph-shopping-cart-simple class="ml-5" size="16" /> */}
                        </button>
                        <button class="as-gift mt-10 btn--big">
                        Purchase as gift <ph-gift class="ml-5" size="16" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail;