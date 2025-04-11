import Element exposing (el, row, Color, none, fillPortion, text, alignBottom, centerX, centerY, padding, width, height, px, maximum, pointer, fill, column)
import Element.Font as Font
import Element.Background as Background
import Element.Border as Border
import Main exposing (Msg)
type alias ColorSet =
    { background1: Color
    , background2: Color
    , border1: Color
    , border2: Color
    , text: Color
    }
header: ColorSet -> Element Msg
header color = row [fill]
    [ el [fillPortion 1] none
    , el [fillPortion 3] << el
        [ Font.color color.border1
        , Font.size 25
        , paddingXY 0 5
        , alignBottom
        , centerX
        ] <| text "Invierte tu texto"
    , el [fillPortion 1] << el
        [ centerX
        , centerY
        , padding 10
        , pointer
        , width << maximum 30 <| px 0
        , height << maximum 30 <| px 0
        , Background.color color.background2
        , Border.color color.border2
        , Border.solid
        , Border.rounded 5
        , Border.width 2
        ] << column [fill] << List.drop 1 << List.map (\a -> el a none) << List.concatMap (List.repeat 3) <| 
            [[fill],[fill, Background.color <| rgb 0 0 0]]
    ]
type Mode
    = Input
    | Output
square: ColorSet -> Mode -> Element Msg
square color mode =