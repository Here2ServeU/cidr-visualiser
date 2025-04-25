import IPCIDR from "ip-cidr";

// Convert BigInt to string IP (compatible with ES2019)
function bigIntToIP(bigint: bigint): string {
  const part1 = (bigint >> BigInt(24)) & BigInt(255);
  const part2 = (bigint >> BigInt(16)) & BigInt(255);
  const part3 = (bigint >> BigInt(8)) & BigInt(255);
  const part4 = bigint & BigInt(255);
  return [part1, part2, part3, part4].map((part) => part.toString()).join(".");
}

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
