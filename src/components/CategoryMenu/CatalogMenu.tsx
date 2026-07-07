import Link from 'next/link'
import './CatalogMenu.css'

type Props = {
  active: string
}

export default function CatalogMenu({ active }: Props) {
  const categories = [
    {
      name: 'Todo',
      href: '/store',
      key: 'todo',
    },
    {
      name: 'Tecnología',
      href: '/tecnology',
      key: 'tecnologia',
    },
    {
      name: 'Cosmetiquería',
      href: '/cosmeticsShop',
      key: 'cosmetiqueria',
    },
    {
      name: 'Ropa',
      href: '/clothes',
      key: 'ropa',
    },
  ]

  return (
    <div className="chip-row">
      {categories.map((category) => (
        <Link
          key={category.key}
          href={category.href}
          className={active === category.key ? 'chip is-active' : 'chip'}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
