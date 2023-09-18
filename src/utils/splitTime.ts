const splitTime = (
  startTime: Date,
  endTime: Date,
  duration: number,
): Array<{
  start: Date;
  end: Date;
}> => {
  const timeSlots = [];
  let start = startTime;
  let end = new Date(start.getTime() + duration);
  while (end <= endTime) {
    timeSlots.push({ start, end });
    start = end;
    end = new Date(start.getTime() + duration);
  }
  return timeSlots;
};

export default splitTime;
