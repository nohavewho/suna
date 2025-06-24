'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { 
  CalendarIcon, 
  Globe, 
  Target, 
  Search,
  X,
  ChevronDown
} from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

type Country = {
  code: string;
  name: string;
  flag: string;
  region: string;
};

const COUNTRIES: Country[] = [
  // A
  { code: 'AD', name: 'Andorra', flag: '🇦🇩', region: 'Europe' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East' },
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', region: 'Asia' },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬', region: 'Caribbean' },
  { code: 'AI', name: 'Anguilla', flag: '🇦🇮', region: 'Caribbean' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱', region: 'Europe' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', region: 'Asia' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', region: 'Africa' },
  { code: 'AQ', name: 'Antarctica', flag: '🇦🇶', region: 'Antarctica' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', region: 'South America' },
  { code: 'AS', name: 'American Samoa', flag: '🇦🇸', region: 'Oceania' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', region: 'Europe' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Oceania' },
  { code: 'AW', name: 'Aruba', flag: '🇦🇼', region: 'Caribbean' },
  { code: 'AX', name: 'Åland Islands', flag: '🇦🇽', region: 'Europe' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', region: 'Asia' },
  
  // B
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', region: 'Europe' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧', region: 'Caribbean' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', region: 'Asia' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', region: 'Europe' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', region: 'Africa' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', region: 'Europe' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', region: 'Middle East' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', region: 'Africa' },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', region: 'Africa' },
  { code: 'BL', name: 'Saint Barthélemy', flag: '🇧🇱', region: 'Caribbean' },
  { code: 'BM', name: 'Bermuda', flag: '🇧🇲', region: 'North America' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', region: 'Asia' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', region: 'South America' },
  { code: 'BQ', name: 'Caribbean Netherlands', flag: '🇧🇶', region: 'Caribbean' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', region: 'South America' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', region: 'Caribbean' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹', region: 'Asia' },
  { code: 'BV', name: 'Bouvet Island', flag: '🇧🇻', region: 'Antarctica' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', region: 'Africa' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', region: 'Europe' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿', region: 'North America' },
  
  // C
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'North America' },
  { code: 'CC', name: 'Cocos Islands', flag: '🇨🇨', region: 'Oceania' },
  { code: 'CD', name: 'DR Congo', flag: '🇨🇩', region: 'Africa' },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫', region: 'Africa' },
  { code: 'CG', name: 'Republic of the Congo', flag: '🇨🇬', region: 'Africa' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', region: 'Europe' },
  { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', region: 'Africa' },
  { code: 'CK', name: 'Cook Islands', flag: '🇨🇰', region: 'Oceania' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', region: 'South America' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', region: 'Africa' },
  { code: 'CN', name: 'China', flag: '🇨🇳', region: 'Asia' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', region: 'South America' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', region: 'North America' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', region: 'Caribbean' },
  { code: 'CV', name: 'Cape Verde', flag: '🇨🇻', region: 'Africa' },
  { code: 'CW', name: 'Curaçao', flag: '🇨🇼', region: 'Caribbean' },
  { code: 'CX', name: 'Christmas Island', flag: '🇨🇽', region: 'Oceania' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', region: 'Europe' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', region: 'Europe' },
  
  // D
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'Europe' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', region: 'Africa' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', region: 'Europe' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲', region: 'Caribbean' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', region: 'Caribbean' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', region: 'Africa' },
  
  // E
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', region: 'South America' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', region: 'Europe' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', region: 'Africa' },
  { code: 'EH', name: 'Western Sahara', flag: '🇪🇭', region: 'Africa' },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷', region: 'Africa' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', region: 'Europe' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', region: 'Africa' },
  
  // F
  { code: 'FI', name: 'Finland', flag: '🇫🇮', region: 'Europe' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯', region: 'Oceania' },
  { code: 'FK', name: 'Falkland Islands', flag: '🇫🇰', region: 'South America' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲', region: 'Oceania' },
  { code: 'FO', name: 'Faroe Islands', flag: '🇫🇴', region: 'Europe' },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'Europe' },
  
  // G
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', region: 'Africa' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩', region: 'Caribbean' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', region: 'Asia' },
  { code: 'GF', name: 'French Guiana', flag: '🇬🇫', region: 'South America' },
  { code: 'GG', name: 'Guernsey', flag: '🇬🇬', region: 'Europe' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', region: 'Africa' },
  { code: 'GI', name: 'Gibraltar', flag: '🇬🇮', region: 'Europe' },
  { code: 'GL', name: 'Greenland', flag: '🇬🇱', region: 'North America' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲', region: 'Africa' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳', region: 'Africa' },
  { code: 'GP', name: 'Guadeloupe', flag: '🇬🇵', region: 'Caribbean' },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', region: 'Africa' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', region: 'Europe' },
  { code: 'GS', name: 'South Georgia', flag: '🇬🇸', region: 'Antarctica' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', region: 'North America' },
  { code: 'GU', name: 'Guam', flag: '🇬🇺', region: 'Oceania' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', region: 'Africa' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾', region: 'South America' },
  
  // H
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', region: 'Asia' },
  { code: 'HM', name: 'Heard Island', flag: '🇭🇲', region: 'Antarctica' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', region: 'North America' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', region: 'Europe' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', region: 'Caribbean' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', region: 'Europe' },
  
  // I
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', region: 'Asia' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', region: 'Europe' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', region: 'Middle East' },
  { code: 'IM', name: 'Isle of Man', flag: '🇮🇲', region: 'Europe' },
  { code: 'IN', name: 'India', flag: '🇮🇳', region: 'Asia' },
  { code: 'IO', name: 'British Indian Ocean Territory', flag: '🇮🇴', region: 'Oceania' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', region: 'Middle East' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', region: 'Middle East' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', region: 'Europe' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', region: 'Europe' },
  
  // J
  { code: 'JE', name: 'Jersey', flag: '🇯🇪', region: 'Europe' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', region: 'Caribbean' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', region: 'Middle East' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', region: 'Asia' },
  
  // K
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', region: 'Africa' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', region: 'Asia' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', region: 'Asia' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮', region: 'Oceania' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲', region: 'Africa' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳', region: 'Caribbean' },
  { code: 'KP', name: 'North Korea', flag: '🇰🇵', region: 'Asia' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', region: 'Asia' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', region: 'Middle East' },
  { code: 'KY', name: 'Cayman Islands', flag: '🇰🇾', region: 'Caribbean' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', region: 'Asia' },
  
  // L
  { code: 'LA', name: 'Laos', flag: '🇱🇦', region: 'Asia' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', region: 'Middle East' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨', region: 'Caribbean' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', region: 'Europe' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', region: 'Asia' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', region: 'Africa' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸', region: 'Africa' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', region: 'Europe' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', region: 'Europe' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', region: 'Europe' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', region: 'Africa' },
  
  // M
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', region: 'Africa' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', region: 'Europe' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', region: 'Europe' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', region: 'Europe' },
  { code: 'MF', name: 'Saint Martin', flag: '🇲🇫', region: 'Caribbean' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', region: 'Africa' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭', region: 'Oceania' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', region: 'Europe' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', region: 'Africa' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', region: 'Asia' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳', region: 'Asia' },
  { code: 'MO', name: 'Macau', flag: '🇲🇴', region: 'Asia' },
  { code: 'MP', name: 'Northern Mariana Islands', flag: '🇲🇵', region: 'Oceania' },
  { code: 'MQ', name: 'Martinique', flag: '🇲🇶', region: 'Caribbean' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷', region: 'Africa' },
  { code: 'MS', name: 'Montserrat', flag: '🇲🇸', region: 'Caribbean' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', region: 'Europe' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺', region: 'Africa' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', region: 'Asia' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', region: 'Africa' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', region: 'North America' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', region: 'Asia' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', region: 'Africa' },
  
  // N
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', region: 'Africa' },
  { code: 'NC', name: 'New Caledonia', flag: '🇳🇨', region: 'Oceania' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', region: 'Africa' },
  { code: 'NF', name: 'Norfolk Island', flag: '🇳🇫', region: 'Oceania' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', region: 'Africa' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', region: 'North America' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', region: 'Europe' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', region: 'Europe' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', region: 'Asia' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷', region: 'Oceania' },
  { code: 'NU', name: 'Niue', flag: '🇳🇺', region: 'Oceania' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', region: 'Oceania' },
  
  // O
  { code: 'OM', name: 'Oman', flag: '🇴🇲', region: 'Middle East' },
  
  // P
  { code: 'PA', name: 'Panama', flag: '🇵🇦', region: 'North America' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', region: 'South America' },
  { code: 'PF', name: 'French Polynesia', flag: '🇵🇫', region: 'Oceania' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', region: 'Oceania' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', region: 'Asia' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', region: 'Asia' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', region: 'Europe' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', flag: '🇵🇲', region: 'North America' },
  { code: 'PN', name: 'Pitcairn', flag: '🇵🇳', region: 'Oceania' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷', region: 'Caribbean' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸', region: 'Middle East' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', region: 'Europe' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼', region: 'Oceania' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', region: 'South America' },
  
  // Q
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', region: 'Middle East' },
  
  // R
  { code: 'RE', name: 'Réunion', flag: '🇷🇪', region: 'Africa' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', region: 'Europe' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', region: 'Europe' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', region: 'Europe/Asia' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', region: 'Africa' },
  
  // S
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧', region: 'Oceania' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', region: 'Africa' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', region: 'Africa' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', region: 'Europe' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'Asia' },
  { code: 'SH', name: 'Saint Helena', flag: '🇸🇭', region: 'Africa' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', region: 'Europe' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen', flag: '🇸🇯', region: 'Europe' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', region: 'Europe' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', region: 'Africa' },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲', region: 'Europe' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', region: 'Africa' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴', region: 'Africa' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷', region: 'South America' },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸', region: 'Africa' },
  { code: 'ST', name: 'São Tomé and Príncipe', flag: '🇸🇹', region: 'Africa' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', region: 'North America' },
  { code: 'SX', name: 'Sint Maarten', flag: '🇸🇽', region: 'Caribbean' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾', region: 'Middle East' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', region: 'Africa' },
  
  // T
  { code: 'TC', name: 'Turks and Caicos Islands', flag: '🇹🇨', region: 'Caribbean' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩', region: 'Africa' },
  { code: 'TF', name: 'French Southern Territories', flag: '🇹🇫', region: 'Antarctica' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', region: 'Africa' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', region: 'Asia' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', region: 'Asia' },
  { code: 'TK', name: 'Tokelau', flag: '🇹🇰', region: 'Oceania' },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱', region: 'Asia' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', region: 'Asia' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', region: 'Africa' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴', region: 'Oceania' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', region: 'Europe/Asia' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹', region: 'Caribbean' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻', region: 'Oceania' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', region: 'Asia' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', region: 'Africa' },
  
  // U
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', region: 'Europe' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', region: 'Africa' },
  { code: 'UM', name: 'United States Minor Outlying Islands', flag: '🇺🇲', region: 'Oceania' },
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'North America' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', region: 'South America' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', region: 'Asia' },
  
  // V
  { code: 'VA', name: 'Vatican City', flag: '🇻🇦', region: 'Europe' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', region: 'Caribbean' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', region: 'South America' },
  { code: 'VG', name: 'British Virgin Islands', flag: '🇻🇬', region: 'Caribbean' },
  { code: 'VI', name: 'U.S. Virgin Islands', flag: '🇻🇮', region: 'Caribbean' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', region: 'Asia' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺', region: 'Oceania' },
  
  // W
  { code: 'WF', name: 'Wallis and Futuna', flag: '🇼🇫', region: 'Oceania' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸', region: 'Oceania' },
  
  // X
  { code: 'XK', name: 'Kosovo', flag: '🇽🇰', region: 'Europe' },
  
  // Y
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', region: 'Middle East' },
  { code: 'YT', name: 'Mayotte', flag: '🇾🇹', region: 'Africa' },
  
  // Z
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', region: 'Africa' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', region: 'Africa' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', region: 'Africa' },
];

const DATE_PRESETS = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 3 months', days: 90 },
  { label: 'Last 6 months', days: 180 },
];

type MediaAnalysisSelectorProps = {
  onAnalyze: (prompt: string) => void;
  className?: string;
};

export const MediaAnalysisSelector: React.FC<MediaAnalysisSelectorProps> = ({
  onAnalyze,
  className
}) => {
  const [targetGeo, setTargetGeo] = useState<string>('AZ');
  const [sourceCountries, setSourceCountries] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  const selectedCountries = COUNTRIES.filter(c => sourceCountries.includes(c.code));
  const availableCountries = COUNTRIES.filter(c => 
    c.code !== targetGeo && 
    (countrySearch === '' || c.name.toLowerCase().includes(countrySearch.toLowerCase()))
  );

  const toggleSourceCountry = (countryCode: string) => {
    if (sourceCountries.includes(countryCode)) {
      setSourceCountries(sourceCountries.filter(c => c !== countryCode));
    } else if (sourceCountries.length < 20) {
      setSourceCountries([...sourceCountries, countryCode]);
    }
  };

  const removeSourceCountry = (countryCode: string) => {
    setSourceCountries(sourceCountries.filter(c => c !== countryCode));
  };

  const setDatePreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setDateRange({ from: start, to: end });
  };

  const generateAnalysisPrompt = () => {
    const targetCountry = COUNTRIES.find(c => c.code === targetGeo);
    const sourceCountryNames = selectedCountries.map(c => c.name);
    
    let prompt = `Analyze how ${targetCountry?.name} is portrayed in media from: ${sourceCountryNames.join(', ')}`;
    
    if (dateRange?.from && dateRange?.to) {
      const fromDate = format(dateRange.from, 'yyyy-MM-dd');
      const toDate = format(dateRange.to, 'yyyy-MM-dd');
      prompt += ` over the period from ${fromDate} to ${toDate}`;
    } else if (dateRange?.from) {
      const fromDate = format(dateRange.from, 'yyyy-MM-dd');
      prompt += ` starting from ${fromDate}`;
    }
    
    prompt += '. Focus on economic cooperation, diplomatic relations, energy partnerships, and geopolitical developments. Provide sentiment analysis and key themes.';
    
    return prompt;
  };

  const handleAnalyze = () => {
    if (sourceCountries.length === 0) return;
    
    const prompt = generateAnalysisPrompt();
    onAnalyze(prompt);
  };

  const isValidSelection = sourceCountries.length > 0;

  return (
    <div className={cn("w-full max-w-4xl mx-auto px-4", className)}>
      <div className="text-center mb-4 hidden lg:block">
        <h2 className="text-xl font-medium text-muted-foreground mb-1">
          Media Analysis Configuration
        </h2>
        <p className="text-xs text-muted-foreground/70">
          Configure your media monitoring parameters
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4 lg:mb-6">
        {/* Target Geography */}
        <Card className="p-3 lg:p-4 bg-sidebar hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors">
          <div className="space-y-2 lg:space-y-3">
            <div className="flex items-center gap-2">
              <Target className="size-4 text-blue-600" />
              <Label className="text-sm font-medium">Target Geography</Label>
            </div>
            <Select value={targetGeo} onValueChange={setTargetGeo}>
              <SelectTrigger className="w-full shadow-sm border-border/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground hidden lg:block">
              Country being analyzed in foreign media
            </p>
          </div>
        </Card>

        {/* Source Countries */}
        <Card className="p-3 lg:p-4 bg-sidebar hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors">
          <div className="space-y-2 lg:space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="size-4 text-green-600 flex-shrink-0" />
              <Label className="text-sm font-medium whitespace-nowrap">Source Countries</Label>
              <span className="text-xs text-muted-foreground ml-auto">
                {sourceCountries.length}/20
              </span>
            </div>
            
            <Popover open={isCountrySelectOpen} onOpenChange={setIsCountrySelectOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-left shadow-sm border-border/60"
                  disabled={sourceCountries.length >= 20}
                >
                  <span>
                    {sourceCountries.length === 0 
                      ? "Select" 
                      : `${sourceCountries.length} selected`
                    }
                  </span>
                  <ChevronDown className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Search countries..." 
                    value={countrySearch}
                    onValueChange={setCountrySearch}
                  />
                  <CommandList>
                    <CommandEmpty>No countries found.</CommandEmpty>
                    {/* Group countries by actual regions */}
                    {Array.from(new Set(availableCountries.map(c => c.region))).sort().map((region) => {
                      const regionCountries = availableCountries.filter(c => c.region === region);
                      if (regionCountries.length === 0) return null;
                      
                      return (
                        <CommandGroup key={region} heading={region}>
                          {regionCountries.map((country) => (
                            <CommandItem
                              key={country.code}
                              value={country.name}
                              onSelect={() => toggleSourceCountry(country.code)}
                              disabled={sourceCountries.length >= 20 && !sourceCountries.includes(country.code)}
                            >
                              <Checkbox 
                                checked={sourceCountries.includes(country.code)}
                                className="mr-2"
                              />
                              <span className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.name}</span>
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      );
                    })}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Selected Countries */}
            {selectedCountries.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedCountries.map((country) => (
                  <Badge key={country.code} variant="secondary" className="text-xs px-2 py-1">
                    <span>{country.flag}</span>
                    <span className="ml-1">{country.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1.5 hover:bg-transparent"
                      onClick={() => removeSourceCountry(country.code)}
                    >
                      <X className="size-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
            
            <p className="text-xs text-muted-foreground hidden lg:block">
              Countries whose media to analyze (max 20)
            </p>
          </div>
        </Card>

        {/* Date Range */}
        <Card className="p-3 lg:p-4 bg-sidebar hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors">
          <div className="space-y-2 lg:space-y-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-purple-600" />
              <Label className="text-sm font-medium">Time Period</Label>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-left font-normal shadow-sm border-border/60">
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Select time period</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {DATE_PRESETS.map((preset) => (
                      <Button
                        key={preset.days}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDatePreset(preset.days);
                        }}
                        className="text-xs"
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                  <div className="border-t pt-2">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <p className="text-xs text-muted-foreground hidden lg:block">
              Time period for media analysis
            </p>
          </div>
        </Card>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            onClick={handleAnalyze}
            disabled={!isValidSelection}
            size="lg"
            className="px-8 py-3"
          >
            <Search className="mr-2 size-4" />
            Start Media Analysis
          </Button>
        </motion.div>
      </div>
    </div>
  );
};