import { ISegment } from "localization-format";
import {
    FindWhat,
    GroupBy,
    QADiffFromSegments,
    QADuplicateCheckResult,
    QADuplicateFromSegments,
    TargetValue,
} from "../src/index";

// tslint:disable-next-line:max-line-length
// const res = FindNumbersFromSegment({FormatIndex: null, Props: null, Source: {Value: "test1", BeginOffSet: null}, Translation: {Value: "テスト2", BeginOffSet: null}});

// console.dir(res);

const segs: ISegment[] = [{Source: {Value: "test1 "}, Translation: {Value: "テスト2"}},
{Source: {Value: "test3 "}, Translation: {Value: " "}},
{Source: {Value: "test 3"}, Translation: {Value: " "}},
{Source: {Value: "test"}, Translation: {Value: "たろう"}},
{Source: {Value: "test"}, Translation: {Value: "テスト2"}}]

export const test = (async () => {
    // tslint:disable-next-line:max-line-length
    const res = await QADiffFromSegments(segs, FindWhat.Spaces);
    console.dir(res);
});

export let ResultFindMultipleXFromSegments!: QADuplicateCheckResult[] | null;
export const testFindMultipleXFromSegments = (async () => {
    // tslint:disable-next-line:max-line-length
    ResultFindMultipleXFromSegments = await QADuplicateFromSegments(segs, TargetValue.Translation);
});

export let testGroupByResult: any;
export const testGroupBy = (async () => {
    testGroupByResult = await GroupBy<ISegment>(segs, "Source");
});
