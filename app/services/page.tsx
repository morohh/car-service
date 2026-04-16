'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './Services.module.css';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
}

const SERVICES: Service[] = [
  {
    id: 'engine',
    title: 'Ремонт двигателя',
    description: 'Полный спектр услуг по ремонту и обслуживанию двигателей всех типов. Выполняем как текущий, так и капитальный ремонт с гарантией качества.',
    features: [
      'Диагностика неисправностей двигателя',
      'Капитальный ремонт ДВС',
      'Замена поршневой группы',
      'Ремонт ГБЦ',
      'Замена ремня/цепи ГРМ',
      'Ремонт системы охлаждения',
    ],
    price: 'от 5 000 ₽',
    duration: 'от 2 часов',
  },
  {
    id: 'suspension',
    title: 'Ходовая часть',
    description: 'Диагностика и ремонт элементов подвески, рулевого управления. Обеспечиваем безопасную и комфортную езду.',
    features: [
      'Диагностика подвески',
      'Замена амортизаторов и стоек',
      'Замена рычагов и сайлентблоков',
      'Ремонт рулевой рейки',
      'Развал-схождение',
      'Замена ступичных подшипников',
    ],
    price: 'от 2 000 ₽',
    duration: 'от 1 часа',
  },
  {
    id: 'electrics',
    title: 'Автоэлектрика',
    description: 'Комплексная диагностика и ремонт электрических систем автомобиля. Используем профессиональное оборудование.',
    features: [
      'Компьютерная диагностика',
      'Ремонт электропроводки',
      'Замена генератора и стартера',
      'Ремонт блока управления',
      'Установка доп. оборудования',
      'Поиск и устранение неисправностей',
    ],
    price: 'от 1 500 ₽',
    duration: 'от 1 часа',
  },
  {
    id: 'oil',
    title: 'Замена масла',
    description: 'Замена моторного масла и технических жидкостей. Подберём оптимальное масло для вашего автомобиля.',
    features: [
      'Замена моторного масла',
      'Замена масляного фильтра',
      'Замена трансмиссионного масла',
      'Замена тормозной жидкости',
      'Замена антифриза',
      'Замена жидкости ГУР',
    ],
    price: 'от 500 ₽',
    duration: '30 минут',
  },
  {
    id: 'ac',
    title: 'Кондиционер',
    description: 'Обслуживание и ремонт автомобильных кондиционеров и климат-контроля. Комфорт в любую погоду.',
    features: [
      'Диагностика системы кондиционирования',
      'Заправка кондиционера',
      'Поиск и устранение утечек',
      'Замена компрессора',
      'Замена конденсора',
      'Антибактериальная обработка',
    ],
    price: 'от 1 000 ₽',
    duration: 'от 1 часа',
  },
  {
    id: 'diagnostics',
    title: 'Диагностика',
    description: 'Полная компьютерная диагностика всех систем автомобиля. Выявим проблему до начала ремонта.',
    features: [
      'Диагностика двигателя',
      'Диагностика АКПП',
      'Диагностика ABS/ESP',
      'Диагностика подушек безопасности',
      'Диагностика электрооборудования',
      'Распечатка отчёта',
    ],
    price: 'от 1 000 ₽',
    duration: 'от 30 минут',
  },
];

export default function ServicesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBook = () => {
    if (!mounted) return;
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
          <h1>Наши услуги</h1>
          <p>Полный спектр услуг по ремонту и обслуживанию автомобилей любых марок и моделей</p>
        </section>

        <div className={styles.servicesList}>
          {SERVICES.map((service) => (
            <article key={service.id} className={styles.serviceCard}>
              <div className={styles.cardTop}>
                <div className={styles.cardInfo}>
                  <h2>{service.title}</h2>
                  <div className={styles.meta}>
                    <span className={styles.price}>{service.price}</span>
                    <span className={styles.duration}>{service.duration}</span>
                  </div>
                </div>
              </div>
              <p className={styles.description}>{service.description}</p>
              <ul className={styles.features}>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <div className={styles.cardActions}>
                <button
                  className={styles.bookBtn}
                  onClick={handleBook}
                >
                  Записаться
                </button>
                <Link href="/login" className={styles.loginHint}>
                  Войдите для записи
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
