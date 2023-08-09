interface Slot {
  start: Date;
  end: Date;
}

export const computeBookableSlots = (
  availableSlots: Array<Slot>,
  bookedSlots: Array<Slot>,
  duration: number,
) => {
  // Make sure to only include the slots that are not intersecting with the booked slots
  const availableSlotsWithoutBookedSlots = availableSlots.filter(
    (availableSlot) =>
      !bookedSlots.some((bookedSlot) =>
        isIntersecting(availableSlot, bookedSlot),
      ),
  );
  return availableSlotsWithoutBookedSlots.reduce(
    (acc, curr) => acc.concat(splitTime(curr.start, curr.end, duration)),
    [],
  );
};

const isIntersecting = (slot1: Slot, slot2: Slot) => {
  return (
    (slot1.start <= slot2.start && slot1.end >= slot2.start) ||
    (slot1.start >= slot2.start && slot1.start <= slot2.end)
  );
};

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
