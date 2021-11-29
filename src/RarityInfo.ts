export default interface RarityInfo {
    totalCount: number,
    scores: { [id: number]: number },
    traitCounts: {
        [traitCount: number]: {
            count: number,
            percent: number,
            ids: number[],
        },
    },
    traits: {
        [trait: string]: {
            [value: string]: {
                count: number,
                percent: number,
                score: number,
                ids: number[],
            },
        },
    },
}