"use client"
import { useCart } from '@/src/app/store/useCart'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { GiConfirmed } from "react-icons/gi"
import { sendGTMEvent } from '@next/third-parties/google'

export default async function SuccessPage() {
    const { cart, clearCart } = useCart()


    useEffect(() => {
        sendGTMEvent({
            event: 'purchase',
            data: {
                transaction_id: "T_12345_1",
                value: 30.03,
                tax: 4.90,
                shipping: 5.99,
                currency: "USD",
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
                        price: 10.01,
                        quantity: 3
                    }
                ]
            }

        })
        if (cart) {
            clearCart()
        }
    }, [])

    return (
        <div
            className='h-[65vh] text-center grid place-content-center'
        >
            <GiConfirmed className='mx-auto text-8xl text-brand-yellow' />
            <h1 className='text-2xl mt-6 mb-2'>
                Thank you for your purchase!
            </h1>
            <p>
                You should recieve and order confirmation email shortly.
            </p>
            <p>
                Go back To the <Link
                    href="/"
                    className='underline text-brand-blue'
                >
                    Homepage.
                </Link>
            </p>
        </div>
    )
}
