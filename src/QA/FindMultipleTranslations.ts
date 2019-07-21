import { ILocFormat, ISegment } from "localization-format";
import {
    FindMultipleXFromLocFormat,
    FindMultipleXFromLocFormats,
    FindMultipleXFromSegments,
    FindWhichX,
    ResultFromFindMultipleXFromLocFormat,
    ResultFromFindMultipleXFromSegments,
} from "./FindMultipleX";

export class ResultFromFindMultipleTranslationsFromSegments extends ResultFromFindMultipleXFromSegments {
    public constructor(translation: string, segments: ISegment[]) {
        super(translation, segments);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ResultFromFindMultipleTranslationsFromLocFormat extends ResultFromFindMultipleXFromLocFormat {
    public constructor(lf: ILocFormat<ISegment>) {
        super(lf);
    }
}

// tslint:disable-next-line:max-line-length
export async function FindMultipleTranslationsFromSegments(segs: ISegment[], which: FindWhichX): Promise<ResultFromFindMultipleTranslationsFromSegments[] | null> {
    return FindMultipleXFromSegments(segs, FindWhichX.Source);
}

// tslint:disable-next-line:max-line-length
export async function FindMultipleTranslationsFromLocFormat(lf: ILocFormat<ISegment>, which: FindWhichX): Promise<ResultFromFindMultipleTranslationsFromLocFormat | null> {
    return FindMultipleXFromLocFormat(lf, FindWhichX.Source);
}

// tslint:disable-next-line:max-line-length
export async function FindMultipleTranslationsFromLocFormats(lfs: Array<ILocFormat<ISegment>>, which: FindWhichX): Promise<ResultFromFindMultipleTranslationsFromLocFormat[] | null> {
    return FindMultipleXFromLocFormats(lfs, FindWhichX.Source);
}
