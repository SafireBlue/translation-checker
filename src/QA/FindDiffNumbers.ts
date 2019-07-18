import {ILocFormat, ISegment} from "localization-format";
import {
    FindNumbersFromSegment,
    ResultFromLocFormat,
    ResultFromSegment,
} from "../Util/FindNumbers";

export async function FindDiffNumbersFromSegment(seg: ISegment): Promise<ResultFromSegment | null> {
    const res = await FindNumbersFromSegment(seg);
    // tslint:disable-next-line:max-line-length
    return res.Source.length === res.Translation.length && res.Source!.every((v, i) => v.Value === res.Translation[i].Value) ? null : res;
}

export async function FindDiffNumbersFromSegments(segs: ISegment[]): Promise<ResultFromSegment[] | null> {
    const result: ResultFromSegment[] = [];
    await Promise.all(segs.map((seg) => FindDiffNumbersFromSegment(seg).then((res) => res && result.push(res))));
    return result.length === 0 ? result : null;
}

// tslint:disable-next-line:max-line-length
export async function FindDiffNumbersFromLocFormat(lf: ILocFormat<ISegment>): Promise<ResultFromLocFormat | null> {
    const result = new ResultFromLocFormat(lf);
    result.ResultsFromSegments = (await FindDiffNumbersFromSegments(lf.Segments!))!;
    return result.ResultsFromSegments.length === 0 ? result : null;
}

// tslint:disable-next-line:max-line-length
export async function FindDiffNumbersFromLocFormats(lfs: Array<ILocFormat<ISegment>>): Promise<ResultFromLocFormat[] | null> {
    const result: ResultFromLocFormat[] = [];
    await Promise.all(lfs.map((lf) => FindDiffNumbersFromLocFormat(lf).then((res) => res && result.push(res))));
    return result.length === 0 ? result : null;
}
