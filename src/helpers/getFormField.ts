export const getFormField = (formData: FormData, key: string) => ((formData.get(key) as string) ?? '').trim();
