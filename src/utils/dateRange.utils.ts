export const calculateDateRange = (period: string): [string, string] | null => {
  if (period?.includes("-")) {
    const [startTime, endTime] = period.split("-");
    return [startTime, endTime];
  }

  const today = new Date();
  switch (period) {
    case "all":
      return null;
    case "day":
      return [
        `${today.getFullYear()}-${today.getMonth()}-${today.getDate}`,
        `${today.getFullYear()}-${today.getMonth()}-${today.getDate}`,
      ];
    case "week":
      const firstDayOfWeek = today.getDate() - today.getDay();
      return [
        `${today.getFullYear()}-${today.getMonth()}-${firstDayOfWeek}`,
        `${today.getFullYear()}-${today.getMonth()}-${today.getDate}`,
      ];
    case "month":
      return [
        `${today.getFullYear()}-${today.getMonth()}-${today.getDate}`,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate}`,
      ];
    default:
      return [
        `${today.getFullYear()}-${today.getMonth()}-${today.getDate}`,
        `${today.getFullYear()}-${today.getMonth()}-${today.getDate}`,
      ];
  }
};
