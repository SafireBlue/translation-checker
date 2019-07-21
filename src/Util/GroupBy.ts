// Reference: https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects

export default async function<T extends object>(array: T[], key: string): Promise<{[index: string]: T[]}> {
    return array.reduce((rv, x) => {
        (rv[(x as any)[key]] = rv[(x as any)[key]] || []).push(x);
        return rv;
    }, {} as any);
}
