import PublicNavbar from "@/components/public/PublicNavbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Firma Katıl Sayfasıyla Aynı Tasarıma Sahip Ana Sayfa Menüsü */}
      <PublicNavbar mode="public" />
      
      {/* ... Diğer Ana Sayfa Bölümleri ... */}
    </div>
  );
}