import type { ReactNode } from "react";
import {
  FaBolt,
  FaBriefcase,
  FaChartLine,
  FaCodeBranch,
  FaCogs,
  FaGlobe,
  FaHandshake,
  FaLayerGroup,
  FaMobileAlt,
  FaRocket,
  FaServer,
  FaStar,
  FaUser,
} from "react-icons/fa";

const ICONS: Record<string, ReactNode> = {
  briefcase: <FaBriefcase />,
  server: <FaServer />,
  user: <FaUser />,
  home: <FaRocket />,
  globe: <FaGlobe />,
  bolt: <FaBolt />,
  chart: <FaChartLine />,
  chartline: <FaChartLine />,
  handshake: <FaHandshake />,
  code: <FaCodeBranch />,
  branch: <FaCodeBranch />,
  layers: <FaLayerGroup />,
  cogs: <FaCogs />,
  mobile: <FaMobileAlt />,
  star: <FaStar />,
};

export function getIconNode(key?: string | null, fallback: ReactNode = <FaStar />) {
  if (!key) {
    return fallback;
  }

  const normalized = key.toLowerCase().replace(/[^a-z]/g, "");
  return ICONS[normalized] || fallback;
}
