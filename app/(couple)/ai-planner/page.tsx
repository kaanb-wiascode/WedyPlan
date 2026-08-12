import { requireUserId } from "@/lib/auth/require-ids";
import AIPlannerClient from "@/components/couple/ai-planner/AIPlannerClient";

export default async function AIPlannerPage() {
  const userId = await requireUserId();

  return <AIPlannerClient userId={userId}/>;
}
