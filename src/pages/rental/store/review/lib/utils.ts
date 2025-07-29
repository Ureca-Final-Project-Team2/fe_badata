export const formatDateToDash = (dateString: string): string => {
  return new Date(dateString).toISOString().slice(0, 10);
};
