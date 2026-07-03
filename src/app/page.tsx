"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';
import { Hero } from '../components/Hero';
import { Navigation } from '../components/Navigation';
import { Vision } from '../components/Vision';
import { Process } from '../components/Process';
import { Gallery } from '../components/Gallery';
import { Impact } from '../components/Impact';
import { Footer } from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-brand-sand min-h-screen">
      <Navigation />
      <Hero />
      <Vision />
      <Process />
      <Gallery />
      <Impact />
      <Footer />
    </main>
  );
}
