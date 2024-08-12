export { onRenderClient };

import { fromJSON } from "../output/Vike.Minimal.Util";
import { hydrateInBody } from "../output/Deku.Toplevel"
import { layout } from "../output/Vike.Minimal.Renderer.Layout"
import { page as index } from "../output/Vike.Minimal.Pages.Index.Page"
import { page as about } from "../output/Vike.Minimal.Pages.About.Page"

async function onRenderClient(pageContext) {
  const cache = fromJSON(pageContext.dekuHydrationData)();
  // discards unsubscribe
  const { routeParams: { route } } = pageContext;
  const Page = route === "index" ? index : about;
  hydrateInBody(cache)(layout(Page))();
}
