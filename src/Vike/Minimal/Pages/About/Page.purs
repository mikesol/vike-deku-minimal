module Vike.Minimal.Pages.About.Page where

import Deku.Core (Nut)
import Deku.DOM as D

page :: Array Nut
page =
  [ D.h1__ "About "
  , D.p__ "Example of using Vike."
  ]
