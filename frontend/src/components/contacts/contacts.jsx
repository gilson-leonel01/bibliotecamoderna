import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() { 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contactos" className="py-16 bg-red-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Contactos
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Entre em contacto
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome completo"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="tel"
                placeholder="Telefone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="text"
                placeholder="Localização"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <textarea
                placeholder="Descrição"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <button 
                onClick={handleSubmit} 
                className="w-full bg-white text-red-900 py-3 rounded-lg hover:bg-red-100 hover:cursor-pointer transition font-semibold"
              >
                Enviar
              </button>
            </div>
          </div>

          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Localização</h4>
                  <p>Bairro Popular, Rua Do Kibabo</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p>deliciasbovinas@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Telefone</h4>
                  <p>+244 928 826 987 / 923 456 789</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
              <MapPin size={48} className="text-red-900" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
