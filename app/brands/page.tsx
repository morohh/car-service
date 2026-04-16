'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './Brands.module.css';

interface Brand {
  name: string;
  logo: string;
}

interface BrandGroup {
  country: string;
  flag: string;
  brands: Brand[];
}

const BRAND_GROUPS: BrandGroup[] = [
  {
    country: 'Германия',
    flag: '🇩🇪',
    brands: [
      { name: 'BMW', logo: 'BMW' },
      { name: 'Mercedes-Benz', logo: 'MB' },
      { name: 'Audi', logo: 'Au' },
      { name: 'Volkswagen', logo: 'VW' },
      { name: 'Porsche', logo: 'Po' },
      { name: 'Opel', logo: 'Op' },
    ],
  },
  {
    country: 'Япония',
    flag: '🇯🇵',
    brands: [
      { name: 'Toyota', logo: 'To' },
      { name: 'Honda', logo: 'Ho' },
      { name: 'Nissan', logo: 'Ni' },
      { name: 'Mazda', logo: 'Ma' },
      { name: 'Mitsubishi', logo: 'Mi' },
      { name: 'Subaru', logo: 'Su' },
      { name: 'Suzuki', logo: 'Sz' },
      { name: 'Lexus', logo: 'Le' },
      { name: 'Infiniti', logo: 'In' },
      { name: 'Acura', logo: 'Ac' },
    ],
  },
  {
    country: 'Корея',
    flag: '🇰🇷',
    brands: [
      { name: 'Hyundai', logo: 'Hy' },
      { name: 'Kia', logo: 'Ki' },
      { name: 'Genesis', logo: 'Ge' },
      { name: 'SsangYong', logo: 'SY' },
    ],
  },
  {
    country: 'Китай',
    flag: '🇨🇳',
    brands: [
      { name: 'Chery', logo: 'Ch' },
      { name: 'Haval', logo: 'Ha' },
      { name: 'Geely', logo: 'Gl' },
      { name: 'Changan', logo: 'CA' },
      { name: 'Jetour', logo: 'JT' },
      { name: 'Exeed', logo: 'Ex' },
      { name: 'Tank', logo: 'Tk' },
      { name: 'Zeekr', logo: 'Zk' },
      { name: 'Li Auto', logo: 'Li' },
      { name: 'BYD', logo: 'BY' },
      { name: 'Omoda', logo: 'Om' },
      { name: 'Jaecoo', logo: 'Ja' },
      { name: 'GAC', logo: 'GA' },
      { name: 'FAW', logo: 'FA' },
      { name: 'JAC', logo: 'JC' },
      { name: 'Dongfeng', logo: 'DF' },
    ],
  },
  {
    country: 'США',
    flag: '🇺🇸',
    brands: [
      { name: 'Ford', logo: 'Fo' },
      { name: 'Chevrolet', logo: 'CH' },
      { name: 'Cadillac', logo: 'Cd' },
      { name: 'Jeep', logo: 'Jp' },
      { name: 'Dodge', logo: 'Do' },
      { name: 'Tesla', logo: 'Ts' },
    ],
  },
  {
    country: 'Франция',
    flag: '🇫🇷',
    brands: [
      { name: 'Renault', logo: 'Re' },
      { name: 'Peugeot', logo: 'Pe' },
      { name: 'Citroen', logo: 'Ci' },
    ],
  },
  {
    country: 'Великобритания',
    flag: '🇬🇧',
    brands: [
      { name: 'Land Rover', logo: 'LR' },
      { name: 'Jaguar', logo: 'Jg' },
      { name: 'Mini', logo: 'MN' },
      { name: 'Bentley', logo: 'Be' },
    ],
  },
  {
    country: 'Италия',
    flag: '🇮🇹',
    brands: [
      { name: 'Fiat', logo: 'Fi' },
      { name: 'Alfa Romeo', logo: 'AR' },
    ],
  },
  {
    country: 'Чехия',
    flag: '🇨🇿',
    brands: [
      { name: 'Skoda', logo: 'Sk' },
    ],
  },
  {
    country: 'Швеция',
    flag: '🇸🇪',
    brands: [
      { name: 'Volvo', logo: 'Vo' },
    ],
  },
];

const ALL_BRANDS = BRAND_GROUPS.flatMap(g => g.brands);

export default function BrandsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = BRAND_GROUPS.map(group => ({
    ...group,
    brands: group.brands.filter(brand =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(group => group.brands.length > 0);

  const handleBook = (brandName: string) => {
    if (user) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.header}>
          <h1>Марки автомобилей</h1>
          <p>Обслуживаем автомобили всех марок — от классических до современных китайских брендов</p>

          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Найти марку..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </section>

        {filteredGroups.length === 0 ? (
          <div className={styles.noResults}>
            <p>Ничего не найдено по запросу &laquo;{searchQuery}&raquo;</p>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <section key={group.country} className={styles.groupSection}>
              <div className={styles.groupHeader}>
                <span className={styles.flag}>{group.flag}</span>
                <h2>{group.country}</h2>
                <span className={styles.count}>{group.brands.length} марок</span>
              </div>
              <div className={styles.brandsGrid}>
                {group.brands.map((brand) => (
                  <div key={brand.name} className={styles.brandCard}>
                    <div className={styles.brandLogo}>{brand.logo}</div>
                    <h3>{brand.name}</h3>
                    <button
                      className={styles.bookBtn}
                      onClick={() => handleBook(brand.name)}
                    >
                      Записаться
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}

        <section className={styles.ctaSection}>
          <h2>Не нашли свою марку?</h2>
          <p>Мы работаем со всеми автомобилями. Позвоните нам или оставьте заявку</p>
          <div className={styles.ctaActions}>
            <button className={styles.ctaBtn} onClick={() => router.push('/profile')}>
              Записаться на обслуживание
            </button>
            <a href="tel:+79991234567" className={styles.phoneLink}>
              +7 (999) 123-45-67
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
