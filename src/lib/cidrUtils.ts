import IPCIDR from "ip-cidr";

export function calculateCIDRInfo(cidr: string) {
  const cidrObj = new IPCIDR(cidr);
  if (!cidrObj.isValid()) {
    throw new Error("Invalid CIDR");
  }

  const firstUsable = cidrObj.start({ type: 'ip', from: 1 });
  const lastUsable = cidrObj.end({ type: 'ip', offset: -1 });
  const subnetMask = cidrObj.subnetMask;
  const count = cidrObj.addressCount - 2;

  return {
    netmask: subnetMask,
    firstUsable,
    lastUsable,
    count,
  };
}
