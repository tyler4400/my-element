/**
 * 学习vitest
 * @author tylerzzheng
 */
import { expect, test, vi, describe, type Mocked } from 'vitest'
import axios from 'axios'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

test('test testtest', () => {
  const aaa = 'wsafwfsfg'
  expect(aaa).toBe('wsafwfsfg')
  expect(2+2).toBe(4)
})

describe('functions', () => {
  test('create a mock function', () => {
    const callback = vi.fn()
    testFn(12, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(12)
  })
  test('spy on method', () => {
    const obj = {
      getName: () => 1
    }
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })
  test('mock third party module', async () => {
    // mockedAxios.get.mockImplementation(() => Promise.resolve({ data: 123 }))
    mockedAxios.get.mockResolvedValue({ data: 123 })
    const result = await request()
    expect(result).toBe(123)
  })
})


// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function testFn(number: number, callback: Function) {
  if (number > 10 ) {
    callback(number)
  }
}

export async function request() {
  const { data } = await axios.get('fake.url')
  return data
}
