import useWindowResizeHandler from './';
import { renderHook } from "@testing-library/react-hooks";
const wait = () => new Promise(resolve =>  setTimeout(resolve, 100));

describe('useWindowResizeHandler', () => {
    it('Call first after first run and updates after window resize', async () => {
        expect.assertions(2);
        const mockCallback = jest.fn(() => {});

        renderHook(() => useWindowResizeHandler(mockCallback));

        expect(mockCallback.mock.calls.length).toBe(1);

        window.dispatchEvent(new Event('resize'));

        await wait();

        expect(mockCallback.mock.calls.length).toBe(2);
    });

    it('check that callback force run only after first render component', () => {
        expect.assertions(2);
        const mockCallback = jest.fn(() => {});

        const { rerender } = renderHook(() => useWindowResizeHandler(mockCallback));

        expect(mockCallback.mock.calls.length).toBe(1);

        rerender();

        expect(mockCallback.mock.calls.length).toBe(1);
    });

    it('check that one callback run only one time after rerender component and resize', async () => {
        expect.assertions(2);
        const mockCallback = jest.fn(() => {});

        const { rerender } = renderHook(() => useWindowResizeHandler(mockCallback));

        expect(mockCallback.mock.calls.length).toBe(1);

        rerender();

        window.dispatchEvent(new Event('resize'));

        await wait();

        expect(mockCallback.mock.calls.length).toBe(2);
    });

    it('check several hooks calls', async () => {
        expect.assertions(8);
        const mockCallback = jest.fn(() => {});
        const mockCallback2 = jest.fn(() => {});

        const { rerender } = renderHook(() => useWindowResizeHandler(mockCallback));
        const { rerender: rerender2 } = renderHook(() => useWindowResizeHandler(mockCallback2));

        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback2.mock.calls.length).toBe(1);

        rerender();
        rerender2();

        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback2.mock.calls.length).toBe(1);

        window.dispatchEvent(new Event('resize'));

        await wait();

        expect(mockCallback.mock.calls.length).toBe(2);
        expect(mockCallback2.mock.calls.length).toBe(2);

        window.dispatchEvent(new Event('resize'));

        await wait();

        expect(mockCallback.mock.calls.length).toBe(3);
        expect(mockCallback2.mock.calls.length).toBe(3);
    });

    it('run hook with correct params', async () => {
        expect.assertions(2);
        let cache = 0;
        const mockCallback = jest.fn((...arg) => {
            cache += arg.reduce((acc: number, val: number) => acc + val, 0);
            return cache
        });

        renderHook(() => useWindowResizeHandler(mockCallback, 2, 3, 4, 5));

        expect(mockCallback.mock.results[0].value).toBe(14);

        window.dispatchEvent(new Event('resize'));

        await wait();

        expect(mockCallback.mock.results[1].value).toBe(28);
    });

    it('run hook with correct changes params', async () => {
        expect.assertions(4);
        let cache = 0;
        let props = [2, 3, 4, 5];
        const mockCallback = jest.fn((...arg) => {
            cache += arg.reduce((acc: number, val: number) => acc + val, 0);
            return cache
        });

        const { rerender } = renderHook(() => useWindowResizeHandler(mockCallback, ...props));

        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.results[0].value).toBe(14);

        props = [123];

        rerender();

        window.dispatchEvent(new Event('resize'));

        await wait();

        expect(mockCallback.mock.calls.length).toBe(2);
        expect(mockCallback.mock.results[1].value).toBe(137);
    });
});