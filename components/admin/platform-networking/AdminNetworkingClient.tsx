"use client";

import React, { useState } from "react";
import NetworkingHeader from "./NetworkingHeader";
import NetworkTopologyBento from "./NetworkTopologyBento";
import DnsTlsManagerConsole from "./DnsTlsManagerConsole";
import NetworkHealthViewer from "./NetworkHealthViewer";

export default function AdminNetworkingClient() {
  const [data] = useState({
    domainZone: "wedyplan.com",
    tlsVersion: "TLS 1.3 (Strict HSTS)",
    internalLatencyMs: 0.6,
    currentBandwidthGbps: 4.2,
    nodes: [
      { nodeId: "node_01", name: "Global Anycast BGP Edge DNS", type: "EDGE_CDN", status: "OPTIMIZED", ipAddress: "172.67.18.24" },
      { nodeId: "node_02", name: "AWS ALB L7 Smart Load Balancer", type: "LOAD_BALANCER", status: "HEALTHY", ipAddress: "10.0.1.12" },
      { nodeId: "node_03", name: "k8s-prod-private-subnet-01", type: "VPC_SUBNET", status: "HEALTHY", ipAddress: "10.0.12.0/24" },
      { nodeId: "node_04", name: "WireGuard Enterprise Mesh VPN Gateway", type: "VPN_GATEWAY", status: "HEALTHY", ipAddress: "10.200.0.1" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <NetworkingHeader
        domainZone={data.domainZone}
        tlsVersion={data.tlsVersion}
        internalLatencyMs={data.internalLatencyMs}
        currentBandwidthGbps={data.currentBandwidthGbps}
        onOpenDnsModal={() => alert("🌐 DNS & TLS Manager Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <DnsTlsManagerConsole />
          <NetworkHealthViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <NetworkTopologyBento nodes={data.nodes} />
        </div>
      </div>
    </div>
  );
}
