import {ILocFormat, ISegment} from "localization-format";
import {FindSpaces, FoundResult} from "text-checker";

export class ResultFromSegment {
    public Segment!: ISegment;
    public Source!: FoundResult[];
    public Translation!: FoundResult[];
    public constructor(seg: ISegment) {
        this.Segment = seg;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ResultFromLocFormat {
    public LocFormat!: ILocFormat<ISegment>;
    public ResultsFromSegments!: ResultFromSegment[];
    public constructor(lf: ILocFormat<ISegment>) {
        this.LocFormat = lf;
    }
}

export async function FindSpacesFromSegment(seg: ISegment): Promise<ResultFromSegment> {
    const result = new ResultFromSegment(seg);
    const resSource = FindSpaces(seg.Source.Value).then((res) => result.Source = res);
    const resTranslation = FindSpaces(seg.Translation.Value).then((res) => result.Translation = res);
    await Promise.all([resSource, resTranslation]);
    return result;
}

export async function FindSpacesFromSegments(segs: ISegment[]): Promise<ResultFromSegment[]> {
    const result: ResultFromSegment[] = [];
    await Promise.all(segs.map(async (seg) => await FindSpacesFromSegment(seg).then((res) => result.push(res))));
    return result;
}

// tslint:disable-next-line:max-line-length
export async function FindSpacesFromLocFormat(lf: ILocFormat<ISegment>): Promise<ResultFromLocFormat> {
    const result = new ResultFromLocFormat(lf);
    result.ResultsFromSegments = await FindSpacesFromSegments(lf.Segments!);
    return result;
}

// tslint:disable-next-line:max-line-length
export async function FindSpacesFromLocFormats(lfs: Array<ILocFormat<ISegment>>): Promise<ResultFromLocFormat[]> {
    const result: ResultFromLocFormat[] = [];
    await Promise.all(lfs.map(async (lf) => await FindSpacesFromLocFormat(lf).then((res) => result.push(res))));
    return result;
}
