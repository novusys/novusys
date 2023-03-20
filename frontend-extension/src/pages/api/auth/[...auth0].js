/** Path => pages/api/auth/[...auth0].js
 * This creates routes:
 * /api/auth/login
 * /api/auth/logout
 * /api/auth/callback
 * /api/auth/me
 *
 * */
import { handleAuth } from "@auth0/nextjs-auth0";

export default handleAuth();
