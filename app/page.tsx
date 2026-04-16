'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './Home.module.css';

export default function Home() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.page}>
      {/* Hero секция */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Добро пожаловать в LevService</h1>
          <p>Профессиональный автосервис с многолетним опытом работы. Мы заботимся о вашем автомобиле как о своём.</p>
          <div className={styles.heroButtons}>
            <Link href="/profile" className={styles.primaryButton}>
              Записаться онлайн
            </Link>
            <Link href="/brands" className={styles.secondaryButton}>
              Все марки
            </Link>
          </div>
        </div>
      </section>

      {/* О нас */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2>О нашем автосервисе</h2>
          <p className={styles.description}>
            LevService — это команда профессиональных автомехаников с более чем 10-летним опытом работы. 
            Мы предоставляем полный спектр услуг по ремонту и обслуживанию автомобилей любых марок и моделей. 
            Наша цель — качественное выполнение работ в оговоренные сроки.
          </p>
        </div>
      </section>

      {/* Услуги */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.container}>
          <h2>Наши услуги</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3>Ремонт двигателя</h3>
              <p>Капитальный и текущий ремонт двигателей всех типов</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Ходовая часть</h3>
              <p>Диагностика и ремонт подвески, рулевого управления</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Автоэлектрика</h3>
              <p>Диагностика и ремонт электрических систем автомобиля</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Замена масла</h3>
              <p>Замена масла и технических жидкостей</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Кондиционер</h3>
              <p>Заправка и обслуживание автомобильных кондиционеров</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Диагностика</h3>
              <p>Компьютерная диагностика всех систем автомобиля</p>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2>Почему выбирают нас</h2>
          <div className={styles.advantagesGrid}>
            <div className={styles.advantageItem}>
              <h3>✓ Гарантия качества</h3>
              <p>Предоставляем гарантию на все выполненные работы и установленные запчасти</p>
            </div>
            <div className={styles.advantageItem}>
              <h3>✓ Прозрачные цены</h3>
              <p>Фиксированная стоимость работ без скрытых платежей и доплат</p>
            </div>
            <div className={styles.advantageItem}>
              <h3>✓ Быстрые сроки</h3>
              <p>Выполняем большинство работ в день обращения</p>
            </div>
            <div className={styles.advantageItem}>
              <h3>✓ Опытные мастера</h3>
              <p>Наши специалисты имеют многолетний опыт и регулярно повышают квалификацию</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      {mounted && !user && (
        <section className={`${styles.section} ${styles.ctaSection}`}>
          <div className={styles.container}>
            <h2>Готовы записаться?</h2>
            <p>Зарегистрируйтесь на сайте и запишитесь на обслуживание в удобное для вас время</p>
            <Link href="/register" className={styles.ctaButton}>
              Зарегистрироваться
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
