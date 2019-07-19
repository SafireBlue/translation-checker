import {ILocFormat, ISegment} from "localization-format";
import {
    FindSpacesFromSegment,
    ResultFromLocFormat,
    ResultFromSegment,
} from "../Util/FindSpaces";

export async function FindDiffSpacesFromSegment(seg: ISegment): Promise<ResultFromSegment | null> {
    const res = await FindSpacesFromSegment(seg);
    // tslint:disable-next-line:max-line-length
    return res.Source.length === res.Translation.length && res.Source!.every((v, i) => v.Value === res.Translation[i].Value) ? null : res;
}

export async function FindDiffSpacesFromSegments(segs: ISegment[]): Promise<ResultFromSegment[] | null> {
    const result: ResultFromSegment[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(segs.map(async (seg) => await FindDiffSpacesFromSegment(seg).then((res) => res && result.push(res))));
    return result.length === 0 ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function FindDiffSpacesFromLocFormat(lf: ILocFormat<ISegment>): Promise<ResultFromLocFormat | null> {
    const result = new ResultFromLocFormat(lf);
    result.ResultsFromSegments = (await FindDiffSpacesFromSegments(lf.Segments!))!;
    return result.ResultsFromSegments.length === 0 ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function FindDiffSpacesFromLocFormats(lfs: Array<ILocFormat<ISegment>>): Promise<ResultFromLocFormat[] | null> {
    const result: ResultFromLocFormat[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(lfs.map(async (lf) => await FindDiffSpacesFromLocFormat(lf).then((res) => res && result.push(res))));
    return result.length === 0 ? null : result;
}
