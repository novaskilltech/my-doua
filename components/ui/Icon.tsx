import { cn } from '@/lib/utils';
import { 
  CloudRain, 
  Wind, 
  Heart, 
  Zap, 
  Moon, 
  Activity, 
  Wallet, 
  RotateCcw, 
  ShieldAlert, 
  Eye, 
  Scale, 
  Sparkles, 
  EyeOff, 
  UserX, 
  Frown, 
  Sun, 
  Smile, 
  TrendingDown, 
  TrendingUp, 
  Baby, 
  Anchor, 
  ShieldCheck, 
  Leaf, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';

const iconMap: Record<string, any> = {
  cloudrain: CloudRain,
  wind: Wind,
  heart: Heart,
  zap: Zap,
  moon: Moon,
  activity: Activity,
  wallet: Wallet,
  rotateccw: RotateCcw,
  shieldalert: ShieldAlert,
  eye: Eye,
  scale: Scale,
  sparkles: Sparkles,
  eyeoff: EyeOff,
  userx: UserX,
  frown: Frown,
  sun: Sun,
  smile: Smile,
  trendingdown: TrendingDown,
  trendingup: TrendingUp,
  baby: Baby,
  anchor: Anchor,
  shieldcheck: ShieldCheck,
  leaf: Leaf,
  messagesquare: MessageSquare,
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export function Icon({ name, className, size = 28 }: IconProps) {
  const IconComponent = iconMap[name.toLowerCase()] || HelpCircle;
  return <IconComponent className={className} size={size} />;
}
