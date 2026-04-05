'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.scss';

/*
  SENTIRA — Logo-matched Colour System (VIOLET THEME)
  ──────────────────────────────────────────────────
  Violet Mid    : #5b3d8a  (primary brand — transformation, depth)
  Lavender      : #9b7fd4  (accents — peace, mindfulness)
  Lilac         : #c4b0e8  (soft highlights — clarity)
  Mauve         : #d4a0c0  (warmth — emotional connection)
  Deep Violet   : #1A1626  (night base — grounding, stability)
  Warm Ivory    : #f7f4ff  (background — open, welcoming)
  Pure White    : #ffffff  (cleanliness, space)
*/

interface NavLinkItem { label: string; href: string; }

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const LOGO = "/images/sentira-logo-v2.png";

  const links: NavLinkItem[] = [
    { label: 'Home',     href: '#home'     },
    { label: 'Features', href: '#features' },
    { label: 'Pricing',  href: '#pricing'  },
    { label: 'About',    href: '#about'    },
  ];

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <div className={styles.logoRing}>
            <img src={LOGO} alt="Sentira" />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Sentira</span>
          </div>
        </Link>

        <div className={styles.desktopLinks}>
          {links.map(l => <Link key={l.href} href={l.href} className={styles.link}>{l.label}</Link>)}
          <div className={styles.divider} />
          <Link href="/login" className={styles.cta}>Login</Link>
        </div>

        <button className={styles.toggle} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}>{l.label}</Link>
          ))}
          <Link href="/login" className={styles.mobileCta}>Login / Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
