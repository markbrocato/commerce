import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { useRouter } from 'next/router'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import getProduct from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import { Layout } from '@components/core'
import { ProductView } from '@components/product'

export async function getServerSideProps({
  params,
  locale,
  preview,
}: GetServerSidePropsContext<{ slug: string }>) {
  const config = getConfig({ locale })

  const { pages } = await getAllPages({ config, preview })
  const { product } = await getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: { pages, product },
  }
}

export default function Slug({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <ProductView product={product} />
  )
}

Slug.Layout = Layout
