import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [coins] = useState(180);
  const [cleanups] = useState(42);
  const [rank] = useState(15);
  const [todayCleanups] = useState(1);
  const maxCleanups = 2;
  const targetCoins = 200;
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Clean", path: "/clean" },
    { label: "Leaderboard", path: "/" },
    { label: "Rewards", path: "/" },
  ];

  const activities = [
    { id: 1, location: "MG Road, Bangalore", time: "2 hours ago", coins: +10, type: "earn" },
    { id: 2, location: "Connaught Place, Delhi", time: "5 hours ago", coins: +10, type: "earn" },
    { id: 3, location: "Zomato 20% Discount Redeemed", time: "1 day ago", coins: -200, type: "spend" },
  ];

  const progressPercent = Math.min((coins / targetCoins) * 100, 100);

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <span style={{ color: "#4ade80" }}>●</span>{" "}
          <span style={{ color: "white" }}>Swachh</span>
          <span style={{ color: "#4ade80" }}>Coin</span>
        </div>
        <div style={styles.navLinks}>
          {navItems.map((item) => (
            <span
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.navItem,
                ...(item.label === "Dashboard" ? styles.navActive : {}),
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
        <button style={styles.getStartedBtn}>→ Get Started</button>
      </nav>

      <div style={styles.content}>
        <h1 style={styles.welcomeTitle}>
          Welcome back, <span style={{ color: "#4ade80" }}>Cleaner</span> 🧹
        </h1>
        <p style={styles.subtitle}>Keep cleaning, keep earning!</p>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={{ fontSize: 28 }}>🪙</span>
            <div style={{ ...styles.statNumber, color: "#facc15" }}>{coins}</div>
            <div style={styles.statLabel}>Total Coins</div>
          </div>
          <div style={styles.statCard}>
            <span style={{ fontSize: 28 }}>📷</span>
            <div style={{ ...styles.statNumber, color: "#4ade80" }}>{cleanups}</div>
            <div style={styles.statLabel}>Cleanups</div>
          </div>
          <div style={styles.statCard}>
            <span style={{ fontSize: 28 }}>🏆</span>
            <div style={{ ...styles.statNumber, color: "#4ade80" }}>#{rank}</div>
            <div style={styles.statLabel}>Rank</div>
          </div>
          <div style={styles.statCard}>
            <span style={{ fontSize: 28 }}>📅</span>
            <div style={{ ...styles.statNumber, color: "#4ade80" }}>{todayCleanups}/{maxCleanups}</div>
            <div style={styles.statLabel}>Today</div>
          </div>
        </div>

        <div style={styles.actionGrid}>
          <div style={styles.startCleanCard}>
            <div style={{ fontSize: 32 }}>📷</div>
            <h2 style={{ margin: "8px 0 4px", fontSize: 22 }}>Start Cleaning</h2>
            <p style={{ margin: 0, opacity: 0.85 }}>{maxCleanups - todayCleanups} cleanup remaining today</p>
            <button style={styles.arrowBtn} onClick={() => navigate("/clean")}>→</button>
          </div>
          <div style={styles.redeemCard}>
            <div style={{ fontSize: 28 }}>🎁</div>
            <h2 style={{ margin: "8px 0 4px", fontSize: 22, color: "white" }}>Redeem Coins</h2>
            <p style={{ margin: 0, color: "#9ca3af" }}>{targetCoins - coins} more coins for your first reward</p>
            <button style={{ ...styles.arrowBtn, color: "#4ade80" }}>→</button>
          </div>
        </div>

        <div style={styles.progressCard}>
          <div style={styles.progressHeader}>
            <span style={{ color: "#4ade80" }}>📈 Progress to Next Reward</span>
            <span style={{ color: "white", fontWeight: "bold" }}>{coins}/{targetCoins} coins</span>
          </div>
          <div style={styles.progressBarBg}>
            <div style={{ ...styles.progressBarFill, width: `${progressPercent}%` }} />
          </div>
          <p style={{ color: "#6b7280", margin: "8px 0 0", fontSize: 13 }}>
            Collect {targetCoins} coins for a 20% discount at partner stores
          </p>
        </div>

        <div style={styles.activityCard}>
          <h2 style={{ color: "white", margin: "0 0 16px" }}>Recent Activity</h2>
          {activities.map((act, i) => (
            <div key={act.id}>
              <div style={styles.activityRow}>
                <div style={styles.activityIcon}>{act.type === "earn" ? "📷" : "🎟️"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "white", fontWeight: 500 }}>{act.location}</div>
                  <div style={{ color: "#6b7280", fontSize: 13 }}>{act.time}</div>
                </div>
                <div style={{ color: act.coins > 0 ? "#4ade80" : "#f87171", fontWeight: "bold", fontSize: 16 }}>
                  {act.coins > 0 ? `+${act.coins}` : act.coins} 🪙
                </div>
              </div>
              {i < activities.length - 1 && <hr style={styles.divider} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { background: "#0a0a0a", minHeight: "100vh", fontFamily: "Inter, sans-serif" },
  navbar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", borderBottom: "1px solid #1f1f1f", background: "#0a0a0a" },
  logo: { fontSize: 20, fontWeight: "bold", letterSpacing: 1 },
  navLinks: { display: "flex", gap: 24 },
  navItem: { color: "#9ca3af", cursor: "pointer", fontSize: 15 },
  navActive: { color: "white", background: "#1f1f1f", padding: "6px 16px", borderRadius: 8, fontWeight: 600 },
  getStartedBtn: { background: "#4ade80", color: "#000", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14 },
  content: { maxWidth: 900, margin: "0 auto", padding: "32px 24px" },
  welcomeTitle: { color: "white", fontSize: 32, fontWeight: 700, margin: "0 0 6px" },
  subtitle: { color: "#9ca3af", margin: "0 0 28px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 },
  statCard: { background: "#111", border: "1px solid #1f1f1f", borderRadius: 12, padding: "20px", textAlign: "center" },
  statNumber: { fontSize: 32, fontWeight: 800, margin: "6px 0 4px" },
  statLabel: { color: "#9ca3af", fontSize: 13 },
  actionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 },
  startCleanCard: { background: "linear-gradient(135deg, #16a34a, #4ade80)", borderRadius: 16, padding: "28px", color: "white" },
  redeemCard: { background: "#111", border: "1px solid #1f1f1f", borderRadius: 16, padding: "28px" },
  arrowBtn: { background: "rgba(0,0,0,0.2)", border: "none", color: "white", fontSize: 20, borderRadius: 8, padding: "6px 14px", cursor: "pointer", marginTop: 12 },
  progressCard: { background: "#111", border: "1px solid #1f1f1f", borderRadius: 16, padding: "24px", marginBottom: 24 },
  progressHeader: { display: "flex", justifyContent: "space-between", marginBottom: 12 },
  progressBarBg: { background: "#1f1f1f", borderRadius: 99, height: 12 },
  progressBarFill: { background: "linear-gradient(to right, #16a34a, #4ade80)", borderRadius: 99, height: "100%", transition: "width 0.5s" },
  activityCard: { background: "#111", border: "1px solid #1f1f1f", borderRadius: 16, padding: "24px" },
  activityRow: { display: "flex", alignItems: "center", gap: 14, padding: "12px 0" },
  activityIcon: { background: "#1f1f1f", borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  divider: { border: "none", borderTop: "1px solid #1f1f1f", margin: 0 },
};

export default Dashboard;