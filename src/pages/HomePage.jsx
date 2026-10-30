import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { BestSellers } from '../components/home/BestSellers';
import { SkinConcerns } from '../components/home/SkinConcerns';
import { Showcase3D } from '../components/home/Showcase3D';
import { IngredientsSpotlight } from '../components/home/IngredientsSpotlight';
import { TrustBadges } from '../components/home/TrustBadges';
import { Testimonials } from '../components/home/Testimonials';
import { InstagramFeed } from '../components/home/InstagramFeed';

export const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroBanner />
      <CategoryGrid />
      <BestSellers />
      <SkinConcerns />
      <Showcase3D />
      <IngredientsSpotlight />
      <TrustBadges />
      <Testimonials />
      <InstagramFeed />
    </div>
  );
};
