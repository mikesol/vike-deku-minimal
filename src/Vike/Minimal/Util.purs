module Vike.Minimal.Util where

import Prelude

import Data.Either (either)
import Deku.Toplevel (SSROutput)
import Effect (Effect)
import Effect.Exception (throw)
import Foreign (Foreign)
import Yoga.JSON (read, writeImpl)

toJSON :: SSROutput -> Foreign
toJSON = writeImpl

fromJSON :: Foreign -> Effect SSROutput
fromJSON = read >>> either (throw <<< show) pure
