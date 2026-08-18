import '../(frontend)/styles.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import BannerCarrusel from '@/components/bannerCarrusel/BannerCarrrusel'
import { TrustStrip } from '@/slices/Home/TrustStrip/TrustStrip'
import { ShoppingCategories } from '@/slices/Home/ShoppingCategories/ShoppingCategories'
import { InspiredProducts } from '@/slices/Home/InspiredProducts/InspiredProducts'
import { ServicesTriafana } from '@/slices/Home/ServicesTriafana/Services'

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
    </div>
  )
}
