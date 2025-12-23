// أنواع البيانات
export interface User {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

// حفظ المستخدم في localStorage
export const saveUser = (user: User): void => {
  // إذا كانت صورة base64 كبيرة جداً، نستخدم الصورة الافتراضية لتجنب تجاوز السعة
  if (user.avatar && user.avatar.length > 200_000) {
    user.avatar = "/default-avatar.png";
  }

  const users = getUsers();
  // التحقق من عدم وجود مستخدم بنفس البريد الإلكتروني
  const existingUser = users.find(u => u.email === user.email);
  if (existingUser) {
    // تحديث بيانات المستخدم الموجود
    const updatedUsers = users.map(u => 
      u.email === user.email ? user : u
    );
    try {
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch {
      const trimmed = updatedUsers.map(u => ({ ...u, avatar: "/default-avatar.png" }));
      localStorage.setItem('users', JSON.stringify(trimmed));
    }
  } else {
    // إضافة مستخدم جديد
    users.push(user);
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch {
      const trimmed = users.map(u => ({ ...u, avatar: "/default-avatar.png" }));
      localStorage.setItem('users', JSON.stringify(trimmed));
    }
  }
  // حفظ المستخدم الحالي المسجل دخوله
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// الحصول على جميع المستخدمين
export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// التحقق من بيانات المستخدم
export const verifyUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    // حفظ المستخدم الحالي المسجل دخوله
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

// الحصول على المستخدم الحالي
export const getCurrentUser = (): User | null => {
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
};

// تسجيل الخروج
export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

// التحقق من وجود مستخدم مسجل دخوله
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// تحديث كلمة المرور
export const updatePassword = (email: string, newPassword: string): boolean => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === email);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    // تحديث المستخدم الحالي إذا كان هو نفسه
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email === email) {
      currentUser.password = newPassword;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    return true;
  }
  return false;
};

// التحقق من وجود البريد الإلكتروني
export const emailExists = (email: string): boolean => {
  const users = getUsers();
  return users.some(u => u.email === email);
};

