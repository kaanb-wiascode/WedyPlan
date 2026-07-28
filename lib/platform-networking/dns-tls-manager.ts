export interface NetworkStatusSummary {
  domainZone: string;
  dnsProvider: string;
  tlsVersion: string;
  certStatus: "VALID" | "RENEWING" | "EXPIRED";
  daysUntilCertExpiry: number;
  totalActiveVpcsCount: number;
  privateSubnetsCount: number;
  vpnTunnelsActiveCount: number;
  internalLatencyMs: number;
  currentBandwidthGbps: number;
  topologyNodes: Array<{
    nodeId: string;
    name: string;
    type: "EDGE_CDN" | "LOAD_BALANCER" | "VPC_SUBNET" | "VPN_GATEWAY";
    status: "HEALTHY" | "OPTIMIZED" | "WARNING";
    ipAddress: string;
  }>;
}

export function getNetworkStatusSnapshot(): NetworkStatusSummary {
  return {
    domainZone: "wedyplan.com",
    dnsProvider: "Cloudflare Enterprise Anycast",
    tlsVersion: "TLS 1.3 (Strict HSTS)",
    certStatus: "VALID",
    daysUntilCertExpiry: 82,
    totalActiveVpcsCount: 6,
    privateSubnetsCount: 24,
    vpnTunnelsActiveCount: 8,
    internalLatencyMs: 0.6,
    currentBandwidthGbps: 4.2,
    topologyNodes: [
      { nodeId: "node_01", name: "Global Anycast BGP Edge DNS", type: "EDGE_CDN", status: "OPTIMIZED", ipAddress: "172.67.18.24" },
      { nodeId: "node_02", name: "AWS ALB L7 Smart Load Balancer", type: "LOAD_BALANCER", status: "HEALTHY", ipAddress: "10.0.1.12" },
      { nodeId: "node_03", name: "k8s-prod-private-subnet-01", type: "VPC_SUBNET", status: "HEALTHY", ipAddress: "10.0.12.0/24" },
      { nodeId: "node_04", name: "WireGuard Enterprise Mesh VPN Gateway", type: "VPN_GATEWAY", status: "HEALTHY", ipAddress: "10.200.0.1" },
    ],
  };
}
