module Vike.Minimal.Renderer.Layout where

import Prelude

import CSS (alignItems, borderLeft, column, display, em, flex, flexDirection, flexShrink, fromInt, lineHeight, margin, maxWidth, minHeight, padding, paddingBottom, paddingTop, px, solid, vh)
import CSS.Common (auto, center)
import Deku.CSS (render)
import Deku.Core (Nut)
import Deku.DOM as D
import Deku.DOM.Attributes as DA

layout :: Array Nut -> Nut
layout children = frame
  [ sidebar
      [ D.a [ DA.klass_ "navitem", DA.href_ "/" ] [ D.text_ "Home" ]
      , D.a [ DA.klass_ "navitem", DA.href_ "/about" ] [ D.text_ "About" ]
      ]
  , content children
  ]

frame :: Array Nut -> Nut
frame = D.div
  [ DA.style_ $ render do
      let p = px 20.0
      padding p p p p
      display flex
      maxWidth $ px 900.0
      margin auto auto auto auto
  ]

sidebar :: Array Nut -> Nut
sidebar = D.div
  [ DA.style_ $ render do
      let p = px 20.0
      padding p p p p
      paddingTop (px 42.0)
      flexShrink 0.0
      display flex
      flexDirection column
      alignItems center
      lineHeight $ em 1.8
  ]

content :: Array Nut -> Nut
content = D.div
  [ DA.style_ $ render do
      let p = px 20.0
      padding p p p p
      paddingBottom (px 50.0)
      borderLeft solid (px 2.0) $ fromInt 0xeeeeee
      minHeight $ vh 100.0
  ]