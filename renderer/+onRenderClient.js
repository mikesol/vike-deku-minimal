export { onRenderClient };

import { fromJSON } from "../output/Vike.Minimal.Util";
import { hydrateInBody } from "../output/Deku.Toplevel"
import { layout } from "../output/Vike.Minimal.Renderer.Layout"

async function onRenderClient(pageContext) {
  const cache = fromJSON(pageContext.dekuHydrationData)();
  // discards unsubscribe
  hydrateInBody(cache)(layout(pageContext.Page))();
}
