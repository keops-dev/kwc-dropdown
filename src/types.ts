export type Alignment = "start" | "end"
export type Side = "top" | "right" | "bottom" | "left"
export type AlignedPlacement = `${Side}-${Alignment}`
export type Placement = Side | AlignedPlacement
export type Axis = "x" | "y"
export type Length = "width" | "height"
export interface Coords {
  x: number
  y: number
}
