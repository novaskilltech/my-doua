'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  Sparkles, Heart, Shield, BookOpen, Smartphone, 
  ChevronDown, CheckCircle, ArrowRight, Coffee, Cpu, 
  Gift, Bot, Lock, Info, Share2, Scale, X, ExternalLink
} from 'lucide-react';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'cgv' | 'mentions' | 'privacy'>('mentions');
  const [shareTooltip, setShareTooltip] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Mon Dou‘a Adéquat',
      text: 'Trouvez l’invocation qui correspond exactement à vos ressentis en langage naturel.',
      url: 'https://doua.novaskill.tech',
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setShareTooltip(true);
        setTimeout(() => setShareTooltip(false), 2000);
      } catch (err) {
        console.log('Clipboard error:', err);
      }
    }
  };

  const openLegalModal = (tab: 'cgv' | 'mentions' | 'privacy') => {
    setLegalTab(tab);
    setIsLegalModalOpen(true);
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
      q: "Comment fonctionne l'activation de l'Assistant IA ?",
      a: "Une fois votre abonnement souscrit sur Stripe, vous recevrez instantanément un code d'activation. Il vous suffit de le coller dans les Paramètres de l'application pour activer la recherche en langage naturel."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-surface/80 backdrop-blur-md z-50 border-b border-outline-variant/30">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image 
              src="/app_logo.png" 
              alt="Logo Mon Dou'a" 
              width={38} 
              height={38} 
              className="rounded-full shadow-md"
            />
            <h1 className="text-xl md:text-2xl font-headline font-bold text-primary tracking-tight flex items-center gap-2">
              Mon Dou‘a <span className="text-secondary font-medium font-arabic">دعائي</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="#features" className="hidden md:block text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
              Découvrir
            </Link>
            <Link href="#tarification" className="hidden md:block text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
              Tarification
            </Link>
            
            {/* Share Button with Tooltip */}
            <div className="relative">
              <button 
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-surface-container-high/60 text-primary transition-all duration-200"
                title="Partager l'application"
              >
                <Share2 size={20} />
              </button>
              {shareTooltip && (
                <span className="absolute top-12 right-0 bg-primary text-on-primary text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap animate-bounce">
                  Lien copié ! 💚
                </span>
              )}
            </div>

            <Link href="/app" className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-5 md:px-6 py-2 rounded-full font-bold text-xs md:text-sm shadow-md hover:shadow-lg transition-all duration-300 active:scale-95">
              Ouvrir l&apos;app
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Intro banner styled like the app banner */}
      <div className="relative pt-32 pb-12 px-6 overflow-hidden bg-primary text-on-primary border-b border-outline-variant/20">
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image 
            src="/app_banner.png" 
            alt="Bannière motifs islamiques" 
            fill
            className="object-cover opacity-20 brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-transparent to-primary/95"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} /> Version 2.0 • 100% Éthique
          </span>
          <h2 className="text-3xl sm:text-5xl font-headline font-bold text-secondary-container leading-tight">
            Votre compagnon d&apos;invocations au quotidien
          </h2>
          <p className="text-sm sm:text-lg opacity-90 max-w-2xl mx-auto font-body">
            Une application fluide pour trouver le dou‘a qu&apos;il vous faut, quand vous en avez besoin. Parcourez la base de données gratuitement ou laissez l&apos;Assistant IA vous orienter selon vos ressentis.
          </p>
        </div>
      </div>

      {/* Main Content Sections - 6 Steps Refactoring */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24 md:space-y-32" id="features">
        
        {/* STEP 1: Une application complète et gratuite */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-lg">1</span>
              <h3 className="text-2xl sm:text-3.5xl font-headline font-bold text-primary">
                Une application complète et gratuite
              </h3>
            </div>
            <p className="text-lg font-bold text-secondary italic">Déjà tout ce qu&apos;il faut pour invoquer Allah</p>
            <p className="text-on-surface-variant leading-relaxed">
              Mon Dou&apos;a est une application complète, utile et 100% gratuite. Vous pouvez accéder instantanément à l&apos;essentiel pour vos moments de recueillement spirituel.
            </p>
            
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Vous pouvez déjà :</h4>
              <ul className="space-y-2.5">
                {[
                  "Parcourir les invocations par catégories",
                  "Lire le texte en arabe authentique",
                  "Voir la transcription phonétique",
                  "Lire la traduction complète en français",
                  "Apprendre et utiliser les douas au quotidien"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-on-surface-variant text-sm">
                    <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl text-xs text-on-surface-variant flex gap-3 items-center">
              <Info size={16} className="text-primary shrink-0" />
              <span>Tout cela sans publicité intrusive et sans aucune obligation de paiement.</span>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex justify-center">
            {/* Interactive Phone Mockup displaying categories */}
            <div className="relative w-72 h-[500px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800 ring-12 ring-slate-900/10 scale-95 md:scale-100">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-800 rounded-full mb-1"></div>
              </div>
              <div className="w-full h-full bg-surface rounded-[2.2rem] overflow-hidden relative flex flex-col pt-8 px-4 border border-outline-variant/20 select-none text-xs">
                <div className="flex items-center gap-1 text-primary/60 font-bold mb-1">
                  <Image src="/app_logo.png" alt="Logo" width={14} height={14} className="rounded-full" />
                  <span>Mon Dou&apos;a</span>
                </div>
                <h4 className="font-headline font-bold text-primary text-base mb-2">Catégories</h4>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { n: "Matin & Soir", c: "bg-surface-container-high text-primary" },
                    { n: "Protection", c: "bg-primary text-on-primary" },
                    { n: "Pardon", c: "bg-surface-container-high text-primary" },
                    { n: "Famille", c: "bg-surface-container-high text-primary" },
                    { n: "Épreuves", c: "bg-surface-container-high text-primary" },
                    { n: "Reconnaissance", c: "bg-secondary-container text-on-secondary-container" }
                  ].map((cat, idx) => (
                    <div key={idx} className={`${cat.c} rounded-xl p-2.5 flex flex-col justify-between aspect-[1.4/1]`}>
                      <span className="font-headline font-bold text-[10px] leading-tight">{cat.n}</span>
                      <span className="text-[7px] text-right font-arabic">دعاء</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-2 text-[8px] text-on-surface-variant leading-relaxed">
                  <p className="font-bold text-primary mb-0.5">Invocation récente :</p>
                  <p className="font-arabic text-right text-[10px] my-1 text-primary">اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ</p>
                  <p className="italic text-[7px] opacity-75">\"O Allah, je te demande le pardon et la santé...\"</p>
                </div>
                
                <div className="mt-auto pb-3 flex items-center justify-center gap-1.5 text-[8px] text-on-surface-variant/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                  <span>Base de données 100% Locale</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEP 2: Pourquoi un assistant IA ? */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            {/* Visual representation of user feelings/thoughts */}
            <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <Sparkles size={18} />
                </div>
                <h4 className="font-headline font-bold text-primary">Comment vous sentez-vous ?</h4>
              </div>
              
              <div className="space-y-3">
                {[
                  { text: "Je suis stressé.", emoji: "😟" },
                  { text: "Je n'arrive pas à dormir.", emoji: "🌙" },
                  { text: "J'ai peur pour l'avenir.", emoji: "⏳" },
                  { text: "Je veux remercier Allah.", emoji: "❤️" },
                  { text: "Je cherche une invocation pour demander pardon.", emoji: "🤲" }
                ].map((thought, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 bg-surface-container-high/40 hover:bg-surface-container-high border border-outline-variant/20 rounded-2xl px-4 py-3 text-sm text-on-surface-variant font-medium cursor-pointer transition-colors duration-300"
                  >
                    <span className="text-lg">{thought.emoji}</span>
                    <span>{thought.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-lg">2</span>
              <h3 className="text-2xl sm:text-3.5xl font-headline font-bold text-primary">
                Pourquoi un assistant IA ?
              </h3>
            </div>
            <p className="text-lg font-bold text-secondary italic">Parce que parfois, on ne sait pas quelle invocation chercher</p>
            <p className="text-on-surface-variant leading-relaxed">
              Face à une épreuve, une angoisse ou un moment de bonheur, trouver le bon dou&apos;a peut être intimidant. L&apos;assistant IA vous permet d&apos;écrire ce que vous ressentez avec vos propres mots et vous aide à trouver une invocation adaptée à votre situation.
            </p>
            
            <div className="p-5 bg-primary/5 border border-primary/20 rounded-3xl flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <Shield size={20} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-primary uppercase tracking-wider">Avertissement Important</h5>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  L&apos;IA n&apos;est pas une autorité religieuse. Elle ne crée pas de douas et ne donne pas d&apos;avis juridiques. Elle vous aide simplement à vous orienter dans la base de données d&apos;invocations authentiques.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STEP 3: Pourquoi cette option est payante ? */}
        <section className="space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-lg">3</span>
              <h3 className="text-2xl sm:text-3.5xl font-headline font-bold text-primary">
                Pourquoi cette option est payante ?
              </h3>
            </div>
            <p className="text-lg font-bold text-secondary italic">Parce que l&apos;IA a un coût technique réel</p>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              L&apos;intelligence artificielle consomme des ressources de calcul importantes. Chaque fois que vous confiez vos ressentis à l&apos;assistant, les serveurs externes traitent votre message pour en extraire le sens spirituel.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Analyse de votre message", desc: "L'IA comprend vos propres mots et votre état émotionnel actuel.", icon: <Cpu size={24} /> },
              { title: "Modèle linguistique IA", desc: "Traitement confidentiel et sécurisé par le modèle Gemini API de Google.", icon: <Bot size={24} /> },
              { title: "Génération de réponse", desc: "Association sémantique avec la base de données d'invocations.", icon: <Sparkles size={24} /> },
              { title: "Coûts facturés", desc: "Ressources informatiques payées à l'usage aux fournisseurs d'infrastructure.", icon: <Lock size={24} /> }
            ].map((step, idx) => (
              <div key={idx} className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 space-y-4 hover:shadow-md transition-all duration-300 relative">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  {step.icon}
                </div>
                <h4 className="font-headline font-bold text-primary text-base">{step.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">{step.desc}</p>
                
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-outline-variant font-bold text-xl">
                    ➔
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto p-5 bg-secondary-container/10 border border-secondary/20 rounded-3xl text-center space-y-2">
            <p className="text-sm font-bold text-secondary">
              Chaque utilisation de l&apos;assistant IA entraîne des frais techniques facturés par la technologie utilisée (Gemini API de Google).
            </p>
            <p className="text-xs text-on-surface-variant font-medium">
              Le paiement ne concerne pas les invocations, mais uniquement l&apos;accès à cette fonctionnalité avancée de recherche intelligente.
            </p>
          </div>
        </section>

        {/* STEP 4: Une tarification simple et honnête */}
        <section id="tarification" className="space-y-12 bg-surface-container-high/30 border border-outline-variant/30 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-full blur-[80px] -z-10"></div>
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-lg">4</span>
              <h3 className="text-2xl sm:text-3.5xl font-headline font-bold text-primary">
                Une tarification simple et honnête
              </h3>
            </div>
            <p className="text-lg font-bold text-secondary italic">Un prix juste pour couvrir les frais, rien de plus</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
            {/* Offer Monthly */}
            <div className="bg-surface-container-lowest border-2 border-outline-variant/30 rounded-[2rem] p-8 flex flex-col justify-between hover:border-primary transition-all duration-300 relative shadow-sm">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-primary text-[10px] font-bold uppercase tracking-wider">
                  Moins qu&apos;un café par mois ☕
                </span>
                <h4 className="font-headline font-bold text-primary text-xl">Mensuel</h4>
                <div className="flex items-baseline gap-1 text-primary">
                  <span className="text-4xl font-bold font-headline">1,99 €</span>
                  <span className="text-sm font-medium">/ mois</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Idéal pour tester l&apos;assistant IA et l&apos;utiliser ponctuellement lors de vos besoins passagers.
                </p>
              </div>
              
              <Link 
                href="https://buy.stripe.com/3cIcN59ouaET5Jx6yOgbm0i" 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3.5 rounded-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-bold text-center text-sm shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                Activer l&apos;accès mensuel
              </Link>
            </div>

            {/* Offer Yearly */}
            <div className="bg-surface-container-lowest border-2 border-primary rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative shadow-md">
              <div className="absolute top-0 right-8 transform -translate-y-1/2">
                <span className="px-3.5 py-1 rounded-full bg-secondary text-on-secondary text-[10px] font-bold uppercase tracking-wider shadow-md">
                  Recommandé 🌟
                </span>
              </div>
              
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider">
                  Économisez plus !
                </span>
                <h4 className="font-headline font-bold text-primary text-xl">Annuel</h4>
                <div className="flex items-baseline gap-1 text-primary">
                  <span className="text-4xl font-bold font-headline">12,99 €</span>
                  <span className="text-sm font-medium">/ an</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  L&apos;offre la plus sereine et économique pour vous accompagner tout au long de l&apos;année sans interruption.
                </p>
              </div>
              
              <Link 
                href="https://buy.stripe.com/8x2fZhdEK14j6NB6yOgbm0j" 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3.5 rounded-full bg-secondary text-on-secondary hover:bg-secondary/90 font-bold text-center text-sm shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                Activer l&apos;accès annuel
              </Link>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 pt-6 border-t border-outline-variant/30">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest text-center">
              Votre abonnement sert uniquement à :
            </h4>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              {[
                "Couvrir les frais techniques de l'IA",
                "Maintenir le service disponible en ligne",
                "Améliorer continuellement l'expérience"
              ].map((item, i) => (
                <div key={i} className="bg-surface-container-lowest/50 border border-outline-variant/20 rounded-2xl p-3 text-xs text-on-surface-variant">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STEP 5: Le bon message à retenir */}
        <section className="space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-lg">5</span>
              <h3 className="text-2xl sm:text-3.5xl font-headline font-bold text-primary">
                Le bon message à retenir
              </h3>
            </div>
            <p className="text-lg font-bold text-secondary italic">Vous restez libre, toujours</p>
          </div>

          {/* Workflow Diagram */}
          <div className="max-w-4xl mx-auto bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 sm:p-12 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center min-w-[200px]">
                <h5 className="font-headline font-bold text-primary text-sm mb-1">Application gratuite</h5>
                <p className="text-[10px] text-on-surface-variant">100% complète et utilisable sans frais</p>
              </div>
              
              <div className="text-primary font-bold text-lg rotate-90 md:rotate-0">➔</div>
              
              <div className="bg-secondary-container/20 border border-secondary/20 rounded-2xl p-4 text-center min-w-[200px]">
                <h5 className="font-headline font-bold text-secondary text-sm mb-1">Assistant IA optionnel</h5>
                <p className="text-[10px] text-on-surface-variant">Uniquement si vous en ressentez le besoin</p>
              </div>

              <div className="text-primary font-bold text-lg rotate-90 md:rotate-0">➔</div>

              <div className="bg-surface-container-high border border-outline-variant/20 rounded-2xl p-4 text-center min-w-[200px]">
                <h5 className="font-headline font-bold text-primary text-sm mb-1">Vous choisissez</h5>
                <p className="text-[10px] text-on-surface-variant">Selon votre propre situation spirituelle</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-6 border-t border-outline-variant/20">
              {[
                "Utilisez gratuitement toutes les invocations.",
                "Activez l'assistant IA seulement si vous le souhaitez.",
                "Zéro publicité intrusive pour un recueillement pur.",
                "Respect strict de votre vie privée (pas de tracking)."
              ].map((value, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-on-surface-variant">
                  <CheckCircle size={16} className="text-secondary shrink-0" />
                  <span>{value}</span>
                </div>
              ))}
            </div>

            <p className="text-center font-headline font-bold text-secondary italic text-base sm:text-lg pt-4">
              « Notre objectif : vous accompagner, pas vous vendre. »
            </p>
          </div>
        </section>

        {/* STEP 6: En résumé */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-lg">6</span>
              <h3 className="text-2xl sm:text-3.5xl font-headline font-bold text-primary">
                En résumé
              </h3>
            </div>
            <p className="text-lg font-bold text-secondary italic">Mon Dou&apos;a est là pour vous, gratuitement.</p>
            
            <div className="space-y-4">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Gift size={20} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-primary text-sm mb-1">Application complète et gratuite</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Toutes les catégories, l&apos;arabe, le français et la phonétique sont accessibles sans frais.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-primary text-sm mb-1">Assistant IA Premium (optionnel)</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Un service optionnel pour les moments de doute ou de recherche d&apos;aide personnalisée.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Heart size={20} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-primary text-sm mb-1">Équitable et transparent</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Le tarif payant sert uniquement à amortir les factures de ressources de calcul de l&apos;IA de Google.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <Link 
                href="/app" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-bold text-base shadow-xl shadow-primary/10 transition-all duration-300 active:scale-95"
              >
                Ouvrir Mon Dou&apos;a maintenant
                <ArrowRight size={18} />
              </Link>
              <p className="text-xs text-on-surface-variant italic font-medium">
                Si l&apos;assistant IA vous aide, soutenez-le. Sinon, continuez gratuitement. Le choix vous appartient, toujours.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            {/* Final Phone Mockup with Islamic dome or banner */}
            <div className="relative w-72 h-[500px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800 ring-12 ring-slate-900/10 scale-95 md:scale-100">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-800 rounded-full mb-1"></div>
              </div>
              <div className="w-full h-full bg-primary rounded-[2.2rem] overflow-hidden relative flex flex-col justify-between pt-8 pb-4 px-4 text-on-primary select-none text-xs">
                
                {/* Background design inside mockup */}
                <div className="absolute inset-0 w-full h-full -z-10">
                  <Image 
                    src="/app_banner.png" 
                    alt="Motifs de fond" 
                    fill
                    className="object-cover opacity-15"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary"></div>
                </div>

                <div className="flex justify-center mt-6">
                  <Image src="/app_logo.png" alt="Logo" width={56} height={56} className="rounded-full shadow-lg border border-secondary-container/20" />
                </div>

                <div className="text-center space-y-2 px-2">
                  <h4 className="font-headline font-bold text-lg text-secondary-container">Mon Dou‘a</h4>
                  <p className="font-arabic text-sm text-secondary-container">دعائي</p>
                  <p className="text-[10px] leading-relaxed opacity-95 pt-2">
                    L&apos;invocation qu&apos;il vous faut, au moment où vous en avez besoin.
                  </p>
                </div>

                <div className="bg-surface/10 border border-white/10 rounded-2xl p-3 text-center text-[9px] backdrop-blur-sm">
                  <span className="font-bold block text-secondary-container mb-0.5">Besoin d&apos;orientation ?</span>
                  Exprimez vos ressentis en toute simplicité.
                </div>

                <div className="text-[8px] text-center opacity-40">
                  Le choix vous appartient, toujours. 💚
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* FAQ Section */}
      <section className="bg-surface-container py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-surface-container-lowest border-t border-outline-variant/30 py-16 px-6 text-center overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <Image 
            src="/app_logo.png" 
            alt="Logo" 
            width={64} 
            height={64} 
            className="mx-auto rounded-full shadow-md"
          />
          <h2 className="text-2xl font-headline font-bold text-primary">Un esprit serein en quelques clics</h2>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto">
            Accédez instantanément à l&apos;ensemble de l&apos;application sans aucune inscription ni publicité intrusive.
          </p>
          
          <div className="flex justify-center gap-3">
            <Link href="/app" className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-10 py-3.5 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
              Ouvrir l&apos;application
            </Link>
          </div>
          
          {/* Legal and Compliance Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-on-surface-variant/70 pt-6">
            <button onClick={() => openLegalModal('mentions')} className="hover:text-primary transition-colors">Mentions Légales</button>
            <span className="text-outline-variant">|</span>
            <button onClick={() => openLegalModal('cgv')} className="hover:text-primary transition-colors">Conditions Générales de Vente (CGV)</button>
            <span className="text-outline-variant">|</span>
            <button onClick={() => openLegalModal('privacy')} className="hover:text-primary transition-colors">Charte de Confidentialité (RGPD)</button>
          </div>

          <p className="text-[10px] text-on-surface-variant/40 pt-6">
            © 2026 Mon Dou‘a Adéquat - novaskill tech. Développé bénévolement avec éthique et respect de vos données personnelles.
          </p>
        </div>
      </footer>

      {/* Legal and Compliance tabbed Overlay Modal */}
      {isLegalModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-surface border border-outline-variant/30 w-full max-w-3xl rounded-[2rem] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high/40">
              <div className="flex items-center gap-2 text-primary">
                <Scale size={20} />
                <h3 className="font-headline font-bold text-lg">Informations Légales & Conformité</h3>
              </div>
              <button 
                onClick={() => setIsLegalModalOpen(false)}
                className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-outline-variant/20 bg-surface-container-lowest text-xs sm:text-sm font-bold">
              <button 
                onClick={() => setLegalTab('mentions')}
                className={`flex-1 py-3 border-b-2 text-center transition-colors ${legalTab === 'mentions' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'}`}
              >
                Mentions Légales
              </button>
              <button 
                onClick={() => setLegalTab('cgv')}
                className={`flex-1 py-3 border-b-2 text-center transition-colors ${legalTab === 'cgv' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'}`}
              >
                CGV
              </button>
              <button 
                onClick={() => setLegalTab('privacy')}
                className={`flex-1 py-3 border-b-2 text-center transition-colors ${legalTab === 'privacy' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'}`}
              >
                Confidentialité (RGPD)
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="p-6 overflow-y-auto text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-6">
              
              {/* Mentions Légales Tab */}
              {legalTab === 'mentions' && (
                <div className="space-y-4">
                  <h4 className="font-headline font-bold text-primary text-base">1. Éditeur de l&apos;application</h4>
                  <p>
                    L&apos;application <strong>Mon Dou‘a Adéquat</strong> et sa landing page sont éditées par <strong>novaskill tech</strong>.
                    <br />
                    Contact : <a href="mailto:support@novaskill.tech" className="text-primary underline">support@novaskill.tech</a>
                  </p>
                  <h4 className="font-headline font-bold text-primary text-base">2. Hébergement</h4>
                  <p>
                    L&apos;application est hébergée sur l&apos;infrastructure cloud mondiale de la société <strong>Vercel Inc.</strong> :
                    <br />
                    Adresse : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
                    <br />
                    Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary underline inline-flex items-center gap-0.5">vercel.com <ExternalLink size={12} /></a>
                  </p>
                  <h4 className="font-headline font-bold text-primary text-base">3. Propriété Intellectuelle</h4>
                  <p>
                    Tous les contenus textuels d&apos;explication et la structure logique sont la propriété de <strong>novaskill tech</strong>. Les invocations arabes, phonétiques et traductions proviennent de sources religieuses publiques libres de droits.
                  </p>
                </div>
              )}

              {/* CGV Tab */}
              {legalTab === 'cgv' && (
                <div className="space-y-4">
                  <h4 className="font-headline font-bold text-primary text-base">1. Description des Services</h4>
                  <p>
                    L&apos;accès à la base de données standard de l&apos;application est 100% gratuit. L&apos;abonnement payant octroie uniquement un droit d&apos;accès à la fonctionnalité de recherche assistée par Intelligence Artificielle (Assistant IA).
                  </p>
                  <h4 className="font-headline font-bold text-primary text-base">2. Modalités de Tarification et Paiement</h4>
                  <p>
                    Deux formules sont proposées via la plateforme sécurisée de notre prestataire Stripe :
                    <br />
                    - **Mensuel** : 1,99 € TTC par mois, avec reconduction tacite.
                    <br />
                    - **Annuel** : 12,99 € TTC par an, avec reconduction tacite.
                  </p>
                  <h4 className="font-headline font-bold text-primary text-base">3. Droit de rétractation</h4>
                  <p>
                    Conformément à l&apos;article **L.221-28 13° du Code de la consommation français**, le droit de rétractation ne s&apos;applique pas aux services de fourniture de contenu numérique indépendant de tout support matériel dont l&apos;exécution a commencé immédiatement après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation. En activant l&apos;Assistant IA avec votre code d&apos;accès, vous acceptez l&apos;exécution immédiate et renoncez à ce droit.
                  </p>
                  <h4 className="font-headline font-bold text-primary text-base">4. Résiliation & Contact</h4>
                  <p>
                    L&apos;abonnement peut être résilié à tout moment sans aucun frais supplémentaire directement depuis votre espace de paiement Stripe ou en envoyant une simple demande par email à : <a href="mailto:support@novaskill.tech" className="text-primary underline">support@novaskill.tech</a>. Votre accès restera actif jusqu&apos;à la fin de la période de facturation en cours.
                  </p>
                </div>
              )}

              {/* RGPD Tab */}
              {legalTab === 'privacy' && (
                <div className="space-y-4">
                  <h4 className="font-headline font-bold text-primary text-base">1. Minimisation des données</h4>
                  <p>
                    Nous ne collectons aucune donnée personnelle nominative. L&apos;application fonctionne sans création de compte. Vos douas sauvegardés et vos préférences restent exclusivement stockés localement sur votre appareil (IndexedDB).
                  </p>
                  <h4 className="font-headline font-bold text-primary text-base">2. Traitement par l&apos;Intelligence Artificielle</h4>
                  <p>
                    Lorsque vous utilisez l&apos;Assistant IA, la phrase décrivant vos sentiments est transmise de manière anonyme à l&apos;API de Google Gemini. Aucune donnée d&apos;identité (nom, adresse email, adresse IP) n&apos;est transmise ou associée à vos requêtes.
                  </p>
                  <h4 className="font-headline font-bold text-primary text-base">3. Droits des utilisateurs (DSAR)</h4>
                  <p>
                    Étant donné que toutes vos données (historique et favoris) sont uniquement stockées localement sur votre appareil, vous disposez d&apos;un contrôle absolu. Vous pouvez exporter ou supprimer l&apos;intégralité de vos données de manière immédiate et définitive en vidant simplement l&apos;historique de votre navigateur ou en cliquant sur le bouton de réinitialisation dans l&apos;onglet <strong>Paramètres</strong> de l&apos;application.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-outline-variant/20 bg-surface-container-high/40 flex justify-end">
              <button 
                onClick={() => setIsLegalModalOpen(false)}
                className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-6 py-2 rounded-full font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
