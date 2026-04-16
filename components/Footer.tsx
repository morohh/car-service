import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.section}>
            <h3>LevService</h3>
            <p>Профессиональный автосервис с многолетним опытом работы</p>
          </div>
          <div className={styles.section}>
            <h3>Контакты</h3>
            <p>+7 (999) 123-45-67</p>
            <p>info@levservice.ru</p>
            <p>г. Москва, ул. Автомобильная, д. 1</p>
          </div>
          <div className={styles.section}>
            <h3>Режим работы</h3>
            <p>Пн-Пт: 9:00 - 20:00</p>
            <p>Сб-Вс: 10:00 - 18:00</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {currentYear} LevService. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
