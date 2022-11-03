import { GeoJSONType } from "src/app/models/geo-json-type";


/*

This is a place for functions do shorter, discrete computations.
think helper functions, or toollbox

this is different from an injectable angualr service, which may encapulate a group of things that work in concert
or hold state

the difference between what  belongs in a service and what is a helper/ lib function in my opinion is subjective.

function fullName(obj){
  return obj.firstName, + ' ' + obj.lastName;
}

definitely belongs here
controlling a forms state does not.

as this library of helper functions grows, we can differentiate by type in to files. index.ts is a default file name
ex: date-helpers.ts  would be an obvious differentiation to its own file

- Mikey
*/




// Dont care about the order of the line points at this time,
// and multipoint is not an available option by the underlying api,
// so creating our own points no matter the original type
export function normalizedGeoJSON(geoJSON: string): GeoJSON.Point[] {
  // does this even belong here lol
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
