// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-juvelina-mint/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-juvelina-gold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="font-['Ws_Paradose'] text-2xl text-juvelina-gold">Juvelina</span>
            </div>
            <p className="text-gray-600 mb-6">
              Transformando vitalidade em cada gota de bem-estar natural.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'youtube', 'tiktok'].map((social) => (
                <a key={social} href={`https://${social}.com/juvelinaorganics`} aria-label={social} className="text-gray-400 hover:text-juvelina-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Produtos</h3>
            <ul className="space-y-2">
              <li><a href="#beneficios" className="text-gray-600 hover:text-juvelina-gold transition-colors">Benefícios</a></li>
              <li><a href="#absorpcao" className="text-gray-600 hover:text-juvelina-gold transition-colors">Como Funciona</a></li>
              <li><a href="#ingredientes" className="text-gray-600 hover:text-juvelina-gold transition-colors">Ingredientes</a></li>
              <li><a href="#planos" className="text-gray-600 hover:text-juvelina-gold transition-colors">Planos</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#faq" className="text-gray-600 hover:text-juvelina-gold transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-juvelina-gold transition-colors">Política de Envio</a></li>
              <li><a href="#" className="text-gray-600 hover:text-juvelina-gold transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-gray-600 hover:text-juvelina-gold transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">contato@juvelinaorganics.com.br</li>
              <li className="text-gray-600">(11) 99999-9999</li>
              <li className="text-gray-600">Segunda a Sexta, 9h às 18h</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Juvelina Organics. Todos os direitos reservados.</p>
          <p className="mt-2">
            As informações contidas neste site não têm o intuito de substituir orientações médicas. 
            Consulte sempre um profissional de saúde antes de iniciar qualquer suplementação.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;