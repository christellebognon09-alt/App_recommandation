import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ padding: '20px', background: '#2c3e50', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <div className="logo">MaRecommandation</div>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
        <li>Accueil</li>
        <li>Favoris</li>
        <li>Mon Profil</li>
      </ul>
    </nav>
  );
};

export default Navbar;