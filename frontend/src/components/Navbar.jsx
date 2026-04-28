import React from 'react';
import { Plus, User, LogOut } from 'lucide-react';

const Navbar = ({ onAddClick }) => {
  return (
    <nav className="navbar glass" style={{ 
      padding: '0 24px', 
      height: '70px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      margin: '12px 12px 0 12px',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100
    }}>
      <div className="logo" style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
        LOCAL<span style={{ color: 'var(--primary)' }}>MAPS</span>
      </div>

      <div className="nav-actions" style={{ display: 'flex', gap: '16px' }}>
        <button className="btn btn-primary" onClick={onAddClick}>
          <Plus size={20} />
          <span>Ajouter un lieu</span>
        </button>
        <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }}>
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
