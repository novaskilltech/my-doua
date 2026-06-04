'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Sparkles, Heart, Shield, BookOpen, Smartphone, ChevronDown, CheckCircle, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "D'où proviennent les invocations ?",
      a: "Toutes nos invocations sont tirées directement du Coran et des recueils de Hadiths authentiques (Sahih Al-Bukhari, Sahih Muslim, At-Tirmidhi, Abu Dawud, etc.). Chaque doua est accompagné de sa source exacte et de son statut d'authenticité."
    },
    {
      q: "Pourquoi l'application est-elle gratuite ?",
      a: "Notre but est de rendre le rappel spirituel accessible à tous, sans barrière financière. L'application est développée bénévolement, ne contient aucune publicité et ne vend pas vos données."
    },
    {
      q: "Mes données personnelles sont-elles protégées ?",
      a: "Absolument. Nous croyons au respect total de la vie privée. L'application fonctionne sans compte obligatoire. Vos invocations sauvegardées et vos préférences sont stockées localement sur votre appareil (IndexedDB). Aucune information personnelle ne transite vers un serveur externe."
    },
    {
      q: "Puis-je l'utiliser hors-ligne ?",
      a: "Oui ! Les douas indispensables et vos favoris sont stockés localement afin que vous puissiez les consulter même sans connexion Internet, idéal lors de vos déplacements ou moments d'isolement."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-surface/80 backdrop-blur-md z-50 border-b border-outline-variant/30">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image 
              src="/favicon1.png" 
              alt="Logo" 
              width={38} 
              height={38} 
              className="rounded-full shadow-sm"
            />
            <h1 className="text-xl md:text-2xl font-headline font-bold text-primary tracking-tight flex items-center gap-2">
              Mon Dou‘a <span className="text-secondary font-medium font-arabic">دعائي</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="hidden md:block text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#faq" className="hidden md:block text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="/" className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 active:scale-95">
              Ouvrir l&apos;application
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold tracking-wider uppercase shadow-sm"
            >
              <Sparkles size={14} className="text-secondary" />
              <span>Mon Dou‘a • <span className="font-arabic font-bold text-xs lowercase">دعائي</span> — 100% Gratuit</span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6.5xl font-headline font-bold text-primary leading-tight"
            >
              Quand le cœur est lourd <br />
              <span className="text-secondary italic">et que les mots manquent.</span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl"
            >
              Anxiété, tristesse, épreuve ou gratitude... Il est parfois difficile de savoir quel dou‘a formuler. Confiez simplement votre état d&apos;esprit actuel en langage naturel et trouvez immédiatement l&apos;invocation exacte et apaisante issue des sources prophétiques authentiques.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link href="/" className="group bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/15 transition-all flex items-center justify-center gap-2 active:scale-95">
                Trouver mon Dou‘a maintenant
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#features" className="bg-surface-container-high hover:bg-surface-container-highest px-8 py-4 rounded-full font-bold text-lg text-primary text-center transition-all active:scale-95">
                Découvrir l&apos;application gratuite
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Presentation (Islamic Architecture Frame + Smartphone Mockup) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative min-h-[600px]"
          >
            {/* Islamic Architecture Background Card */}
            <div className="absolute inset-0 w-full h-[520px] rounded-[40px] overflow-hidden border border-primary/20 shadow-2xl">
              <Image 
                src="/islamic_architecture.png" 
                alt="Architecture Islamique Moderne" 
                fill
                priority
                className="object-cover opacity-35 filter brightness-90 hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
              {/* Subtle glowing ambient light */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-secondary-container/20 rounded-full blur-[80px]"></div>
            </div>

            {/* Interactive CSS Smartphone Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 30, rotate: 1 }}
              animate={{ opacity: 1, y: 0, rotate: -1 }}
              transition={{ type: "spring", duration: 1.2, delay: 0.4 }}
              className="relative w-72 h-[500px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800 ring-12 ring-slate-900/10 z-10 scale-95 md:scale-100"
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-800 rounded-full mb-1"></div>
              </div>
              {/* Screen Content Preview */}
              <div className="w-full h-full bg-surface rounded-[2.2rem] overflow-hidden relative flex flex-col pt-8 px-4 border border-outline-variant/20 select-none">
                <div className="flex items-center gap-1.5 text-secondary mb-1">
                  <Sparkles size={12} />
                  <span className="text-[8px] font-bold uppercase tracking-wider">Bienvenue</span>
                </div>
                <h4 className="font-headline font-bold text-primary text-xl mb-3">Paix sur vous,</h4>
                
                {/* Mock Card */}
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 shadow-sm space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center text-primary">
                      <Sparkles size={12} />
                    </div>
                    <span className="text-[10px] font-bold text-primary">Quel est votre état d&apos;esprit ?</span>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-3 text-[10px] text-on-surface-variant/50 italic">
                    Je ressens une légère anxiété face à mes examens...
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-on-primary text-[10px] font-bold px-3 py-1.5 rounded-lg">
                      Trouver mon Dou‘a
                    </div>
                  </div>
                </div>

                {/* Suggestions Mock */}
                <div className="text-[9px] font-bold text-primary uppercase tracking-wider mb-2">Suggestions</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-surface-container-high rounded-xl p-3 flex flex-col justify-between aspect-square">
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
                      <Heart size={12} />
                    </div>
                    <div className="font-headline font-bold text-xs text-primary">Gratitude</div>
                  </div>
                  <div className="bg-secondary-container rounded-xl p-3 flex flex-col justify-between aspect-square">
                    <div className="w-6 h-6 bg-white/50 rounded-lg flex items-center justify-center text-on-secondary-container mb-2">
                      <Sparkles size={12} />
                    </div>
                    <div className="font-headline font-bold text-xs text-on-secondary-container">Apaisement</div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-auto pb-4 flex items-center justify-center gap-2 text-[9px] text-on-surface-variant/40">
                  <CheckCircle size={10} className="text-secondary" />
                  <span>Base de données locale synchronisée</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition / Transparency Banner */}
      <section className="bg-primary text-on-primary py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-lg font-headline font-bold text-secondary-container">100% Hors-ligne</h4>
            <p className="text-sm opacity-80 leading-relaxed">Pas besoin de connexion Internet constante. Vos douas sont sauvegardés et consultables n&apos;importe où.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-headline font-bold text-secondary-container">Confidentialité totale</h4>
            <p className="text-sm opacity-80 leading-relaxed">Aucune donnée n&apos;est transmise ou collectée. Tout est conservé en local sur votre appareil pour respecter votre intimité.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-headline font-bold text-secondary-container">Rigueur scientifique</h4>
            <p className="text-sm opacity-80 leading-relaxed">Chaque invocation est rigoureusement référencée avec sa source hadith authentifiée (Bukhari, Muslim, etc.).</p>
          </div>
        </div>
      </section>

      {/* Creator's Message Section */}
      <section className="py-20 px-6 bg-surface border-b border-outline-variant/20">
        <div className="max-w-5xl mx-auto bg-surface-container-lowest border border-outline-variant/30 rounded-[32px] p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-secondary-container/15 rounded-full -mr-24 -mt-24 blur-[60px]"></div>
          
          <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold tracking-widest uppercase">
                  <Heart size={12} className="text-secondary" />
                  <span>Philosophie & Transparence</span>
                </div>
                <h3 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Le mot du créateur : Pourquoi un assistant IA payant ?</h3>
              </div>

              <div className="space-y-4 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <p>
                  À l&apos;origine, j&apos;aurais pu laisser cette application classique, sans assistant IA, uniquement avec la recherche par thèmes et par catégories. <strong>Cette partie traditionnelle restera toujours 100% gratuite, sans compte et sans publicité.</strong>
                </p>
                <p>
                  Cependant, je me suis dit que parfois, face à une épreuve, un doute ou une joie intense, nous souhaitons trouver une invocation qui corresponde précisément à notre état d&apos;esprit actuel, sans avoir à chercher manuellement dans des listes statiques. C&apos;est pour cela que j&apos;ai intégré cet Assistant IA : il écoute vos ressentis en langage naturel pour interpréter au mieux votre état d&apos;esprit et vous proposer le dou‘a le plus adéquat.
                </p>
                <p>
                  Comme chaque analyse intelligente génère des frais de calcul d&apos;API facturés directement par les serveurs de l&apos;IA (Google Gemini), l&apos;accès à cet assistant est payant. L&apos;abonnement sert uniquement à couvrir ces frais API techniques en toute transparence, afin de vous proposer cet outil d&apos;aide personnalisé tout en gardant l&apos;application principale totalement gratuite pour tout le monde.
                </p>
              </div>
            </div>
            
            {/* Creator Message Illustration Card */}
            <div className="md:col-span-5 relative w-full h-[320px] rounded-3xl overflow-hidden border border-primary/20 shadow-lg">
              <Image 
                src="/creator_message.png" 
                alt="Méditation et sérénité" 
                fill
                className="object-cover opacity-80 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-widest text-secondary">Fonctionnalités clés</h3>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Conçu pour votre sérénité spirituelle</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Features Illustration Card */}
          <div className="lg:col-span-5 relative w-full h-[450px] rounded-[40px] overflow-hidden border border-primary/20 shadow-2xl">
            <Image 
              src="/authentic_hadith.png" 
              alt="Hadith authentiques" 
              fill
              className="object-cover opacity-90 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent"></div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="text-lg font-headline font-bold text-primary mb-2">Recherche Intuitive</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Exprimez vos émotions (anxiété, tristesse, joie) en langage naturel, ou sélectionnez l&apos;une des nombreuses suggestions pour trouver le bon dou&apos;a.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <BookOpen size={24} />
              </div>
              <div>
                <h4 className="text-lg font-headline font-bold text-primary mb-2">Authenticité Garantie</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Consultez les textes originaux en arabe avec transcription phonétique complète, traductions précises et références aux recueils authentiques de hadiths.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Heart size={24} />
              </div>
              <div>
                <h4 className="text-lg font-headline font-bold text-primary mb-2">Favoris Personnels</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Mémorisez et organisez vos invocations favorites pour y accéder en un instant dès que le besoin d&apos;apaisement ou de rappel spirituel se présente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activation Steps Section */}
      <section className="bg-surface-container py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary">Parcours simple</h3>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Comment activer l&apos;accès Premium ?</h2>
            <p className="text-sm text-on-surface-variant">Un processus rapide, sécurisé et respectueux de votre vie privée.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 relative space-y-4">
              <div className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h4 className="text-lg font-headline font-bold text-primary">Souscrire sur Stripe</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Sélectionnez l&apos;offre mensuelle ou annuelle. Vous serez redirigé vers l&apos;espace de paiement 100% chiffré et sécurisé de Stripe.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 relative space-y-4">
              <div className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h4 className="text-lg font-headline font-bold text-primary">Copier le code</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Une fois le paiement validé, Stripe affiche immédiatement votre code secret d&apos;activation sur votre écran et vous l&apos;envoie par e-mail.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 relative space-y-4">
              <div className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h4 className="text-lg font-headline font-bold text-primary">Coller dans l&apos;App</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Rendez-vous dans l&apos;onglet <strong>Paramètres</strong> de l&apos;application, entrez le code secret dans la section &quot;Mon Abonnement&quot; et validez.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-secondary">Des réponses à vos questions</h3>
          <h2 className="text-3xl font-headline font-bold text-primary">Foire Aux Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-surface-container-low transition-colors"
              >
                <span className="font-headline font-bold text-primary md:text-lg">{faq.q}</span>
                <ChevronDown 
                  size={20} 
                  className={`text-on-surface-variant/60 transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} 
                />
              </button>
              
              <div 
                className={`transition-all duration-300 overflow-hidden ${activeFaq === i ? "max-h-48 border-t border-outline-variant/10" : "max-h-0"}`}
              >
                <p className="p-6 text-sm text-on-surface-variant leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / CTA Banner */}
      <footer className="relative bg-surface-container-lowest border-t border-outline-variant/30 py-20 px-6 text-center overflow-hidden">
        {/* Serene night background overlay */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image 
            src="/peaceful_night.png" 
            alt="Nuit paisible spirituelle" 
            fill
            className="object-cover opacity-[0.07] brightness-75 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest via-transparent to-surface-container-lowest"></div>
        </div>

        <div className="max-w-2xl mx-auto space-y-8 relative z-10">
          <Image 
            src="/favicon1.png" 
            alt="Logo" 
            width={64} 
            height={64} 
            className="mx-auto rounded-full shadow-md"
          />
          <h2 className="text-3xl font-headline font-bold text-primary">Un esprit serein en quelques clics</h2>
          <p className="text-on-surface-variant max-w-md mx-auto">
            Accédez instantanément à l&apos;ensemble de l&apos;application sans aucune inscription ni publicité intrusive.
          </p>
          <div>
            <Link href="/" className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
              Ouvrir l&apos;application
            </Link>
          </div>
          <p className="text-xs text-on-surface-variant/40 pt-8">
            © 2026 Mon Dou‘a Adéquat. Développé bénévolement avec éthique et respect de vos données personnelles.
          </p>
        </div>
      </footer>
    </div>
  );
}
