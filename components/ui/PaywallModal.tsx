'use client';

import { useAppStore } from '@/store/app-store';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Check, Heart, Shield, Zap } from 'lucide-react';

export function PaywallModal() {
  const { isPaywallOpen, setPaywallOpen } = useAppStore();

  const benefits = [
    {
      icon: <Sparkles className="text-secondary" size={18} />,
      title: "Analyse émotionnelle intelligente",
      desc: "Exprimez-vous librement en langage naturel, l'IA comprend votre état d'esprit précis."
    },
    {
      icon: <Zap className="text-secondary" size={18} />,
      title: "Recommandations ciblées",
      desc: "Trouvez instantanément les invocations (douas) les plus pertinentes par rapport à votre vécu."
    },
    {
      icon: <Shield className="text-secondary" size={18} />,
      title: "Respect de la vie privée",
      desc: "Vos données restent locales. Vos recherches ne sont jamais stockées sur nos serveurs."
    },
    {
      icon: <Heart className="text-secondary" size={18} />,
      title: "Soutenir un projet éthique",
      desc: "Aidez-nous à payer les coûts des serveurs de calcul IA et à garder l'application sans publicité."
    }
  ];

  return (
    <AnimatePresence>
      {isPaywallOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPaywallOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-surface-container-lowest border border-outline-variant/30 rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Background glowing gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-full -mr-32 -mt-32 blur-[80px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32 blur-[80px] -z-10"></div>

            {/* Close Button */}
            <button
              onClick={() => setPaywallOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant/70"
            >
              <X size={20} />
            </button>

            {/* Title / Header */}
            <div className="text-center space-y-3 mb-8 pr-6 pl-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mx-auto">
                <Sparkles size={12} className="text-secondary" />
                <span>Assistant Personnel Premium</span>
              </div>
              <h2 className="font-headline text-3xl font-bold text-primary">Débloquez l&apos;Assistant IA</h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                L&apos;application reste <strong>100% gratuite</strong> pour toutes les catégories. Seul cet assistant IA est payant afin de couvrir les frais d&apos;API facturés par Google pour analyser au mieux votre état d&apos;esprit.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4 p-3 bg-surface rounded-2xl border border-outline-variant/20">
                  <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    {benefit.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wide">{benefit.title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Cards (Subscription Choices) */}
            <div className="space-y-4">
              {/* Offer 1: Annual (Most Popular) */}
              <a 
                href="https://buy.stripe.com/8x2fZhdEK14j6NB6yOgbm0j" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group relative p-5 bg-gradient-to-br from-primary to-primary-container border-2 border-primary hover:border-secondary rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Popular badge */}
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-secondary text-white text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                  Recommandé ( -45% )
                </div>
                
                <div className="flex justify-between items-center text-white">
                  <div>
                    <h4 className="font-headline font-bold text-xl mb-1">Abonnement Annuel</h4>
                    <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">12 mois d&apos;accès complet</p>
                  </div>
                  <div className="text-right">
                    <span className="font-headline font-bold text-2xl">12,99 €</span>
                    <p className="text-[9px] opacity-70">soit 1,08 €/mois</p>
                  </div>
                </div>
              </a>

              {/* Offer 2: Monthly */}
              <a 
                href="https://buy.stripe.com/3cIcN59ouaET5Jx6yOgbm0i" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group p-5 bg-surface-container border border-outline-variant/40 hover:border-primary/40 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-headline font-bold text-primary text-lg mb-1">Abonnement Mensuel</h4>
                    <p className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest font-bold">Sans engagement, résiliable à tout moment</p>
                  </div>
                  <div className="text-right">
                    <span className="font-headline font-bold text-xl text-primary">1,99 €</span>
                    <p className="text-[9px] text-on-surface-variant/40">par mois</p>
                  </div>
                </div>
              </a>
            </div>

            {/* Bottom terms disclaimer */}
            <p className="text-[9px] text-on-surface-variant/40 text-center mt-6 leading-relaxed">
              Le paiement est géré de manière 100% sécurisée par notre partenaire Stripe.<br />
              Vos données d&apos;utilisation spirituelles restent strictement locales sur cet appareil.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
