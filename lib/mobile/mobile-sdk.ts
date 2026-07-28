export interface MobileConfig {
    baseUrl: string;
    apiVersion: "v1";
    platform: "ios" | "android" | "tablet";
    certificatePinning: boolean;
  }
  
  export interface AuthSessionToken {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }
  
  export class WedyPlanMobileSDK {
    private config: MobileConfig;
    private sessionToken: AuthSessionToken | null = null;
  
    constructor(config: MobileConfig) {
      this.config = config;
    }
  
    public setSessionToken(token: AuthSessionToken): void {
      this.sessionToken = token;
    }
  
    public async fetchWithPinning<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
      const headers = {
        "Content-Type": "application/json",
        "X-WedyPlan-Platform": this.config.platform,
        "X-WedyPlan-App-Version": "1.0.0",
        ...(this.sessionToken ? { Authorization: `Bearer ${this.sessionToken.accessToken}` } : {}),
        ...options.headers,
      };
  
      const response = await fetch(`${this.config.baseUrl}/api/${this.config.apiVersion}${endpoint}`, {
        ...options,
        headers,
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("UNAUTHORIZED_BIOMETRIC_REAUTH_REQUIRED");
        }
        throw new Error(`MOBILE_API_ERROR_${response.status}`);
      }
  
      return response.json() as Promise<T>;
    }
  }