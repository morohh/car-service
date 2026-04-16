export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  description: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

const USERS_KEY = 'levservice_users';
const CURRENT_USER_KEY = 'levservice_current_user';
const APPOINTMENTS_KEY = 'levservice_appointments';

function getItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Пользователи
export function getUsers(): User[] {
  return getItem<User[]>(USERS_KEY) || [];
}

export function saveUsers(users: User[]): void {
  setItem<User[]>(USERS_KEY, users);
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(name: string, email: string, phone: string, password: string): User {
  const users = getUsers();
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    password,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

// Текущий пользователь
export function getCurrentUser(): User | null {
  return getItem<User>(CURRENT_USER_KEY);
}

export function setCurrentUser(user: User): void {
  setItem<User>(CURRENT_USER_KEY, user);
}

export function logoutUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Записи
export function getAppointments(userId: string): Appointment[] {
  const all = getItem<Record<string, Appointment[]>>(APPOINTMENTS_KEY) || {};
  return all[userId] || [];
}

export function saveAppointment(userId: string, appointment: Appointment): void {
  const all = getItem<Record<string, Appointment[]>>(APPOINTMENTS_KEY) || {};
  if (!all[userId]) all[userId] = [];
  all[userId].push(appointment);
  setItem<Record<string, Appointment[]>>(APPOINTMENTS_KEY, all);
}

export function updateAppointmentStatus(userId: string, appointmentId: string, status: Appointment['status']): void {
  const all = getItem<Record<string, Appointment[]>>(APPOINTMENTS_KEY) || {};
  if (all[userId]) {
    const idx = all[userId].findIndex(a => a.id === appointmentId);
    if (idx !== -1) {
      all[userId][idx].status = status;
      setItem<Record<string, Appointment[]>>(APPOINTMENTS_KEY, all);
    }
  }
}

export function deleteAppointment(userId: string, appointmentId: string): void {
  const all = getItem<Record<string, Appointment[]>>(APPOINTMENTS_KEY) || {};
  if (all[userId]) {
    all[userId] = all[userId].filter(a => a.id !== appointmentId);
    setItem<Record<string, Appointment[]>>(APPOINTMENTS_KEY, all);
  }
}
