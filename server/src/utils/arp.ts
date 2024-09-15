import arp, { toIP } from "@network-utils/arp-lookup";

export const getStatus = async (mac: string) => {
  const ip = await arp.toIP(mac);
  if (!ip) {
    return;
  } else {
    return ip;
  }
};

export default getStatus;
