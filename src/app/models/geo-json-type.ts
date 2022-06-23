// // https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file
// Leaflet GeoJSON namespace.<>.type is just as string, not a GeoJsonTypes
// namespace GeoJSON  {
//   export interface LineString {
//     type: GeoJsonTypes,
//     coordinates: number[][]
//   }
//   export interface LineString {
//     type: GeoJsonTypes,
//     coordinates: number[][]
//   }
// }
// const POINT: string = 'Point' as GeoJsonTypes
// const LINE: string = 'LineString' as GeoJsonTypes

export enum GeoJSONType {
  POINT = 'Point',
  LINE = 'LineString'
}
