'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, ShieldAlert } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto w-full space-y-12">
        <header className="space-y-4">
          <Link href="/app" className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Retour à l&apos;application
          </Link>
          <h1 className="font-headline text-4xl text-primary font-bold">Contact & Support</h1>
          <p className="text-on-surface-variant text-sm">Une question, un retour ou un besoin d&apos;assistance ?</p>
        </header>

        {/* Contact Methods */}
        <section className="grid gap-6">
          {/* Email Card */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] p-8 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Mail size={22} />
              </div>
              <h3 className="font-headline text-xl font-bold text-primary">Par Email</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Pour toute demande de support technique (par exemple, problème avec votre code d&apos;activation Stripe), question sur les CGV ou retour général, vous pouvez nous écrire directement.
              </p>
            </div>
            
            <a 
              href="mailto:support@novaskill.tech"
              className="mt-6 inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              Envoyer un email à support@novaskill.tech
            </a>
          </div>

          {/* Feedback/Suggestions Card */}
          <div className="bg-surface-container-low border border-outline-variant/10 rounded-3xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
              <MessageSquare size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Vos retours nous aident</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Si vous remarquez une erreur de traduction, une faute dans l&apos;arabe ou la phonétique, ou si vous souhaitez suggérer l&apos;ajout d&apos;invocations authentiques, n&apos;hésitez pas à nous le signaler.
              </p>
            </div>
          </div>

          {/* Compliant Notice */}
          <div className="bg-surface-container-low border border-outline-variant/10 rounded-3xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
              <ShieldAlert size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Respect RGPD de votre vie privée</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Nous ne stockons aucun formulaire de contact sur nos serveurs. Vos communications par email sont traitées uniquement pour résoudre vos demandes et ne sont jamais partagées à des tiers.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
