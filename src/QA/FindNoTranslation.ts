import {ILocFormat, ISegment} from "localization-format";

// tslint:disable-next-line:max-classes-per-file
export class ResultFromLocFormat {
    public LocFormat!: ILocFormat<ISegment>;
    public FoundSegments!: ISegment[];
    public constructor(lf: ILocFormat<ISegment>) {
        this.LocFormat = lf;
    }
}

export async function FindNoTranslationFromSegment(seg: ISegment): Promise<ISegment | null> {
    return seg.Translation.Value === "" ? seg : null;
}

export async function FindNoTranslationFromSegments(segs: ISegment[]): Promise<ISegment[] | null> {
    const result: ISegment[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(segs.map(async (seg) => await FindNoTranslationFromSegment(seg).then((res) => res && result.push(res))));
    return result.length === 0 ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function FindNoTranslationFromLocFormat(lf: ILocFormat<ISegment>): Promise<ResultFromLocFormat | null> {
    const result = new ResultFromLocFormat(lf);
    result.FoundSegments = (await FindNoTranslationFromSegments(lf.Segments!))!;
    return result.FoundSegments.length === 0 ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function FindNoTranslationFromLocFormats(lfs: Array<ILocFormat<ISegment>>): Promise<ResultFromLocFormat[] | null> {
    const result: ResultFromLocFormat[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(lfs.map((async (lf) => await FindNoTranslationFromLocFormat(lf).then((res) => res && result.push(res)))));
    return result.length === 0 ? null : result;
}
