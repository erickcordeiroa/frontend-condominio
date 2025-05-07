import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 shadow-inner px-6 py-6 text-sm text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div>
          <p className="font-semibold mb-1">São Vicente</p>
          <p>Av. Manoel da Nobrega, 1.835 - Itararé - Cep 11320-931</p>

          <p className="font-semibold mt-4 mb-1">Santos</p>
          <p>Rua Pedro Borges Gonçalves, 06 - José Menino - Cep 11065-300</p>
        </div>

        <div className="space-y-3">
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-700" />
            <a
              href="mailto:portaria@edificiointernacional.com.br"
              className="text-blue-600 hover:underline"
            >
              portaria@edificiointernacional.com.br
            </a>
          </p>

          <p className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-green-600" />
            <a
              href="https://wa.me/5513996304781"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              13 99630-4781
            </a>
          </p>

          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-700" />
            <span>13 3468-5729</span>
          </p>
        </div>
      </div>

      <div className="mt-6 border-t pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Edifício Internacional. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;