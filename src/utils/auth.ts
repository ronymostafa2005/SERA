export interface User {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const saveUser = (user: User): void => {
  if (user.avatar && user.avatar.length > 200_000) {
    user.avatar = "/default-avatar.png";
  }

  const users = getUsers();
  const existingUser = users.find(u => u.email === user.email);
  if (existingUser) {
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
    users.push(user);
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch {
      const trimmed = users.map(u => ({ ...u, avatar: "/default-avatar.png" }));
      localStorage.setItem('users', JSON.stringify(trimmed));
    }
  }
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const verifyUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

export const getCurrentUser = (): User | null => {
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
};

export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const updatePassword = (email: string, newPassword: string): boolean => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === email);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email === email) {
      currentUser.password = newPassword;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    return true;
  }
  return false;
};

export const emailExists = (email: string): boolean => {
  const users = getUsers();
  return users.some(u => u.email === email);
};

