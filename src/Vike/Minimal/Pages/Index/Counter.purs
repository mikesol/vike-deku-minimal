module Vike.Minimal.Pages.Index.Counter where

import Prelude

import Data.Tuple.Nested ((/\))
import Deku.Core (Nut, useState)
import Deku.DOM as D
import Deku.DOM.Attributes as DA
import Deku.DOM.Listeners as DC
import Deku.DOM.Listeners as DL
import Deku.Do as Deku

counter :: Nut
counter = Deku.do
  setCount /\ count <- useState 0
  D.button
    [ DA.xtype_ "button"
    , DC.runOn DL.click (count <#> add 1 >>> setCount)
    ]
    [ D.text_ "Counter ", D.text $ show <$> count ]
