export default function Home() {
  return (
    <div className="page">
      <header className="nav">
        <div className="nav-left">
          <div className="logo-mark">JL</div>
          <div className="logo-text">
            <span className="logo-title">JennyLauncher</span>
            <span className="logo-sub">by foidstudios</span>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#screens">Screens</a>
          <a href="#download" className="nav-cta">Download</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Your games. Your store. One launcher.</h1>
          <p>
            JennyLauncher is a focused Windows launcher with a built‑in store view,
            red‑accented UI, and a layout tuned for actually playing games.
          </p>

          <div id="download">
            <a
              className="btn-primary"
              href="https://github.com/user-attachments/files/26860575/Form1.zip"
              download="JennyLauncher.zip"
            >
              Download JennyLauncher
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <h2>What JennyLauncher focuses on</h2>
        <p className="section-lead">
          A compact launcher window with a clear split between your games and the store view.
        </p>
      </section>

      <footer className="footer">
        <span>JennyLauncher by foidstudios</span>
        <span>Windows only · Self‑hosted launcher</span>
      </footer>
    </div>
  );
}
