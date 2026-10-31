type Labels = {
    prevYear?: string;
    prevMonth?: string;
    nextMonth?: string;
    nextYear?: string;
};
type Props = {
    value?: string;
    minYear?: number;
    maxYear?: number;
    locale?: string;
    weekStart?: 0 | 1;
    label?: string;
    labels?: Labels;
    onpick?: (value: string) => void;
};
declare const Calendar: import("svelte").Component<Props, {}, "value">;
type Calendar = ReturnType<typeof Calendar>;
export default Calendar;
