
export class Sprint {
    id: number;
    projectId: number;
    title: string;
    startDate: Date;
    endDate: Date;
    actualStartDate: Date | null;
    actualEndDate: Date | null;
    active: boolean;
}
