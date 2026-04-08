const Footer = () => {
  const LOGO = "/images/logo-premium.png";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap');

        .ftr {
          background:#042d26; padding:5rem 0 2.5rem;
          border-top:2px solid rgba(201,168,76,0.25);
          position:relative; overflow:hidden;
        }

        /* Gold shimmer top line */
        .ftr::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,#c9a84c,#e8c97a,#c9a84c,transparent);
        }

        /* Blobs */
        .ftr-blob1 {
          position:absolute; top:-8rem; right:-6rem; width:35vw; height:35vw;
          border-radius:50%; pointer-events:none;
          background:radial-gradient(circle,rgba(10,140,122,0.12) 0%,transparent 70%);
        }
        .ftr-blob2 {
          position:absolute; bottom:-4rem; left:-4rem; width:28vw; height:28vw;
          border-radius:50%; pointer-events:none;
          background:radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%);
        }

        .ftr-wrap {
          max-width:1280px; margin:0 auto; padding:0 clamp(2rem,6vw,7rem);
          position:relative; z-index:1;
        }

        /* Top grid */
        .ftr-top {
          display:grid; grid-template-columns:1.8fr 1fr 1fr 1fr; gap:3rem;
          padding-bottom:3.5rem;
          border-bottom:1px solid rgba(201,168,76,0.15); margin-bottom:2.5rem;
        }

        /* Brand column */
        .ftr-brand { display:flex; flex-direction:column; gap:1.25rem; }
        .ftr-logo-row { display:flex; align-items:center; gap:.9rem; text-decoration:none; }
        .ftr-logo-ring {
          width:52px; height:52px; border-radius:50%; overflow:hidden;
          border:2px solid rgba(201,168,76,0.45); flex-shrink:0;
          box-shadow:0 4px 20px rgba(201,168,76,0.2);
        }
        .ftr-logo-ring img { width:100%; height:100%; object-fit:cover; object-position:center 30%; }
        .ftr-brand-name {
          font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:400;
          color:#faf9f6; letter-spacing:.03em; display:block;
        }
        .ftr-brand-sub {
          font-family:'Jost',sans-serif; font-size:.55rem; font-weight:300;
          letter-spacing:.25em; text-transform:uppercase; color:rgba(201,168,76,.55); display:block; margin-top:2px;
        }

        .ftr-rule { width:40px; height:1px; background:linear-gradient(90deg,#c9a84c,transparent); }

        .ftr-tagline {
          font-family:'Cormorant Garamond',serif; font-size:1rem; font-weight:300;
          font-style:italic; color:rgba(224,244,241,.45); line-height:1.7; max-width:220px;
        }

        /* Social row */
        .ftr-socials { display:flex; gap:.6rem; margin-top:.25rem; }
        .ftr-social {
          width:32px; height:32px; border:1px solid rgba(201,168,76,.2);
          display:flex; align-items:center; justify-content:center;
          font-family:'Jost',sans-serif; font-size:.65rem; font-weight:400;
          color:rgba(201,168,76,.55); text-decoration:none; transition:all .25s;
        }
        .ftr-social:hover { border-color:rgba(201,168,76,.55); color:#c9a84c; background:rgba(201,168,76,0.06); }

        /* Link columns */
        .ftr-col-title {
          font-family:'Jost',sans-serif; font-size:.58rem; font-weight:500;
          letter-spacing:.25em; text-transform:uppercase; color:#c9a84c; margin-bottom:1.5rem;
          display:flex; align-items:center; gap:.5rem;
        }
        .ftr-col-title::after {
          content:''; flex:1; height:1px; background:rgba(201,168,76,0.15);
        }

        .ftr-links { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:.7rem; }
        .ftr-link {
          font-family:'Cormorant Garamond',serif; font-size:1.02rem; font-weight:300;
          color:rgba(224,244,241,.45); text-decoration:none; transition:color .25s;
          display:flex; align-items:center; gap:.4rem;
        }
        .ftr-link::before { content:''; width:4px; height:1px; background:#c9a84c; opacity:0; transition:opacity .25s; flex-shrink:0; }
        .ftr-link:hover { color:#e0f4f1; }
        .ftr-link:hover::before { opacity:1; }

        /* Bottom */
        .ftr-bottom {
          display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;
        }
        .ftr-copy {
          font-family:'Jost',sans-serif; font-size:.58rem; font-weight:300;
          letter-spacing:.12em; text-transform:uppercase; color:rgba(224,244,241,.25);
        }
        .ftr-copy span { color:rgba(201,168,76,.4); }

        .ftr-bot-links { display:flex; gap:2rem; }
        .ftr-bot-link {
          font-family:'Jost',sans-serif; font-size:.58rem; font-weight:300;
          letter-spacing:.12em; text-transform:uppercase;
          color:rgba(224,244,241,.25); text-decoration:none; transition:color .25s;
        }
        .ftr-bot-link:hover { color:rgba(201,168,76,.6); }

        /* Decorative large S */
        .ftr-deco-s {
          position:absolute; bottom:-2rem; right:4rem;
          font-family:'Playfair Display',serif; font-size:18rem; font-weight:700;
          color:rgba(201,168,76,0.04); pointer-events:none; user-select:none; line-height:1;
        }

        @media (max-width:1000px) { .ftr-top { grid-template-columns:1fr 1fr; gap:2.5rem; } }
        @media (max-width:560px) {
          .ftr-top { grid-template-columns:1fr; }
          .ftr-bottom { flex-direction:column; align-items:flex-start; }
        }
      `}</style>

      <footer className="ftr">
        <div className="ftr-blob1" />
        <div className="ftr-blob2" />
        <div className="ftr-deco-s">S</div>

        <div className="ftr-wrap">
          <div className="ftr-top">

            {/* Brand */}
            <div className="ftr-brand">
              <a href="/" className="ftr-logo-row">
                <div className="ftr-logo-ring">
                  <img src={LOGO} alt="Sentira logo" />
                </div>
                <div>
                  <span className="ftr-brand-name">Sentira</span>
                  <span className="ftr-brand-sub">Mind Assistance </span>
                </div>
              </a>
              <div className="ftr-rule" />
              <p className="ftr-tagline">
                Your companion for emotional wellbeing — one mindful day at a time.
              </p>
              <div className="ftr-socials">
                {['Tw','Ig','Li'].map(s => (
                  <a key={s} href="#" className="ftr-social">{s}</a>
                ))}
              </div>
            </div>

            {/* Navigate */}
            <div>
              <div className="ftr-col-title">Navigate</div>
              <ul className="ftr-links">
                <li><a href="#home"     className="ftr-link">Home</a></li>
                <li><a href="#features" className="ftr-link">Features</a></li>
                <li><a href="#about"    className="ftr-link">About</a></li>
              </ul>
            </div>

            {/* Product */}
            <div>
              <div className="ftr-col-title">Product</div>
              <ul className="ftr-links">
                <li><a href="/login"    className="ftr-link">Sign In</a></li>
                <li><a href="/register" className="ftr-link">Get Started</a></li>
                <li><a href="#"         className="ftr-link">Pricing</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div className="ftr-col-title">Legal</div>
              <ul className="ftr-links">
                <li><a href="#" className="ftr-link">Privacy Policy</a></li>
                <li><a href="#" className="ftr-link">Terms of Use</a></li>
                <li><a href="#" className="ftr-link">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="ftr-bottom">
            <span className="ftr-copy">
              © {new Date().getFullYear()} <span>Sentira</span>. All rights reserved.
            </span>
            <div className="ftr-bot-links">
              <a href="#" className="ftr-bot-link">Privacy</a>
              <a href="#" className="ftr-bot-link">Terms</a>
              <a href="#" className="ftr-bot-link">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
