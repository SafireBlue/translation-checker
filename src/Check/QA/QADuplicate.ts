import { ILocFormat, ISegment, IText } from "localization-format";
import { isObject } from "util";
import LocFormatCheckResult from "../LocFormatCheckResult";
import GroupBy from "../Util/GroupBy";
import QADupllicateCheckResult from "./QADuplicateCheckResult";

export enum TargetValue {
    Source,
    Translation,
}

// tslint:disable-next-line:max-line-length
export async function QADuplicateFromSegments(segs: ISegment[], targetValue: TargetValue): Promise<QADupllicateCheckResult[] | null> {
    const segments = segs.map((s) => {
        const rtn: ISegment = {
            FormatIndex: s.FormatIndex,
            Props: s.Props,
            Source: isObject(s.Source) ? (s.Source as IText).Value : s.Source,
            Translation: isObject(s.Translation) ? (s.Translation as IText).Value : s.Translation,
        };
        return rtn;
    });
    const groups = await GroupBy<ISegment>(segments, targetValue === TargetValue.Source ? "Translation" : "Source");
    const groupKeys = Object.keys(groups);
    const filteredGroupKeys = groupKeys.filter((key) => {
        const group = groups[key];
        const targetValues = group.map((s) => targetValue === TargetValue.Source ? s.Source : s.Translation);
        return [...new Set(targetValues)].length > 1;
    });
    const result: QADupllicateCheckResult[] = [];
    await Promise.all(filteredGroupKeys.map(async (key) => {
        result.push(new QADupllicateCheckResult(key, targetValue, groups[key]));
    }));
    return result.length === 0 ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function QADuplicateFromLocFormat(lf: ILocFormat<ISegment>, targetValue: TargetValue): Promise<LocFormatCheckResult | null> {
    const qaDuplicateCheckResults = (await QADuplicateFromSegments(lf.Segments!, targetValue))!;
    // tslint:disable-next-line:max-line-length
    return qaDuplicateCheckResults ? new LocFormatCheckResult(qaDuplicateCheckResults[0].Name, lf, {qaDuplicateCheckResults}) : null;
}

// tslint:disable-next-line:max-line-length
export async function QADuplicateFromLocFormats(lfs: Array<ILocFormat<ISegment>>, targetValue: TargetValue): Promise<LocFormatCheckResult[] | null> {
    const result: LocFormatCheckResult[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(lfs.map((async (lf) => await QADuplicateFromLocFormat(lf, targetValue).then((res) => res && result.push(res)))));
    return result.length === 0 ? null : result;
}
