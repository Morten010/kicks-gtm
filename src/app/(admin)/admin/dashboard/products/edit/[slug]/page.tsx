import { CreateProductForm } from "@/src/components";
import { db } from "@/src/lib/db";
import Link from "next/link";
import React from "react"
export const revalidate = 2

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ChangeProductPage(props: Props) {
  const { slug } = await props.params;

  const product = await db.product.findFirst({
    where: {
      slug: slug
    },
    include: {
      productImage: true,
      size: true,
    }
  })

  return (
    <div
      className="h-full"
    >
      {/* product form */}
      <h1
        className='text-xl font-semibold'
      >
        Edit Products
      </h1>
      {product && <CreateProductForm edit={true} product={product} />}
      {/* end of product form */}

      {/* product dont exist */}
      {!product && <div
        className="h-full grid place-content-center text-center"
      >
        <h2
          className="text-3xl font-semibold"
        >
          Product not found :(
        </h2>
        <p>
          Go Back To <Link
            href="/admin/dashboard/products"
            className="underline"
          >
            Products
          </Link>
        </p>
      </div>}
      {/* end of product dont exist */}

    </div>
  )
}
