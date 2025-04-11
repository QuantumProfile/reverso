--import Html exposing (..)
import Element exposing (..)
import Regex
getSize: String -> Maybe (Int, Int)
getSize string =
    case Regex.fromString "\\s*(x|X|×|\\\times)\\s*" of
        Nothing -> Nothing
        Just regx ->
            let sizes = List.map String.toInt << Regex.split regx <| String.trim string
            in case sizes of 
                [] -> Nothing
                Nothing :: _ -> Nothing
                _ :: (Nothing :: _) -> Nothing
                [Just x] -> Just (x,x)
                Just x :: (Just y :: _) -> Just (x,y)

construct: String -> List (Attribute msg) -> List (Element msg) -> Element msg
construct size attributes children =
    let msize = getSize size
    in case msize of
        Nothing -> wrappedRow attributes children
        Just (rows, columns) ->
            List.concatMap (\n -> List.take (n*columns) children) (List.range 0 (rows-1))