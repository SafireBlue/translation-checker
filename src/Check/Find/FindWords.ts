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
    AllCapsWords = "AllCapsWords",
    AlphanumericWords = "AlphanumericWords",
    CamelCaseWords = "CamelCaseWords",
    Markups = "Markups",
    Numbers = "Numbers",
    RepeatedWords = "RepeatedWords",
    Spaces = "Spaces",
    Urls = "Urls",
}

// tslint:disable-next-line:max-line-length
export async function FindWordsFromSegment(seg: ISegment, findWhat: FindWhat, options?: any): Promise<SegmentCheckResult> {
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
    // Source
    const valSource = (isObject(seg.Source) ? (seg.Source as IText).Value : seg.Source as string);
    const fnSource = options ? findWordsMethod!(valSource, options) : findWordsMethod!(valSource);
    const resSource = fnSource.then((res) => result.Source = res);
    // Translation
    const valTranslation = (isObject(seg.Translation) ? (seg.Translation as IText).Value : seg.Translation as string);
    const fnTranslation = options ? findWordsMethod!(valTranslation, options) : findWordsMethod!(valTranslation);
    const resTranslation = fnTranslation.then((res) => result.Translation = res);

    await Promise.all([resSource, resTranslation]);
    return result;
}

// tslint:disable-next-line:max-line-length
export async function FindWordsFromSegments(segs: ISegment[], findWhat: FindWhat, options?: any): Promise<SegmentCheckResult[]> {
    const result: SegmentCheckResult[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(segs.map(async (seg) => await FindWordsFromSegment(seg, findWhat, options).then((res) => result.push(res))));
    return result;
}

// tslint:disable-next-line:max-line-length
export async function FindWordsFromLocFormat(lf: ILocFormat<ISegment>, findWhat: FindWhat, options?: any): Promise<LocFormatCheckResult> {
    const segmentCheckResults = await FindWordsFromSegments(lf.Segments!, findWhat, options);
    return new LocFormatCheckResult(segmentCheckResults[0].Name, lf, {segmentCheckResults});
}

// tslint:disable-next-line:max-line-length
export async function FindWordsFromLocFormats(lfs: Array<ILocFormat<ISegment>>, findWhat: FindWhat, options?: any): Promise<LocFormatCheckResult[]> {
    const result: LocFormatCheckResult[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(lfs.map(async (lf) => await FindWordsFromLocFormat(lf, findWhat, options).then((res) => result.push(res))));
    return result;
}
