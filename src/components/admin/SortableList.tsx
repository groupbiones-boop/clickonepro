import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { ReactNode } from "react";

interface SortableListProps<T> {
  items: T[];
  onReorder: (oldIndex: number, newIndex: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
  getItemId: (item: T, index: number) => string;
}

export function SortableList<T>({
  items,
  onReorder,
  renderItem,
  getItemId,
}: SortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item, i) => getItemId(item, i) === active.id);
      const newIndex = items.findIndex((item, i) => getItemId(item, i) === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(oldIndex, newIndex);
      }
    }
  };

  const itemIds = items.map((item, index) => getItemId(item, index));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-2 pl-6">
          {items.map((item, index) => (
            <SortableItem key={getItemId(item, index)} id={getItemId(item, index)}>
              {renderItem(item, index)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
