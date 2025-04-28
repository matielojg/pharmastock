'use client';

import { useThemeMode } from '@/components/ThemeRegistry';
import { useLogout } from '@/hooks/useLogout';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useRef } from 'react';

interface PushMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function PushMenu({ open, onClose }: PushMenuProps) {
  const { mode, toggleMode } = useThemeMode();
  const logout = useLogout();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuData = [
    { label: 'Medicamentos', icon: 'fas fa-pills', link: '/medicines' },
    { label: 'Dashboard', icon: 'fas fa-chart-line', link: '/dashboard' },
      ];

  const handleMenuClick = useCallback((label: string, link: string) => {
    if (label === 'Tema') {
      toggleMode();
    } else if (label === 'Sair') {
      logout();
    } else {
      router.push(link);
    }
    onClose();
  }, [logout, router, toggleMode, onClose]);

  // Controlar a classe active
  useEffect(() => {
    const menu = document.getElementById('menuprincipal');
    if (!menu) return;
    if (open) menu.classList.add('active');
    else menu.classList.remove('active');
  }, [open]);

  // Fechar clicando fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <div id="menuprincipal" ref={menuRef} className="br-menu push">
      <div className="menu-container">
        <div className="menu-panel h-auto position-static shadow-lg-right">
          {/* Header */}
          <div className="menu-header flex justify-between items-center p-4 border-b">
            <div className="menu-title flex items-center space-x-2">
              <img alt="Logo do sistema /logo.png" src="/logo.png" width={40} />
              <span className="text-lg font-bold">Pharmastock</span>
            </div>
            <div className="menu-close">
              <button className="br-button circle" type="button" aria-label="Fechar o menu" onClick={onClose}>
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="menu-body" role="tree">
            {menuData.map((item, index) => (
              <a 
                key={index}
                id={`menuitem_____${index}`}
                className="menu-item flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                href={item.link}
                onClick={(e) => { e.preventDefault(); handleMenuClick(item.label, item.link); }}
              >
                <span className="icon mr-2">
                  <i className={item.icon} aria-hidden="true"></i>
                </span>
                <span className="content">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="menu-footer p-4 border-t">
            <div className="menu-links mb-4">
              <a href="https://www.gov.br/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <span className="mr-1">Gov.br</span>
                <i className="fas fa-external-link-square-alt" aria-hidden="true"></i>
              </a>
            </div>
            <div className="menu-social mb-4">
              <div className="text-semi-bold mb-1">Redes Sociais</div>
              <div className="flex space-x-2">
                <a className="br-button circle" href="https://facebook.com" aria-label="Compartilhar por Facebook">
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
                <a className="br-button circle" href="https://twitter.com" aria-label="Compartilhar por Twitter">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div className="menu-info text-center text-down-01 text-xs mt-4">
              Todo o conteúdo deste site está publicado sob a licença <strong>Creative Commons Atribuição-SemDerivações 3.0</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
