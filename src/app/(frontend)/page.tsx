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
