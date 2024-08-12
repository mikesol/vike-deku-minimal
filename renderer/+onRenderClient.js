export { onRenderClient };

import { fromJSON } from "../output/Vike.Minimal.Util";
import { hydrateInBody } from "../output/Deku.Toplevel"
import { layout } from "../output/Vike.Minimal.Renderer.Layout"
import { route } from "../output/Vike.Minimal.Pages.Route"

async function onRenderClient(pageContext) {
  const cache = fromJSON(pageContext.dekuHydrationData)();
  // discards unsubscribe
  const Page = route(pageContext);
  hydrateInBody(cache)(layout(Page))();
}
