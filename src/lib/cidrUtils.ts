import IPCIDR from "ip-cidr";

// Convert BigInt to IP string
function bigIntToIP(bigint: bigint): string {
  const part1 = (bigint >> BigInt(24)) & BigInt(255);
  const part2 = (bigint >> BigInt(16)) & BigInt(255);
  const part3 = (bigint >> BigInt(8)) & BigInt(255);
  const part4 = bigint & BigInt(255);
  return [part1, part2, part3, part4].map(part => part.toString()).join(".");
}

// Convert prefix length to subnet mask
function prefixToNetmask(prefix: number): string {
  const mask = (0xFFFFFFFF << (32 - prefix)) >>> 0;
  return [24, 16, 8, 0].map(shift => (mask >> shift) & 255).join(".");
}

// Decrement IP address by 1
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

  const prefixLength = parseInt(cidr.split("/")[1]);
  const cidrObj = new IPCIDR(cidr);
  const subnetMask = prefixToNetmask(prefixLength);

  const firstUsable = cidrObj.start({ from: 1 });

  const rawEnd = cidrObj.end({ type: "bigInteger" });
  if (typeof rawEnd !== "bigint") {
    throw new Error("Unexpected format from CIDR end()");
  }

  const broadcastIP = bigIntToIP(rawEnd);
  const lastUsable = decrementIP(broadcastIP);
  const totalCount = Math.pow(2, 32 - prefixLength);
  const count = totalCount > 2 ? totalCount - 2 : 0; // avoid negative counts

  return {
    netmask: subnetMask,
    firstUsable,
    lastUsable,
    count,
  };
}
