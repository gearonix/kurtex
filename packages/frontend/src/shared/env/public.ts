/**
 * Next.js can't resolve simple process.env statement
 * (returns empty object in the client-side)
 * so key mapping is required :(
 * @see https://github.com/vercel/next.js/issues/30612
 */

export const nextPublicEnv: Record<string, unknown> = {
  GRAPHQL_URI_PREFIX: process.env.NEXT_PUBLIC_GRAPHQL_URI_PREFIX,
  NODE_ENV: process.env.NODE_ENV,
  SERVER_PREFIX: process.env.NEXT_PUBLIC_SERVER_PREFIX,
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  SOURCE_ROOT_FRONTEND: process.env.NEXT_PUBLIC_SOURCE_ROOT_FRONTEND
}
