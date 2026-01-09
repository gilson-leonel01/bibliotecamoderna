import { useState } from 'react';
import { faqsMockup } from '../../mockups/faqsMockup';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 bg-red-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-red-900 mb-12">
          Perguntas Frequentes?
        </h2>

        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Encontre respostas rápidas para suas dúvidas sobre nossos serviços e produtos. Nossa equipe está sempre pronta para ajudar com qualquer informação adicional que você precisar.
        </p>
        
        <div className="space-y-4">
          {faqsMockup.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-red-50 transition"
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>

                <ChevronDown 
                  className={`text-red-900 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
