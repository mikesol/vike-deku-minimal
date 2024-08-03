module Vike.Minimal.Page.Index where

import Deku.Core (Nut)
import Deku.DOM as D
import Vike.Minimal.Page.Index.Counter (counter)

page :: Array Nut
page =
  [ D.h1__ "Welcome"
  , D.text_ "This page is:"
  , D.ul []
      [ D.li [] [ D.text_ "Rendered to HTML." ]
      , D.li []
          [ D.text_ "Interactive. "
          , counter
          ]
      ]
  ]
