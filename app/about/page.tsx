'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Shield, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto w-full space-y-12">
        <header className="space-y-4">
          <Link href="/app" className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Retour à l&apos;application
          </Link>
          <h1 className="font-headline text-4xl text-primary font-bold">À propos de Mon Dou‘a</h1>
          <p className="text-on-surface-variant text-sm">Découvrez l&apos;histoire, l&apos;éthique et la vision derrière l&apos;application.</p>
        </header>

        {/* Brand Presentation */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <Image 
              src="/app_logo.png" 
              alt="Logo" 
              width={64} 
              height={64} 
              className="rounded-full shadow-md"
            />
            <div>
              <h3 className="font-headline text-2xl text-primary font-bold">Mon Dou‘a Adéquat</h3>
              <p className="text-xs text-secondary font-bold font-arabic">دعائي — Compagnon spirituel éthique</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
            <p>
              Mon Dou‘a Adéquat est un projet né d&apos;une intention simple : **faciliter l&apos;accès au rappel spirituel et au recueillement au quotidien**, sans barrière financière ni distraction publicitaire.
            </p>
            <p>
              Nous vivons dans un monde rapide où, face à l&apos;anxiété, au doute ou au bonheur, il est parfois difficile de trouver les mots justes pour s&apos;adresser au Créateur. Cette application a été conçue pour combler ce vide en vous permettant de formuler vos émotions en langage naturel pour être orienté vers l&apos;invocation prophétique la plus adéquate.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="grid sm:grid-cols-2 gap-6">
          <div className="bg-surface-container-low border border-outline-variant/10 rounded-3xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Heart size={22} />
            </div>
            <h4 className="font-headline text-lg font-bold text-primary">100% Sans Publicité</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Pour préserver la pureté de vos moments de recueillement, l&apos;application traditionnelle est et restera toujours gratuite et sans aucune publicité intrusive.
            </p>
          </div>

          <div className="bg-surface-container-low border border-outline-variant/10 rounded-3xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Shield size={22} />
            </div>
            <h4 className="font-headline text-lg font-bold text-primary">Vie Privée Respectée</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Vos douas enregistrés et vos préférences restent stockés localement sur votre appareil (IndexedDB). Aucune base de données centrale ne collecte vos ressentis.
            </p>
          </div>
        </section>

        {/* AI Philosophy */}
        <section className="p-8 bg-primary/5 border border-primary/20 rounded-[2rem] space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Sparkles size={20} />
            <h4 className="font-headline text-lg">Pourquoi un Assistant IA payant ?</h4>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            L&apos;analyse intelligente de vos émotions nécessite des serveurs de calcul (Google Gemini API) qui facturent chaque requête. Afin de préserver la gratuité de l&apos;application de base pour tous, l&apos;accès à cet Assistant intelligent requiert un abonnement équitable et transparent servant uniquement à amortir ces coûts techniques.
          </p>
          <p className="text-xs text-on-surface-variant/80 italic font-medium">
            Projet édité par novaskill tech.
          </p>
        </section>
      </main>
    </div>
  );
}
