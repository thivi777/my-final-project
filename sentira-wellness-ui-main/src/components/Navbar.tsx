'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.scss';

/*
  SENTIRA — Logo-matched Colour System
  ──────────────────────────────────────────
  Logo bg teal  : #0a8c7a  (primary teal — trust, growth, healing)
  Logo gold     : #c9a84c  (gold accent — warmth, optimism, value)
  Deep teal     : #065a4e  (dark sections — depth, grounding)
  Mid teal      : #0d7a6a  (hover states)
  Pale teal bg  : #f0faf8  (light sections — fresh, open)
  Soft teal     : #e0f4f1  (subtle tints)
  Muted gold    : #e8c97a  (light gold tints)
  Off-white     : #faf9f6  (warm neutral background)
  Dark          : #042d26  (headings, deep text)
  Body text     : #2a4a44  (readable dark teal-grey)
*/

interface NavLinkItem { label: string; href: string; }

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const LOGO = "/images/logo-premium.png";

  const links: NavLinkItem[] = [
    { label: 'Home',     href: '#home'     },
    { label: 'Features', href: '#features' },
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
          <Link href="/login" className={styles.cta}>Begin</Link>
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
