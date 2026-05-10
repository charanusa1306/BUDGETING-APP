'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

const transactions = [
  { label: 'Salary', amount: 2000, balance: 2000, type: 'income', date: 'Today' },
  { label: 'Rent', amount: -150, balance: 1850, type: 'expense', date: 'Yesterday' },
  { label: 'Lunch', amount: -25, balance: 1825, type: 'expense', date: '2 days ago' },
  { label: 'Refund', amount: 100, balance: 1925, type: 'income', date: '3 days ago' },
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedInUser');
    if (!loggedIn) {
      router.push('/');
    } else {
      setUser(loggedIn);
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    router.push('/');
  }

  if (!user) return null;

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const currentBalance = transactions[transactions.length - 1].balance;

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>💰</div>
            <span className={styles.logoText}>BudgetMate</span>
          </div>
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <div className={styles.userIcon}>{user[0].toUpperCase()}</div>
              <span className={styles.username}>{user}</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Track your expenses and manage your budget</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💵</div>
            <div className={styles.statLabel}>Current Balance</div>
            <div className={styles.statValue}>₹{currentBalance}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📈</div>
            <div className={styles.statLabel}>Total Income</div>
            <div className={`${styles.statValue} ${styles.positive}`}>+₹{totalIncome}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📉</div>
            <div className={styles.statLabel}>Total Expenses</div>
            <div className={`${styles.statValue} ${styles.negative}`}>-₹{totalExpense}</div>
          </div>
        </div>

        <div className={styles.transactionSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Transactions</h2>
            <button className={styles.addBtn}>+ Add Transaction</button>
          </div>

          <div className={styles.transactionList}>
            {transactions.map((t, i) => (
              <div key={i} className={styles.transaction}>
                <div className={styles.transactionLeft}>
                  <div className={`${styles.transactionIcon} ${t.type === 'income' ? styles.income : styles.expense}`}>
                    {t.type === 'income' ? '💰' : '💸'}
                  </div>
                  <div className={styles.transactionInfo}>
                    <div className={styles.transactionLabel}>{t.label}</div>
                    <div className={styles.transactionDate}>{t.date}</div>
                  </div>
                </div>
                <div className={styles.transactionRight}>
                  <div className={`${styles.transactionAmount} ${t.amount > 0 ? styles.positive : styles.negative}`}>
                    {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount)}
                  </div>
                  <div className={styles.transactionBalance}>Balance: ₹{t.balance}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
