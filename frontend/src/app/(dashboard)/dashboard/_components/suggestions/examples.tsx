'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Bot,
  Briefcase,
  Settings,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Target,
  Brain,
  Globe,
  Heart,
  PenTool,
  Code,
  Camera,
  Calendar,
  DollarSign,
  Rocket,
} from 'lucide-react';

type PromptExample = {
  title: string;
  query: string;
  icon: React.ReactNode;
};

const allPrompts: PromptExample[] = [
  // Turkic World
  {
    title: 'Turkic world media coverage',
    query: 'Analyze how Azerbaijan is portrayed in Turkish, Kazakh, Uzbek, and Kyrgyz media over the last 30 days. Focus on economic cooperation, cultural ties, and geopolitical alignment within the Turkic Council.',
    icon: <Globe className="text-blue-700 dark:text-blue-400" size={16} />,
  },
  {
    title: 'Turkey-Azerbaijan relations analysis',
    query: 'Examine Turkish media coverage of Azerbaijan in the past month, focusing on bilateral relations, energy cooperation, defense partnership, and cultural exchanges. Compare government vs opposition media narratives.',
    icon: <Users className="text-cyan-700 dark:text-cyan-400" size={16} />,
  },
  
  // Arab World
  {
    title: 'Gulf states media perspective',
    query: 'Analyze how UAE, Saudi Arabia, and Qatar media cover Azerbaijan over the last 30 days. Focus on energy partnerships, investment opportunities, and diplomatic relations.',
    icon: <DollarSign className="text-emerald-700 dark:text-emerald-400" size={16} />,
  },
  {
    title: 'Arab world comprehensive scan',
    query: 'Conduct analysis of Azerbaijan coverage in Egyptian, Lebanese, Jordanian, and Gulf media. Compare narratives on energy cooperation, religious tolerance, and regional security.',
    icon: <Globe className="text-amber-700 dark:text-amber-400" size={16} />,
  },
  
  // World Powers
  {
    title: 'US-EU media analysis',
    query: 'Analyze Azerbaijan coverage in American (CNN, NYT, WSJ) and European (BBC, DW, Le Monde) media over the past month. Focus on energy security, democratic development, and regional conflicts.',
    icon: <BarChart3 className="text-green-700 dark:text-green-400" size={16} />,
  },
  {
    title: 'Russia-China perspectives',
    query: 'Compare how Russian (TASS, RT, Kommersant) and Chinese (Xinhua, CGTN, Global Times) media portray Azerbaijan. Focus on economic partnerships, regional influence, and geopolitical positioning.',
    icon: <TrendingUp className="text-red-700 dark:text-red-400" size={16} />,
  },
  {
    title: 'G7 nations media monitoring',
    query: 'Analyze Azerbaijan coverage across G7 countries (US, UK, Germany, France, Italy, Japan, Canada) media. Compare narratives on energy transition, human rights, and economic development.',
    icon: <Briefcase className="text-purple-700 dark:text-purple-400" size={16} />,
  },
  
  // Immediate Neighbors
  {
    title: 'South Caucasus neighbors',
    query: 'Analyze how Georgian and Armenian media cover Azerbaijan over the past 30 days. Focus on regional cooperation, border issues, and economic competition.',
    icon: <Target className="text-orange-700 dark:text-orange-400" size={16} />,
  },
  {
    title: 'Iran media monitoring',
    query: 'Examine Iranian media coverage of Azerbaijan (Farsi sources) focusing on bilateral relations, regional security, transit corridors, and cultural ties. Include both state and reformist media.',
    icon: <Shield className="text-rose-700 dark:text-rose-400" size={16} />,
  },
  {
    title: 'All neighbors comprehensive',
    query: 'Analyze Azerbaijan coverage in all neighboring countries (Russia, Iran, Georgia, Armenia, Turkey) media. Compare narratives on border security, trade relations, and regional projects.',
    icon: <Users className="text-indigo-700 dark:text-indigo-400" size={16} />,
  },
  
  // Specialized Analysis
  {
    title: 'Energy sector focus',
    query: 'Analyze international media coverage of Azerbaijan\'s energy sector, focusing on gas supplies to Europe, renewable energy projects, and OPEC+ relations. Include specialized energy publications.',
    icon: <Zap className="text-yellow-600 dark:text-yellow-300" size={16} />,
  },
  {
    title: 'COP29 preparation coverage',
    query: 'Monitor global media coverage of Azerbaijan\'s COP29 hosting preparations. Analyze environmental, diplomatic, and economic narratives across different regions.',
    icon: <Heart className="text-green-600 dark:text-green-300" size={16} />,
  },
  {
    title: 'Karabakh reconstruction news',
    query: 'Analyze international media coverage of Karabakh reconstruction efforts. Compare narratives in Western, Russian, Turkish, and regional media outlets.',
    icon: <Rocket className="text-violet-700 dark:text-violet-400" size={16} />,
  },
  
  // Regional Blocs
  {
    title: 'EU media comprehensive',
    query: 'Analyze Azerbaijan coverage across major EU countries (Germany, France, Italy, Spain, Netherlands, Belgium). Focus on energy security, Eastern Partnership, and trade relations.',
    icon: <Briefcase className="text-blue-600 dark:text-blue-300" size={16} />,
  },
  {
    title: 'Post-Soviet space analysis',
    query: 'Examine media coverage of Azerbaijan in Russia, Ukraine, Belarus, and Central Asian republics. Compare narratives on regional integration, economic cooperation, and security.',
    icon: <Globe className="text-slate-700 dark:text-slate-400" size={16} />,
  },
  {
    title: 'OIC member states scan',
    query: 'Analyze how Organization of Islamic Cooperation member states media cover Azerbaijan. Focus on religious tolerance model, interfaith dialogue, and Islamic heritage preservation.',
    icon: <Brain className="text-pink-700 dark:text-pink-400" size={16} />,
  },
  
  // Strategic Topics
  {
    title: 'Transport corridor coverage',
    query: 'Analyze international media coverage of Middle Corridor and North-South transport routes through Azerbaijan. Focus on economic impact and geopolitical significance.',
    icon: <Settings className="text-teal-700 dark:text-teal-400" size={16} />,
  },
  {
    title: 'Investment climate perception',
    query: 'Monitor how international business media (FT, Bloomberg, Reuters, WSJ) cover Azerbaijan\'s investment climate, economic reforms, and business opportunities.',
    icon: <DollarSign className="text-emerald-600 dark:text-emerald-300" size={16} />,
  },
  {
    title: 'Tourism sector coverage',
    query: 'Analyze how international travel and lifestyle media cover Azerbaijan as tourist destination. Include major travel publications and influencer content.',
    icon: <Camera className="text-fuchsia-700 dark:text-fuchsia-400" size={16} />,
  },
  {
    title: 'Weekly media sentiment tracker',
    query: 'Provide a 7-day media sentiment analysis of Azerbaijan coverage across US, EU, Russia, Turkey, and Iran. Highlight major themes and sentiment shifts.',
    icon: <Calendar className="text-stone-700 dark:text-stone-400" size={16} />,
  },
];

