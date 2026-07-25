'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../lib/firebase';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  date: string;
  readTime: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "2026'nın En Çarpıcı Gelinlik Trendleri: Sadelik ve Zarafet",
    category: "Gelinlik & Moda",
    image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800",
    excerpt: "Kabarık etekler yerini dökümlü kumaşlara bırakıyor. Bu yılın gelinlik modasında öne çıkan detaylar, dantel işlemeler ve sade şıklık...",
    date: "12 Temmuz 2026",
    readTime: "4 dk okuma"
  },
  {
    id: '2',
    title: "Kusursuz Bir Düğün Bütçesi Nasıl Hazırlanır?",
    category: "Planlama",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
    excerpt: "Düğün planlarken ipin ucunu kaçırmamak için harcamalarınızı nasıl kategorize etmelisiniz? Gizli masraflara karşı kesin çözümler.",
    date: "5 Temmuz 2026",
    readTime: "6 dk okuma"
  },
  {
    id: '3',
    title: "Kır Düğünü mü, Salon Düğünü mü? Hangisi Size Göre?",
    category: "Mekan Rehberi",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    excerpt: "Doğayla iç içe bir kır düğünü mü yoksa garantili ve şık bir salon düğünü mü? Karar vermenizi kolaylaştıracak artı ve eksiler.",
    date: "28 Haziran 2026",
    readTime: "5 dk okuma"
  },
  {
    id: '4',
    title: "Sonbahar Düğünleri İçin Büyüleyici Dekorasyon Fikirleri",
    category: "Dekorasyon",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
    excerpt: "Kızıl yapraklar, sıcak tonlar ve ahşap detaylarla sonbahar düğününüzü unutulmaz bir masala dönüştürün.",
    date: "15 Haziran 2026",
    readTime: "3 dk okuma"
  },
  {
    id: '5',
    title: "Unutulmaz Bir Balayı İçin Vizesiz 5 Tropik Rota",
    category: "Balayı",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
    excerpt: "Düğün yorgunluğunu üzerinizden atacağınız, vize derdi olmadan gidebileceğiniz en romantik ve egzotik 5 tatil cenneti.",
    date: "2 Haziran 2026",
    readTime: "7 dk okuma"
  },
  {
    id: '6',
    title: "Düğün Fotoğraflarında Doğal Görünmenin 7 Sırrı",
    category: "Fotoğraf & Video",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800",
    excerpt: "Kamera karşısında kasılmadan, en doğal ve içten gülümsemelerinizi ölümsüzleştirmek için uygulayabileceğiniz basit tüyolar.",
    date: "20 Mayıs 2026",
    readTime: "4 dk okuma"
  }
];

const CATEGORIES = ["Tümü", "Planlama", "Gelinlik & Moda", "Mekan Rehberi", "Dekorasyon", "Balayı", "Fotoğraf & Video"];

export default function BlogPage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const filteredPosts = selectedCategory === "Tümü" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/arama" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E] hidden sm:block">
            🔍 Firma Ara
          </Link>
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
            ← Ana Sayfa
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#4A154B] to-purple-900 py-16 px-6 text-center text-white relative overflow-hidden">
        {/* Dekoratif Çemberler */}
        <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-[#E6007E]/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="bg-white/10 text-pink-300 text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20 uppercase tracking-widest">
            Düğün Rehberi & İlham
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Hayalinizdeki Düğünü Planlarken İlham Alın ✨
          </h1>
          <p className="text-purple-200 text-sm md:text-base">
            Gelinlik trendlerinden bütçe yönetimine, balayı rotalarından dekorasyon fikirlerine kadar her şey WedyPlan Blog'da.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Kategori Filtreleri */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-5 py-2.5 rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-[#E6007E] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-pink-50 hover:text-[#E6007E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col">
              
              {/* Resim Alanı */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#4A154B] text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm uppercase">
                  {post.category}
                </div>
              </div>

              {/* İçerik Alanı */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 mb-3">
                  <span>📅 {post.date}</span>
                  <span>•</span>
                  <span>⏳ {post.readTime}</span>
                </div>
                
                <h2 className="text-lg font-extrabold text-[#4A154B] leading-snug mb-3 group-hover:text-[#E6007E] transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-xs text-slate-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold text-[#E6007E] group-hover:underline">Yazıyı Okumaya Devam Et</span>
                  <span className="text-[#E6007E] font-bold">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bülten (Newsletter) Banner */}
        <div className="mt-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 md:p-12 text-center border border-pink-200 shadow-inner">
          <h3 className="text-2xl font-extrabold text-[#4A154B] mb-2">En Yeni Trendler E-Postanıza Gelsin 💌</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">Düğün hazırlıklarıyla ilgili ipuçlarını ve platforma eklenen indirimli firmaları ilk siz öğrenin.</p>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3">
            <input 
              type="email" 
              placeholder="E-posta adresiniz..." 
              className="px-4 py-3 rounded-xl text-xs w-full focus:outline-none focus:ring-2 focus:ring-[#E6007E] border-none shadow-sm"
            />
            <button className="bg-[#4A154B] hover:bg-purple-900 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-md whitespace-nowrap">
              Abone Ol
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}