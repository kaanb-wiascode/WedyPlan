const fs = require('fs');
const path = require('path');

const PRISMA_DIR = path.join(__dirname, '../prisma');
const OUTPUT_FILE = path.join(PRISMA_DIR, 'schema.prisma');

function mergePrismaSchemas() {
  console.log('🔄 Prisma şemaları akıllı ilişki tamamlayıcı ile birleştiriliyor...');

  if (!fs.existsSync(PRISMA_DIR)) {
    console.error('❌ Error: prisma klasörü bulunamadı!');
    process.exit(1);
  }

  const files = fs.readdirSync(PRISMA_DIR);
  const schemaFiles = files.filter(
    (file) => file.startsWith('schema-') && file.endsWith('.prisma')
  );

  let mergedContent = `// =================================────────=========
// ⚠️ BU DOSYA OTOMATİK OLUŞTURULMUŞTUR! (Prisma v7)
// Kaynak dosyalar: prisma/schema-*.prisma
// =================================────────=========

datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client-js"
}

`;

  const definedModels = new Set();
  const definedEnums = new Set();
  let modelsCount = 0;

  schemaFiles.forEach((file) => {
    const filePath = path.join(PRISMA_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Datasource ve generator bloklarını temizle
    content = content.replace(/datasource\s+\w+\s*\{[\s\S]*?\}/g, '');
    content = content.replace(/generator\s+\w+\s*\{[\s\S]*?\}/g, '');

    // 2. Hatalı alan düzeyi @index kullanımını kaldır
    content = content.replace(/\s+@index\b/g, '');

    // 3. Mükerrer Enum'ları Ayıkla
    content = content.replace(/enum\s+(\w+)\s*\{[\s\S]*?\}/g, (match, enumName) => {
      if (definedEnums.has(enumName)) {
        return `// [Atlandı - Çift Tanım] enum ${enumName}`;
      }
      definedEnums.add(enumName);
      return match;
    });

    // 4. Mükerrer Model'leri Ayıkla
    content = content.replace(/model\s+(\w+)\s*\{[\s\S]*?\}/g, (match, modelName) => {
      if (definedModels.has(modelName)) {
        return `// [Atlandı - Çift Tanım] model ${modelName}`;
      }
      definedModels.add(modelName);
      return match;
    });

    mergedContent += `\n// --- Source: ${file} ---\n` + content.trim() + '\n';
    modelsCount++;
  });

  // 5. Eksik / Çakışan İlişkileri (Relations) Düzelt
  // Role modeline 'profiles' ters ilişkisini ekle
  if (mergedContent.includes('model Role {') && !mergedContent.includes('profiles PortalProfile[]')) {
    mergedContent = mergedContent.replace(
      /model Role \{/,
      'model Role {\n  profiles PortalProfile[] @relation("ProfileRoles")'
    );
  }

  // IdentityUser içindeki çakışan auditLogs ilişkisini temizle (AuditLog bağımsız tutulur)
  mergedContent = mergedContent.replace(/\s+auditLogs\s+AuditLog\[\]/g, '');

  fs.writeFileSync(OUTPUT_FILE, mergedContent, 'utf8');
  console.log(`✅ ${modelsCount} adet Prisma şeması ilişki düzeltmeleriyle 'prisma/schema.prisma' dosyasında birleştirildi!`);
}

mergePrismaSchemas();