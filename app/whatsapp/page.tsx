'use client';

import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function WhatsAppRedirectPage() {
  useEffect(() => {
    // Redirection après un court délai pour être sûr que Vercel Analytics enregistre la page vue
    const timer = setTimeout(() => {
      window.location.href = "https://wa.me/212716014148?text=Bonjour%2C%20je%20souhaite%20avoir%20des%20informations.";
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface px-6 text-center">
      <div className="space-y-6 max-w-sm">
        <Loader2 className="animate-spin text-primary mx-auto" size={40} />
        <h2 className="text-2xl font-headline font-bold text-primary">
          Redirection vers WhatsApp...
        </h2>
        <p className="text-on-surface-variant text-sm">
          Veuillez patienter pendant que nous vous connectons à notre support.
        </p>
      </div>
    </div>
  );
}
