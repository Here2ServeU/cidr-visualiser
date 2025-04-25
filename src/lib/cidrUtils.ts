import IPCIDR from "ip-cidr";

// Convert BigInt to string IP
function bigIntToIP(bigint: bigint): string {
  return [
    (bigint >> 24n) & 255n,
    (bigint >> 16n) & 255n,
    (bigint >> 8n) & 255n,
    bigint & 255n
  ].join(".");
}

// Subtract 1 from an IP address string
function decrementIP(ip: string): string {
  const parts = ip.split(".").map(Number);
  for (let i = 3; i >= 0; i--) {
    if (parts[i] > 0) {
      parts[i]--;
      break;
    } else {
      parts[i] = 255;
    }
  }
  return parts.join(".");
}

export function calculateCIDRInfo(cidr: string) {
  if (!IPCIDR.isValidCIDR(cidr)) {
    throw new Error("Invalid CIDR");
  }

  const cidrObj = new IPCIDR(cidr);
  const firstUsable = cidrObj.start({ from: 1 });
  const broadcastBigInt = cidrObj.end({ type: "bigInteger" });
  const broadcastIP = bigIntToIP(broadcastBigInt);
  const lastUsable = decrementIP(broadcastIP);

  const subnetMask = cidrObj.subnetMask;
  const count = cidrObj.addressCount - 2;

  return {
    netmask: subnetMask,
    firstUsable,
    lastUsable,
    count,
  };
}
