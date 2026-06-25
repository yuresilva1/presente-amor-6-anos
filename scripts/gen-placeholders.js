#!/usr/bin/env node
// Script to generate placeholder photo SVGs for development
// Run: node scripts/gen-placeholders.js

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'photos');

mkdirSync(publicDir, { recursive: true });

const photos = [
  // Carousel
  { name: 'foto1', emoji: '💕', c1: '#2a1520', c2: '#4a1a30' },
  { name: 'foto2', emoji: '🌹', c1: '#1a1020', c2: '#3a1525' },
  { name: 'foto3', emoji: '✨', c1: '#1a1525', c2: '#2a2010' },
  { name: 'foto4', emoji: '💖', c1: '#200a15', c2: '#3a1020' },
  { name: 'foto5', emoji: '🥂', c1: '#1a1008', c2: '#2a2015' },
  { name: 'foto6', emoji: '🌸', c1: '#200a1a', c2: '#3a0a20' },
  // Timeline
  { name: 'timeline1', emoji: '💫', c1: '#150a20', c2: '#250a30' },
  { name: 'timeline2', emoji: '✈️', c1: '#0a1520', c2: '#0a2535' },
  { name: 'timeline3', emoji: '💍', c1: '#1a1008', c2: '#2a2010' },
  { name: 'timeline4', emoji: '👰', c1: '#200a15', c2: '#3a1020' },
  { name: 'timeline5', emoji: '🏠', c1: '#0a1a15', c2: '#0a2a20' },
  { name: 'timeline6', emoji: '❤️', c1: '#2a0a10', c2: '#4a0a20' },
  // Gallery
  { name: 'gallery1', emoji: '💕', c1: '#200a15', c2: '#3a0a20' },
  { name: 'gallery2', emoji: '🌙', c1: '#0a0a20', c2: '#1a0a35' },
  { name: 'gallery3', emoji: '🌹', c1: '#2a0a10', c2: '#4a0a20' },
  { name: 'gallery4', emoji: '✨', c1: '#1a1008', c2: '#2a2010' },
  { name: 'gallery5', emoji: '💑', c1: '#200a15', c2: '#300a1a' },
  { name: 'gallery6', emoji: '🥂', c1: '#1a0a08', c2: '#2a1508' },
  { name: 'gallery7', emoji: '🌸', c1: '#1a0820', c2: '#2a0a30' },
  { name: 'gallery8', emoji: '💖', c1: '#200a15', c2: '#3a0820' },
  { name: 'gallery9', emoji: '🌟', c1: '#15100a', c2: '#25200a' },
  // Film
  { name: 'film1', emoji: '💫', c1: '#0a0510', c2: '#150a20' },
  { name: 'film2', emoji: '❤️', c1: '#150a08', c2: '#250a10' },
  { name: 'film3', emoji: '🌹', c1: '#100a15', c2: '#1a0a25' },
  { name: 'film4', emoji: '✨', c1: '#100805', c2: '#201508' },
  { name: 'film5', emoji: '💕', c1: '#150a10', c2: '#250a1a' },
  { name: 'film6', emoji: '🌙', c1: '#080a15', c2: '#100a25' },
  { name: 'film7', emoji: '💍', c1: '#100a05', c2: '#201508' },
  // Main couple
  { name: 'couple-main', emoji: '💑', c1: '#200a15', c2: '#3a0820' },
];

photos.forEach(({ name, emoji, c1, c2 }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${c2};stop-opacity:1" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:rgba(242,167,192,0.15);stop-opacity:1" />
      <stop offset="100%" style="stop-color:transparent;stop-opacity:0" />
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect width="800" height="600" fill="url(#glow)"/>
  <text x="400" y="280" text-anchor="middle" dominant-baseline="middle" font-size="140">${emoji}</text>
  <text x="400" y="400" text-anchor="middle" font-family="serif" font-size="20" fill="rgba(242,167,192,0.5)" font-style="italic">Adicione sua foto aqui</text>
  <text x="400" y="430" text-anchor="middle" font-family="monospace" font-size="14" fill="rgba(201,169,110,0.4)">/public/photos/${name}.jpg</text>
</svg>`;

  writeFileSync(join(publicDir, `${name}.jpg`), svg);
  console.log(`Created: ${name}.jpg`);
});

console.log('\n✅ Placeholders criados em public/photos/');
console.log('📸 Substitua por suas fotos reais para a versão final!');
