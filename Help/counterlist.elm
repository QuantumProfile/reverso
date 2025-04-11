-- https://www.youtube.com/watch?v=oYk8CKH7OhE
import Counter
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Browser

main =
    Browser.sandbox
        { model = init
        , update = update
        , view = view
        }

type alias Model =
    { counters List (ID, Counter.Model)
    , nextID : ID
    }

type alias ID = Int

init : Model
init =
    { counters = []
    , nextID = 0
    }

type Msg
    = Insert
    | Remove
    | Modify ID Counter.Msg

update: Msg -> Model -> Model
update msg model =
    case msg of
        Insert ->
            let newCounter = ( model.nextID, 0)
                newCounters = model.counters ++ [newCounter]
            in
                { model |
                    counters <- newCounters,
                    nextID <- model.nextID + 1
                }
        Remove ->
            { model | counters <- List.drop 1 model.counters}
        Modify id counterMsg ->
            let updateCounter (counterID, counterModel) =
                    if counterID == id
                        then (counterID, Counter.update counterMsg counterModel)
                        else (counterID, counterModel)
            in
                { model | counters <- List.map updateCounter model.counters}

view: Model -> Html Msg
view model =
    let counters = List.map viewCounter model.counters
        remove = button [onClick Remove] [text "Remove"]
        Insert = button [onClick Insert] [text "Add"]
    in
        div [] ([remove, insert]++ counters)

viewCounter: (ID, Counter.Model) -> Html Msg
viewCounter (id, model) =
    Counter.view model