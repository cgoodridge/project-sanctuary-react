export default interface Animal {
  kingdomClass?: string,
  commonName?: string | undefined,
  dateAdded?: number,
  description?: string,
  diet?: string,
  family?: string,
  docId?: string | undefined,
  genus?: string,
  imgURLS?: Array<String>,
  kingdom?: string,
  lat?: number,
  lng?: number,
  lifespan?: string,
  lifestyle?: string,
  locations?: Array<Object>,
  nameOfYoung?: string,
  order?: string,
  phylum?: string,
  redListStatus?: string,
  scientificName?: string,
  source?: string,
  imageSource?: string
}