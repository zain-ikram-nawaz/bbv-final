import React from 'react'
import VanForSale from '@/components/van/VanForSale'
import { getVan } from '@/api/van/van'

export default async function page() {
  const res = await getVan()
  return (
    <>
    <VanForSale data={res}/>
    </>
  )
}
