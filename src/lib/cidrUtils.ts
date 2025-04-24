import IPCIDR from "ip-cidr";

// Simple IP address decrementer for last usable IP
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
  const broadcastIP = cidrObj.end(); // returns broadcast address
  const lastUsable = decrementIP(broadcastIP); // subtract one from broadcast
  const subnetMask = cidrObj.subnetMask;
  const count = cidrObj.addressCount - 2;

  return {
    netmask: subnetMask,
    firstUsable,
    lastUsable,
    count,
  };
}
