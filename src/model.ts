export interface TrackDetail {
    id: string,
    category: string,
    description: string,
    timeIn: string,
    timeOut: string,
    totalTime: string,
}

export const toEntry = (doc: { id: any; data: () => any }) => {
    return {id: doc.id, ...doc.data() }
}