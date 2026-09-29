import { redirect } from 'next/navigation';

export default async function LegacyVenueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/firma/${encodeURIComponent(id)}`);
}
