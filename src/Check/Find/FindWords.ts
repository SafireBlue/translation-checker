import {ILocFormat, ISegment, IText} from "localization-format";
import {
    FindAllCapsWords,
    FindAlphanumericWords,
    FindCamelCaseWords,
    FindMarkups,
    FindNumbers,
    FindRepeatedWords,
    FindSpaces,
    FindUrls,
} from "text-checker";
import { isObject } from "util";
import LocFormatCheckResult from "../LocFormatCheckResult";
import SegmentCheckResult from "../SegmentCheckResult";

export enum FindWhat {
    AllCapsWords,
    AlphanumericWords,
    CamelCaseWords,
    Markups,
    Numbers,
    RepeatedWords,
    Spaces,
    Urls,
}

export async function FindWordsFromSegment(seg: ISegment, findWhat: FindWhat): Promise<SegmentCheckResult> {
    const findWordsMethod = (() => {
        switch (findWhat) {
            case FindWhat.AllCapsWords:
                return FindAllCapsWords;
            case FindWhat.AlphanumericWords:
                return FindAlphanumericWords;
            case FindWhat.CamelCaseWords:
                return FindCamelCaseWords;
            case FindWhat.Markups:
                return FindMarkups;
            case FindWhat.Numbers:
                return FindNumbers;
            case FindWhat.RepeatedWords:
                return FindRepeatedWords;
            case FindWhat.Spaces:
                return FindSpaces;
            case FindWhat.Urls:
                return FindUrls;
        }
    })();
    const result = new SegmentCheckResult(`Find${findWhat.toString()}`, seg);
    const valSource = (isObject(seg.Source) ? (seg.Source as IText).Value : seg.Source as string);
    const resSource = findWordsMethod!(valSource).then((res) => result.Source = res);
    const valTranslation = (isObject(seg.Translation) ? (seg.Translation as IText).Value : seg.Translation as string);
    const resTranslation = findWordsMethod!(valTranslation).then((res) => result.Translation = res);
    await Promise.all([resSource, resTranslation]);
    return result;
}

export async function FindWordsFromSegments(segs: ISegment[], findWhat: FindWhat): Promise<SegmentCheckResult[]> {
    const result: SegmentCheckResult[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(segs.map(async (seg) => await FindWordsFromSegment(seg, findWhat).then((res) => result.push(res))));
    return result;
}

// tslint:disable-next-line:max-line-length
export async function FindWordsFromLocFormat(lf: ILocFormat<ISegment>, findWhat: FindWhat): Promise<LocFormatCheckResult> {
    const segmentCheckResults = await FindWordsFromSegments(lf.Segments!, findWhat);
    return new LocFormatCheckResult(segmentCheckResults[0].Name, lf, {segmentCheckResults});
}

// tslint:disable-next-line:max-line-length
export async function FindWordsFromLocFormats(lfs: Array<ILocFormat<ISegment>>, findWhat: FindWhat): Promise<LocFormatCheckResult[]> {
    const result: LocFormatCheckResult[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(lfs.map(async (lf) => await FindWordsFromLocFormat(lf, findWhat).then((res) => result.push(res))));
    return result;
}