// Function to get random prompts
const getRandomPrompts = (count: number = 3): PromptExample[] => {
  const shuffled = [...allPrompts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const Examples = ({
  onSelectPrompt,
}: {
  onSelectPrompt?: (query: string) => void;
}) => {
  const [displayedPrompts, setDisplayedPrompts] = useState<PromptExample[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize with random prompts on mount
  useEffect(() => {
    setDisplayedPrompts(getRandomPrompts(3));
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setDisplayedPrompts(getRandomPrompts(3));
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-muted-foreground font-medium">Quick starts</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <RefreshCw size={10} />
          </motion.div>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {displayedPrompts.map((prompt, index) => (
          <motion.div
            key={`${prompt.title}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut"
            }}
          >
            <Card
              className="group cursor-pointer h-full shadow-none transition-all bg-sidebar hover:bg-neutral-100 dark:hover:bg-neutral-800/60 p-0 justify-center"
              onClick={() => onSelectPrompt && onSelectPrompt(prompt.query)}
            >
              <CardHeader className="p-3 grid-rows-1">
                <div className="flex items-start justify-center gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    {React.cloneElement(prompt.icon as React.ReactElement, { size: 14 })}
                  </div>
                  <CardTitle className="font-normal group-hover:text-foreground transition-all text-muted-foreground text-xs leading-relaxed line-clamp-3">
                    {prompt.title}
                  </CardTitle>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};