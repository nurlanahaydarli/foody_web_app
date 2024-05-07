export function formDataToJson(formData) {
  const jsonData = {};

  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      jsonData[key] = {
        name: value.name,
        type: value.type,
        size: value.size,
        lastModified: value.lastModified,
      };
    } else {
      jsonData[key] = value;
    }
  }

  return jsonData;
}
