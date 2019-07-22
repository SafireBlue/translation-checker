import { ILocFormat, ISegment } from "localization-format";
import {
    FindMultipleXFromLocFormat,
    FindMultipleXFromLocFormats,
    FindMultipleXFromSegments,
    FindWhichX,
    ResultFromFindMultipleXFromLocFormat,
    ResultFromFindMultipleXFromSegments,
} from "./FindMultipleX";

export class ResultFromFindMultipleSourcesFromSegments extends ResultFromFindMultipleXFromSegments {
    public constructor(source: string, segments: ISegment[]) {
        super(source, segments);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ResultFromFindMultipleSourcesFromLocFormat extends ResultFromFindMultipleXFromLocFormat {
    public constructor(lf: ILocFormat<ISegment>) {
        super(lf);
    }
}

// tslint:disable-next-line:max-line-length
export async function FindMultipleSourcesFromSegments(segs: ISegment[], which: FindWhichX): Promise<ResultFromFindMultipleSourcesFromSegments[] | null> {
    return FindMultipleXFromSegments(segs, FindWhichX.MultipleSources);
}

// tslint:disable-next-line:max-line-length
export async function FindMultipleSourcesFromLocFormat(lf: ILocFormat<ISegment>, which: FindWhichX): Promise<ResultFromFindMultipleSourcesFromLocFormat | null> {
    return FindMultipleXFromLocFormat(lf, FindWhichX.MultipleSources);
}

// tslint:disable-next-line:max-line-length
export async function FindMultipleSourcesFromLocFormats(lfs: Array<ILocFormat<ISegment>>, which: FindWhichX): Promise<ResultFromFindMultipleSourcesFromLocFormat[] | null> {
    return FindMultipleXFromLocFormats(lfs, FindWhichX.MultipleSources);
}
