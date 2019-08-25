import { ILocFormat, ISegment } from "localization-format";
import { FindWhat, FindWordsFromSegment } from "../Find/FindWords";
import LocFormatCheckResult from "../LocFormatCheckResult";
import SegmentCheckResult from "../SegmentCheckResult";

// tslint:disable-next-line:max-line-length
export async function QADiffFromSegment(seg: ISegment, findWhat: FindWhat): Promise<SegmentCheckResult | null> {
    const result = await FindWordsFromSegment(seg, findWhat);
    result.Name = `QADiff${findWhat.toString()}`;
    const isDiff = (result.Source.length === result.Translation.length) 
                    && result.Source!.every((v, i) => v.Value === result.Translation[i].Value);
    return isDiff ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function QADiffFromSegments(segs: ISegment[], findWhat: FindWhat): Promise<SegmentCheckResult[] | null> {
    const results: SegmentCheckResult[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(segs.map(async (seg) => await QADiffFromSegment(seg, findWhat).then((res) => res && results.push(res))));
    return (results.length === 0) ? null : results;
}

// tslint:disable-next-line:max-line-length
export async function QADiffFromLocFormat(lf: ILocFormat<ISegment>, findWhat: FindWhat): Promise<LocFormatCheckResult | null> {
    const segmentCheckResults = await QADiffFromSegments(lf.Segments!, findWhat);
    return segmentCheckResults ? new LocFormatCheckResult(segmentCheckResults![0].Name, lf, segmentCheckResults) : null;
}

// tslint:disable-next-line:max-line-length
export async function QADiffFromLocFormats(lfs: Array<ILocFormat<ISegment>>, findWhat: FindWhat): Promise<LocFormatCheckResult[] | null> {
    const results: LocFormatCheckResult[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(lfs.map(async (lf) => await QADiffFromLocFormat(lf, findWhat).then((res) => res && results.push(res))));
    return results.length === 0 ? null : results;
}
