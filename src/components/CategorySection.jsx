const callouts = [
  {
    name: 'New Arrivals',
    description: 'Shop Now',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-featured-category.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '/category',
  },
  {
    name: 'Accessories',
    description: 'Shop Now',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '/category',
  },
  {
    name: 'Workspace',
    description: 'Shop Now',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-02.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '/category',
  },
]

export default function CategorySection() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <img
                  alt={callout.imageAlt}
                  src={callout.imageSrc}
                  className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                />
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.description}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
