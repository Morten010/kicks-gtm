"use client"
import React, { useState } from 'react'
import { useCart } from '../app/store/useCart'
import { formatPrice } from '../app/utils/formatPrice'
import { CartProduct } from '@/types'
import { useZustand } from '../app/store/useZustand'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { sendGTMEvent } from '@next/third-parties/google'

type SummaryProps = {
  whiteBg?: boolean
}

export default function OrderSummary({ whiteBg = false }: SummaryProps) {
  const cart = useZustand(useCart, (state) => state)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const user = useSession()

  if (cart) {
  }
  const handleCheckout = async () => {
    setLoading(true)

    if (!cart.cart) {
      setLoading(false)
      return
    }


    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: cart.cart,
        userId: user.data?.user.id
      })
    })

    if ((response as any).statusCode === 500) {
      setLoading(false)
      return null;
    }

    const data = await response.json()

    if (!data.url) {
      setLoading(false)
      return null
    }

    sendGTMEvent({
      event: 'purchase',
      data: {
        transaction_id: "T_12345_1",
        value: 30.03,
        tax: 4.90,
        shipping: 5.99,
        currency: "USD",
        coupon: "SUMMER_SALE",
        items: [
          {
            item_id: "SKU_12345",
            item_name: "Stan and Friends Tee",
            affiliation: "Google Merchandise Store",
            coupon: "SUMMER_FUN",
            discount: 2.22,
            index: 0,
            item_brand: "Google",
            item_category: "Apparel",
            item_category2: "Adult",
            item_category3: "Shirts",
            item_category4: "Crew",
            item_category5: "Short sleeve",
            item_list_id: "related_products",
            item_list_name: "Related Products",
            item_variant: "green",
            location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
            price: 10.01,
            quantity: 3
          }]
      }
    })

    router.push(data.url)

  }

  return (
    <div
      className={`${whiteBg ? "bg-white" : ""} p-4 rounded-lg w-full flex flex-col gap-2`}
    >
      <h2
        className='text-2xl font-semibold'
      >
        Order Summary
      </h2>
      {/* order summary products list */}
      <div>
        {cart && cart.cart.map((p: CartProduct) => (
          <div
            key={p.id + "_" + p.size}
            className='flex w-full justify-between gap-2'
          >
            <p>
              {p.amount}x {p.name}
            </p>
            <p>{formatPrice(p.price * p.amount)}</p>
          </div>
        ))}

        <div
          className='flex justify-between text-xl font-semibold my-2'
        >
          <h3>Total</h3>
          <p>{formatPrice(cart ? cart.totalPrice : 0)}</p>
        </div>

        {!loading && (
          <button
            onClick={handleCheckout}
            className='secondary-btn w-full text-center'
          >
            Review And Pay
          </button>
        )}
        {loading && (
          <button
            disabled
            className='secondary-btn w-full text-center opacity-80'
          >
            Redirecting...
          </button>
        )}

      </div>
    </div>
  )
}
