'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          LevService
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Главная
          </Link>
          <Link href="/services" className={styles.navLink}>
            Услуги
          </Link>
          <Link href="/brands" className={styles.navLink}>
            Марки
          </Link>
          {mounted ? (
            user ? (
              <Link href="/profile" className={styles.navButton}>
                Личный кабинет
              </Link>
            ) : (
              <>
                <Link href="/login" className={styles.navLink}>
                  Вход
                </Link>
                <Link href="/register" className={styles.navButton}>
                  Регистрация
                </Link>
              </>
            )
          ) : (
            <>
              <Link href="/login" className={styles.navLink}>
                Вход
              </Link>
              <Link href="/register" className={styles.navButton}>
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
