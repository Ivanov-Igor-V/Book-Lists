import { useFetch } from "#app";
import { ElMessage } from "element-plus";

export const useGutendex = async function (_query) {
  if (!_query) return ElMessage("Please enter query");
  const { data, error } = await useFetch("https://gutendex.com/books", {
    query: { search: _query },
  });

  if (error.value) {
    if (!error.value.data?.errors.length) return;
    ElMessage(error.value.data?.errors[0]);
    return;
  }

  return { data, error };
};
