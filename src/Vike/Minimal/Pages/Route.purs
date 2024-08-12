module Vike.Minimal.Pages.Route where

import Untagged.Union (type (|+|), asOneOf)

route :: { urlPathname :: String } -> Boolean |+| { routeParams :: { route :: String } }
route { urlPathname } = case urlPathname of
  "/" -> asOneOf { routeParams: { route: "index" } }
  "/about/" -> asOneOf { routeParams: { route: "about" } }
  "/about" -> asOneOf { routeParams: { route: "about" } }
  _ -> asOneOf false
