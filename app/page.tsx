'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function getUsers(): Record<string, string> {
    return JSON.parse(localStorage.getItem('users') || '{}');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const users = getUsers();

    if (isLogin) {
      if (users[username] === password) {
        localStorage.setItem('loggedInUser', username);
        router.push('/dashboard');
      } else {
        setError('Invalid username or password.');
      }
    } else {
      if (users[username]) {
        setError('Username already exists.');
      } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', username);
        router.push('/dashboard');
      }
    }
  }

  return (
    <main className={styles.authPage}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>💰</div>
          <span className={styles.logoText}>Sree Charan's BudgetMate</span>
        </div>
        <button className={styles.signInBtn}>Get the App</button>
      </header>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>
              Track expenses & manage budgets. Master your finances!
            </h1>
            <p className={styles.heroSubtitle}>
              Simple, powerful budgeting for individuals and teams.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>📊 Real-time expense tracking</div>
              <div className={styles.feature}>👥 Multi-user budget sharing</div>
              <div className={styles.feature}>🔒 Bank-level security</div>
            </div>
          </div>

          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>
              {isLogin ? 'Welcome back!' : 'Create account'}
            </h2>
            <p className={styles.formSubtitle}>
              {isLogin ? 'Login to manage your finances' : 'Sign up to get started'}
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Username</label>
                <input
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button type="submit" className={styles.submitBtn}>
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className={styles.toggle}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
