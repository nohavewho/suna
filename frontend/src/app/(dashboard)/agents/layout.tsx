import { agentPlaygroundFlagFrontend } from '@/flags';
import { isFlagEnabled } from '@/lib/feature-flags';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Agent Conversation | Kortix Agent AZ',
  description: 'Interactive agent conversation powered by Kortix Agent AZ',
  openGraph: {
    title: 'Agent Conversation | Kortix Agent AZ',
    description: 'Interactive agent conversation powered by Kortix Agent AZ',
    type: 'website',
  },
};

export default async function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const agentPlaygroundEnabled = await isFlagEnabled('custom_agents');
  if (!agentPlaygroundEnabled) {
    redirect('/dashboard');
  }
  return <>{children}</>;
}
