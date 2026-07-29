export interface ContractClause {
    id: string;
    title: string;
    detail: string;
  }
  
  export interface MobileContractData {
    contractId: string;
    partnerName: string;
    escrowDepositAmount: number;
    currency: string;
    clauses: ContractClause[];
    isEsigned: boolean;
  }
  
  export class MobileContractEngine {
    public static async getContract(): Promise<MobileContractData> {
      return {
        contractId: "contract_demo_101",
        partnerName: "Çırağan Palace Kempinski",
        escrowDepositAmount: 180000,
        currency: "TRY",
        isEsigned: true,
        clauses: [
          { 
            id: "c1", 
            title: "Escrow Kapora Güvencesi", 
            detail: "Ödemeler dondurulmuş güvenli hesapta saklanır." 
          },
          { 
            id: "c2", 
            title: "İptal İade Koşulu", 
            detail: "30 gün önceden bildirilen iptallerde %100 kesintisiz iade yapılır." 
          },
        ],
      };
    }
  }