import { handleSort } from "./sortUtils";

it("should sort array of objects by title in ascending order", () => {
  let arr = [{ title: "b" }, { title: "c" }, { title: "a" }];
  const result = handleSort(arr, 1);
  expect(result).toEqual([{ title: "a" }, { title: "b" }, { title: "c" }]);
});

it("should sort array of objects by title in descending order", () => {
  let arr = [{ title: "b" }, { title: "c" }, { title: "a" }];
  const result = handleSort(arr, -1);
  expect(result).toEqual([{ title: "c" }, { title: "b" }, { title: "a" }]);
});

it("should return empty array when no array passed", () => {
  expect(handleSort([], 1)).toEqual([]);
  expect(handleSort(3, 1)).toEqual([]);
  expect(handleSort("dddd", 1)).toEqual([]);
  expect(handleSort(true, 1)).toEqual([]);
  expect(handleSort({}, 1)).toEqual([]);
  expect(handleSort(null, 1)).toEqual([]);
  expect(handleSort(undefined, 1)).toEqual([]);
});

it("should return same array if any object has no 'title' property", () => {
  let arr = [{ title: "b" }, { title: "c" }, { name: "a" }];
  const result = handleSort(arr, 1);
  expect(result).toEqual(arr);
});
