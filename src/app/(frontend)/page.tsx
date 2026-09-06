import '../(frontend)/styles.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import BannerCarrusel from '@/components/bannerCarrusel/BannerCarrrusel'
import { TrustStrip } from '@/slices/Home/TrustStrip/TrustStrip'
import { ShoppingCategories } from '@/slices/Home/ShoppingCategories/ShoppingCategories'
import { InspiredProducts } from '@/app/(frontend)/Product/InspiredProducts/InspiredProducts'
import { ServicesTriafana } from '@/slices/Home/ServicesTriafana/Services'
import { TopSale } from './Product/TopSale/topSale'
import { Promo } from '@/slices/Home/PromoProducts/promo'
import { Offers } from '@/slices/Home/Offers/offers'

// This page queries live CMS content (banners) with no dynamic-API bailout
// (like headers()/cookies()), so Next.js would otherwise try to prerender
// it once at build time and freeze that result into the image — meaning
// new banners added later via /admin would never show up without a full
// rebuild. Forcing dynamic rendering makes it always reflect the live DB.
export const dynamic = 'force-dynamic'

export default async function Home() {
  const payload = await getPayload({
    config,
  })

  const banners = await payload.find({
    collection: 'banners',
    depth: 1,
  })

  return (
    <div className="container">
      <BannerCarrusel banners={banners.docs} />
      <TrustStrip />
      <ShoppingCategories />
      <InspiredProducts />
      <ServicesTriafana />
      <TopSale />
      <Promo />
      <Offers />
    </div>
  )
}
