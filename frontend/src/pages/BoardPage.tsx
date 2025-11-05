import React, { Children, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent, closestCorners, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { fetchColumnsFromBoard } from "../features/columnSlice.ts";
import { fetchCardsFromColumn, clearCards, updateCard } from "../features/cardSlice.ts";
import { RootState, AppDispatch } from "../app/store.ts";

import type { Column } from "../features/columnSlice.ts";
import { useParams } from "react-router-dom";
import { setCurrentBoard } from "../features/boardSlice.ts";

import ActionsCard from "../components/ActionsCard.tsx";
import ActionsColumn from "../components/ActionsColumn.tsx";

const BoardPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {boards} = useSelector((state: RootState) => state.boards);
    const {columns} = useSelector((state: RootState) => state.columns);
    const {cards} = useSelector((state: RootState) => state.cards);
    const {id} = useParams();
    const [activeId, setActiveId] = useState<string | null>(null);

    const currentBoard = boards.find((b) => b._id === id);

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 5}})
    );

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        setActiveId(null);
        if (!over) return;

        const cardId = active.id.toString();
        const activeCard = cards.find((c) => c._id === cardId);
        if (!activeCard) return;

        const overElementId = over.id.toString();

        const isOverColumn = columns.some(col => col._id === overElementId);
        if (isOverColumn) {
            if (activeCard.columnId !== overElementId) {
                dispatch(updateCard({ id: activeCard._id, data: {columnId: overElementId}}));
            }
            return;
        }

        const overCard = cards.find((c) => c._id === overElementId);
        if(overCard && activeCard.columnId !== overCard.columnId) {
            dispatch(updateCard({ id: activeCard._id, data: {columnId: overCard.columnId}}));
        }
    };

    const droppableColumns = (columnId: string) => {
        const {setNodeRef, isOver} = useDroppable({id: columnId});
        return {setNodeRef, isOver};
    };

    const ColumnWrapper: React.FC<{column: Column; children: React.ReactNode}> = ({column, children}) => {
        const {setNodeRef, isOver} = droppableColumns(column._id);
        return(
            <div ref={setNodeRef} className={`min-w-[250px] rounded-xl shadow-md flex flex-col gap-3 transition ${isOver ? "ring-2 ring-emerald-500" : ""}`}>{children}</div>
        );
    };

    useEffect(() => {
        if (id)
        {
            dispatch(setCurrentBoard(id));
            dispatch(fetchColumnsFromBoard(id));
            dispatch(clearCards());
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (columns.length > 0) {
            const columnsWithCards = new Set(cards.map(card => card.columnId));
            const columnsWithoutCards = columns.filter((col) => !columnsWithCards.has(col._id))
            if (columnsWithoutCards.length > 0) {
                columnsWithoutCards.forEach((col) => {
                    dispatch(fetchCardsFromColumn(col._id));
                })
            }
        }
    }, [columns, dispatch]);

    if (!currentBoard) return <p>Board not found!</p>

    return (
        <div className="flex flex-col h-full">
            <h3 className="text-2xl font-semibold mb-6">{currentBoard.name}</h3>
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex items-start gap-6 overflow-x-auto pb-4">
                {columns.map((col: Column) => {
                    const columnCards = cards.filter((c) => c.columnId === col._id);
                    return (
                        <div key={col._id} className="min-w-[250px]">
                        <h4 className="text-lg font-semibold mb-2 flex justify-center">{col.title}</h4>
                        <ColumnWrapper column={col}>
                            <ActionsColumn key={col._id} boardId={currentBoard._id} column={col} />
                            <SortableContext items={columnCards.map(c => c._id)} strategy={verticalListSortingStrategy} id={col._id}>
                                <div data-droppable-id={col._id} className="flex flex-col gap-3">
                                    {columnCards.length > 0 ? (
                                        columnCards.map((card) => (
                                            <ActionsCard key={card._id} columnId={col._id} card={card} />
                                        ))
                                    ) : (
                                        <div className="text-sm text-gray-500">Drop here</div>
                                    )}
                                </div>
                                <ActionsCard columnId={col._id} key={`new-${col._id}`}/>
                            </SortableContext>
                        </ColumnWrapper>
                        </div>
                    )
                })}
                <div className="self-start">
                    <ActionsColumn boardId={currentBoard._id} />
                </div>
                </div>
            </DndContext>
        </div>
    )
}

export default BoardPage;