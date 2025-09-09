import React from 'react';
import VanById from '@/components/van/VanById';
import { getVanBySlug } from '@/api/van/vanBySlug';

export default async function VanForSale({ params }) {
  const { slug } =await params;
  const van = await getVanBySlug(slug)

  return (
 <VanById van={van}/>
  );
}
