export const removeDuplicateObjectsFromArray = (array: Array<any>, keyToCompare: string): Array<any> => {
  return Array.from(new Map(array.map(i => [(keyToCompare in i) ? i[keyToCompare] : i, i])).values());
}