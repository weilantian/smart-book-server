import Slot from 'src/models/slot.model';
import splitTime from './splitTime';

export const isIntersecting = (slot1: Slot, slot2: Slot) => {
  return (
    (slot1.start <= slot2.start && slot1.end > slot2.start) ||
    (slot1.start >= slot2.start && slot1.start < slot2.end)
  );
};

const computeBookableSlots = (
  availableSlots: Array<Slot>,
  bookedSlots: Array<Slot>,
  duration: number,
) => {
  // Make sure to only include the slots that are not intersecting with the booked slots
  const availableSlotsWithoutBookedSlots = splitTimeSlots(
    availableSlots,
    duration,
  ).filter(
    (availableSlot) =>
      !bookedSlots.some((bookedSlot) =>
        isIntersecting(availableSlot, bookedSlot),
      ),
  );
  return availableSlotsWithoutBookedSlots;
};

export default computeBookableSlots;

const splitTimeSlots = (
  slots: Array<{ start: Date; end: Date }>,
  duration: number,
): Array<{
  start: Date;
  end: Date;
}> => {
  return slots.reduce(
    (acc, curr) => acc.concat(splitTime(curr.start, curr.end, duration)),
    [],
  );
};
