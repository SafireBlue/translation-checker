import {ILocFormat, ISegment} from "localization-format";
import {
    FindWhat,
    FindWordsFromSegment,
    ResultFromLocFormat,
    ResultFromSegment,
} from "../Util/FindText";

export async function FindDiffFromSegment(seg: ISegment, findWhat: FindWhat): Promise<ResultFromSegment | null> {
    const res = await FindWordsFromSegment(seg, findWhat);
    // tslint:disable-next-line:max-line-length
    return res.Source.length === res.Translation.length && res.Source!.every((v, i) => v.Value === res.Translation[i].Value) ? null : res;
}

export async function FindDiffFromSegments(segs: ISegment[], findWhat: FindWhat): Promise<ResultFromSegment[] | null> {
    const result: ResultFromSegment[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(segs.map(async (seg) => await FindDiffFromSegment(seg, findWhat).then((res) => res && result.push(res))));
    return result.length === 0 ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function FindDiffFromLocFormat(lf: ILocFormat<ISegment>, findWhat: FindWhat): Promise<ResultFromLocFormat | null> {
    const result = new ResultFromLocFormat(lf);
    result.ResultsFromSegments = (await FindDiffFromSegments(lf.Segments!, findWhat))!;
    return result.ResultsFromSegments.length === 0 ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function FindDiffFromLocFormats(lfs: Array<ILocFormat<ISegment>>, findWhat: FindWhat): Promise<ResultFromLocFormat[] | null> {
    const result: ResultFromLocFormat[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(lfs.map(async (lf) => await FindDiffFromLocFormat(lf, findWhat).then((res) => res && result.push(res))));
    return result.length === 0 ? null : result;
}
