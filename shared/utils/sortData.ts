export function sortDataByCreated(data: any[]) {
    return data?.sort((a: any, b: any) => new Date(b.created).getTime() - new Date(a.created).getTime());
}
