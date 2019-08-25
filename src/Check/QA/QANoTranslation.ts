import {ILocFormat, ISegment, IText} from "localization-format";
import { isObject } from "util";
import LocFormatCheckResult from "../LocFormatCheckResult";
import SegmentCheckResult from "../SegmentCheckResult";

export async function QANoTranslationFromSegment(seg: ISegment): Promise<SegmentCheckResult | null> {
    const translation = (isObject(seg.Translation) ? (seg.Translation as IText).Value : seg.Translation);
    return translation === "" ? new SegmentCheckResult("QANoTranslation", seg) : null;
}

export async function QANoTranslationFromSegments(segs: ISegment[]): Promise<SegmentCheckResult[] | null> {
    const result: SegmentCheckResult[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(segs.map(async (seg) => await QANoTranslationFromSegment(seg).then((res) => res && result.push(res))));
    return result.length === 0 ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function QANoTranslationFromLocFormat(lf: ILocFormat<ISegment>): Promise<LocFormatCheckResult | null> {
    const segmentCheckResults = (await QANoTranslationFromSegments(lf.Segments!))!;
    const result = new LocFormatCheckResult(segmentCheckResults[0].Name, lf, {segmentCheckResults});
    return result!.SegmentCheckResults!.length === 0 ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function QANoTranslationFromLocFormats(lfs: Array<ILocFormat<ISegment>>): Promise<LocFormatCheckResult[] | null> {
    const result: LocFormatCheckResult[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(lfs.map((async (lf) => await QANoTranslationFromLocFormat(lf).then((res) => res && result.push(res)))));
    return result.length === 0 ? null : result;
}
