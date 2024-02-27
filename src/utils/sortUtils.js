export const handleSort = (arr, isAscending = 1) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  if (arr.some((obj) => !obj.title)) return arr;

  if (isAscending !== 1 && isAscending !== -1) {
    console.log("handleSortData accepts only numbers 1 or -1");
    isAscending = 1;
  }
  const sortedData = arr
    .sort((a, b) => {
      if (a.title > b.title) return isAscending;
      if (a.title < b.title) return -1 * isAscending;
      return 0;
    })
    .slice();
  return sortedData;
};
