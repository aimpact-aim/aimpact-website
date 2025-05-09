import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2025 AImpact. All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <a href="https://x.com/AImpactToken" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://t.me/AImpactToken" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://discord.gg/AImpact" target="_blank" rel="noopener noreferrer">Discord</a>
          <a href="mailto:info@aimpact.io">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;