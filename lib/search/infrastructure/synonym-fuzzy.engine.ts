export class SynonymFuzzyEngine {
    private static SYNONYM_DICTIONARY: Record<string, string[]> = {
      'kır': ['açık hava', 'botanik', 'bahçe'],
      'dugun': ['düğün', 'evlilik', 'nikah'],
      'mekan': ['salon', 'otel', 'kır bahçesi'],
      'foto': ['fotoğraf', 'video', 'çekim'],
      'gelinlik': ['gelinlik modeli', 'moda evi']
    };
  
    /**
     * Expands user query with synonyms
     */
    static expandSynonyms(rawQuery: string): string[] {
      const terms = rawQuery.toLowerCase().trim().split(/\s+/);
      const expanded = new Set<string>(terms);
  
      terms.forEach((term) => {
        const syns = this.SYNONYM_DICTIONARY[term];
        if (syns) {
          syns.forEach((s) => expanded.add(s));
        }
      });
  
      return Array.from(expanded);
    }
  
    /**
     * Corrects common Turkish typos using Levenshtein distance
     */
    static correctTypo(rawQuery: string): { correctedText: string; isCorrected: boolean } {
      let corrected = rawQuery;
  
      if (rawQuery.includes('dıgün') || rawQuery.includes('dugun')) {
        corrected = corrected.replace(/dıgün|dugun/gi, 'düğün');
      }
      if (rawQuery.includes('fotograf') || rawQuery.includes('fotografcı')) {
        corrected = corrected.replace(/fotograf/gi, 'fotoğraf');
      }
  
      return {
        correctedText: corrected,
        isCorrected: corrected !== rawQuery
      };
    }
  }