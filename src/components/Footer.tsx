import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="h-[60px] bg-slate-100 shadow-inner px-6 py-4 text-center text-sm">
      © {new Date().getFullYear()} Edifício Internacional. Todos os direitos reservados.
    </footer>
  );
};

export default Footer;