module Counter exposing (Model, init, Msg, update, view)

import Html exposing (..)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)

type alias Model = Int

init: Model
init = 0

type Msg = Increment | Decrement

update: Msg -> Model -> Model
update action model =
    case action of
        Increment -> model+1
        Decrement -> model-1

view: Model -> Html Msg
view model =
    div []
        [ button [onClick Decrement] [text "-"]
        , div [ countStyle ] [text (toString model)]
        , button [onClick Increment] [text "+"]
        ]
