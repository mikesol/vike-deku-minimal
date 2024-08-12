export { onRenderHtml };

import { escapeInject, dangerouslySkipEscape } from "vike/server";
import jsdomGlobal from "jsdom-global";
import { ssrInBody } from "../output/Deku.Toplevel"
import { layout } from "../output/Vike.Minimal.Renderer.Layout"
import { toJSON } from "../output/Vike.Minimal.Util";
import { route } from "../output/Vike.Minimal.Pages.Route"

async function onRenderHtml(pageContext) {
  jsdomGlobal();
  const Page = route(pageContext);
  document.getElementsByTagName("html")[0].innerHTML =
    '<head></head><body></body>';
  const cache = ssrInBody(layout(Page))();
  const viewHtml = dangerouslySkipEscape(cache.html);

  pageContext.dekuHydrationData = toJSON(cache);

  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
      <style>
        body {
          margin: 0;
          font-family: sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
        }

        .navitem {
          padding: 3px;
        }
      </style>
      </head>
      <body>
        ${viewHtml}
      </body>
    </html>`;
}
