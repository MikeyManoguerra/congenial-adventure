import { GeoJSONType } from "src/app/models/geo-json-type";
  // Dont care about the order of the line points at this time,
  // and multipoint is not an available option by the underlying api,
  // so creating our own points no matter the original type

  export function normalizedGeoJSON(geoJSON: string): GeoJSON.Point[] {
    const { type, coordinates } = JSON.parse(geoJSON);

    if (![GeoJSONType.POINT, GeoJSONType.LINE].includes(type)) {
      throw new Error("Unsupported GeoJSON type");
    }

    if (type === GeoJSONType.POINT) {
      return [{
        type,
        coordinates,
      }];

    }

    return coordinates.map((point: number[]) => {
      return {
        type,
        coordinates: point
      }
    });
  }
