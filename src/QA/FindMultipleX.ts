import {ILocFormat, ISegment, IText} from "localization-format";
import { isObject } from "util";
import GroupBy from "../Util/GroupBy";

export enum FindWhichX {
    Source,
    Translation,
}

export class ResultFromFindMultipleXFromSegments {
    public XValue!: string;
    public Segments!: ISegment[];
    public constructor(xValue: string, segments: ISegment[]) {
        this.XValue = xValue;
        this.Segments = segments;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ResultFromFindMultipleXFromLocFormat {
    public LocFormat!: ILocFormat<ISegment>;
    public ResultFromSegments!: ResultFromFindMultipleXFromSegments[];
    public constructor(lf: ILocFormat<ISegment>) {
        this.LocFormat = lf;
    }
}

// tslint:disable-next-line:max-line-length
export async function FindMultipleXFromSegments(segs: ISegment[], which: FindWhichX): Promise<ResultFromFindMultipleXFromSegments[] | null> {
    segs = segs.map((s) => {
        s.Source = isObject(s.Source) ? (s.Source as IText).Value : s.Source;
        s.Translation = isObject(s.Translation) ? (s.Translation as IText).Value : s.Translation;
        return s;
    });
    const groups = await GroupBy<ISegment>(segs, which.toString());
    const groupKeys = Object.keys(groups);
    const filteredGroupKeys = groupKeys.filter((key) => [...new Set(groups[key])].length > 1);
    const result: ResultFromFindMultipleXFromSegments[] = [];
    await Promise.all(filteredGroupKeys.map(async (key) => {
        result.push(new ResultFromFindMultipleXFromSegments(key, groups[key]));
    }));
    return result.length === 0 ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function FindMultipleXFromLocFormat(lf: ILocFormat<ISegment>, which: FindWhichX): Promise<ResultFromFindMultipleXFromLocFormat | null> {
    const result = new ResultFromFindMultipleXFromLocFormat(lf);
    result.ResultFromSegments = (await FindMultipleXFromSegments(lf.Segments!, which))!;
    return result.ResultFromSegments.length === 0 ? null : result;
}

// tslint:disable-next-line:max-line-length
export async function FindMultipleXFromLocFormats(lfs: Array<ILocFormat<ISegment>>, which: FindWhichX): Promise<ResultFromFindMultipleXFromLocFormat[] | null> {
    const result: ResultFromFindMultipleXFromLocFormat[] = [];
    // tslint:disable-next-line:max-line-length
    await Promise.all(lfs.map((async (lf) => await FindMultipleXFromLocFormat(lf, which).then((res) => res && result.push(res)))));
    return result.length === 0 ? null : result;
}
