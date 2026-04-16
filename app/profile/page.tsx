'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { type Appointment, getAppointments, saveAppointment, deleteAppointment } from '@/lib/storage';
import styles from './Profile.module.css';

const SERVICES = [
  'Ремонт двигателя',
  'Ходовая часть',
  'Автоэлектрика',
  'Замена масла',
  'Кондиционер',
  'Диагностика',
  'Другое',
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  // Форма записи
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('');
  const [formService, setFormService] = useState(SERVICES[0]);
  const [formDescription, setFormDescription] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    setAppointments(getAppointments(user.id));
    setEditName(user.name);
    setEditPhone(user.phone);
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSaveProfile = () => {
    updateProfile(editName, editPhone);
    setEditing(false);
  };

  const handleNewAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formDate || !formTime) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: formDate,
      time: formTime,
      service: formService,
      description: formDescription,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    saveAppointment(user.id, newAppointment);
    setAppointments(getAppointments(user.id));
    setShowForm(false);
    setFormDate('');
    setFormTime('');
    setFormService(SERVICES[0]);
    setFormDescription('');
  };

  const handleCancelAppointment = (id: string) => {
    deleteAppointment(user!.id, id);
    setAppointments(getAppointments(user!.id));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (!mounted || !user) return null;

  const activeAppointments = appointments.filter(a => a.status === 'active');
  const pastAppointments = appointments.filter(a => a.status !== 'active');

  const hasActiveAppointment = activeAppointments.length > 0;

  const handleOpenForm = () => {
    if (hasActiveAppointment) {
      alert('У вас уже есть активная запись. Сначала отмените её, прежде чем создавать новую.');
      return;
    }
    setShowForm(!showForm);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Профиль */}
        <section className={styles.profileSection}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
            <div className={styles.profileInfo}>
              {editing ? (
                <div className={styles.editForm}>
                  <div className={styles.formGroup}>
                    <label>Имя</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Телефон</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                    />
                  </div>
                  <div className={styles.editActions}>
                    <button className={styles.saveBtn} onClick={handleSaveProfile}>Сохранить</button>
                    <button className={styles.cancelBtn} onClick={() => { setEditing(false); setEditName(user.name); setEditPhone(user.phone); }}>Отмена</button>
                  </div>
                </div>
              ) : (
                <>
                  <h1>{user.name}</h1>
                  <p className={styles.email}>{user.email}</p>
                  <p className={styles.phone}>{user.phone}</p>
                  <button className={styles.editBtn} onClick={() => setEditing(true)}>Редактировать</button>
                </>
              )}
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>Выйти</button>
        </section>

        {/* Кнопка новой записи */}
        <section className={styles.actions}>
          <button
            className={styles.newAppointmentBtn}
            onClick={handleOpenForm}
            disabled={hasActiveAppointment}
            title={hasActiveAppointment ? 'У вас уже есть активная запись' : ''}
          >
            {showForm ? 'Отменить' : hasActiveAppointment ? 'У вас уже есть запись' : '+ Записаться на обслуживание'}
          </button>
        </section>

        {/* Форма записи */}
        {showForm && (
          <section className={styles.formSection}>
            <h2>Новая запись</h2>
            <form onSubmit={handleNewAppointment} className={styles.appointmentForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="date">Дата</label>
                  <input
                    type="date"
                    id="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="time">Время</label>
                  <select
                    id="time"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    required
                  >
                    <option value="">Выберите время</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="service">Услуга</label>
                <select
                  id="service"
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  required
                >
                  {SERVICES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Описание проблемы</label>
                <textarea
                  id="description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Опишите, что случилось..."
                  rows={3}
                />
              </div>
              <button type="submit" className={styles.submitBtn}>Записаться</button>
            </form>
          </section>
        )}

        {/* Активные записи */}
        <section className={styles.appointmentsSection}>
          <h2>Текущие записи</h2>
          {activeAppointments.length === 0 ? (
            <p className={styles.empty}>У вас пока нет активных записей</p>
          ) : (
            <div className={styles.appointmentsList}>
              {activeAppointments.map(appt => (
                <div key={appt.id} className={styles.appointmentCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.service}>{appt.service}</span>
                    <span className={`${styles.status} ${styles.active}`}>Активна</span>
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.datetime}>
                      {formatDate(appt.date)} в {appt.time}
                    </p>
                    {appt.description && <p className={styles.description}>{appt.description}</p>}
                  </div>
                  <button className={styles.cancelAppointmentBtn} onClick={() => handleCancelAppointment(appt.id)}>
                    Отменить запись
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* История */}
        {pastAppointments.length > 0 && (
          <section className={styles.historySection}>
            <h2>История записей</h2>
            <div className={styles.appointmentsList}>
              {pastAppointments.map(appt => (
                <div key={appt.id} className={`${styles.appointmentCard} ${styles.past}`}>
                  <div className={styles.cardHeader}>
                    <span className={styles.service}>{appt.service}</span>
                    <span className={`${styles.status} ${appt.status === 'completed' ? styles.completed : styles.cancelled}`}>
                      {appt.status === 'completed' ? 'Завершена' : 'Отменена'}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.datetime}>
                      {formatDate(appt.date)} в {appt.time}
                    </p>
                    {appt.description && <p className={styles.description}>{appt.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
