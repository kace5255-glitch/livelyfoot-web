export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: '活力足 LivelyFoot',
    image: 'https://livelyfoot-hk.com/og-image.jpg',
    url: 'https://livelyfoot-hk.com',
    telephone: '+852-2803-2880',
    priceRange: '$218-$760',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '23:59',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '景光街5號景祥大廈M樓',
      addressLocality: 'Happy Valley',
      addressRegion: 'Hong Kong',
      addressCountry: 'HK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.271,
      longitude: 114.183,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
