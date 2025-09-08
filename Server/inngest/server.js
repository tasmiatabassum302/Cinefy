import { serve } from "inngest/vercel";
import { inngest, functions } from "./index.js";

export default serve({
  client: inngest,
  functions,
});
