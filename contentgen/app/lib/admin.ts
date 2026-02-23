import { clerkClient } from "@clerk/clerk-sdk-node";

export async function requireAdmin(clerkId: string) {
  const user = await clerkClient.users.getUser(clerkId);
  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase();
  if (!email) {
    return false;
  }
  const env = process.env.ADMIN_EMAILS || "";
  const allowList = env
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  return allowList.includes(email);
}
